// UPLOAD TO GOOGLE CLOUD STORAGE
exports.updateWorkMedia('/:workId/media', m.any(), (req, res, next) => {
  console.log(req.files);
  let media = [];

  try {
    const uploadHandler = async (files = req.files, f = 0) => {
      if (f >= files.length - 1) {
        res.json(media);
      } else {
        const fileName = `${req.params.workId}_${files[f].name}`;
        const contentType = files[f].originalname.slice(
          files[f].originalname.lastIndexOf('.') + 1
        );
        const metadata = { metadata: contentType };

        const uploaded = await bucket.upload(fileName, { metadata });
        console.log(uploaded);
        await uploaded.makePublic();

        const file = await uploaded.get();
        media.push({
          name: file.name,
          url: file.metadata.mediaLink,
          type: file.metadata.metadata.contentType
        });

        fs.unlink(fileName, async () => {
          const work = await database.Work.findById(req.params.workId);
          work.media = media;
          await work.update(
            { _id: work._id },
            { $set: { media } },
            { new: true }
          );
        });

        uploadHandler(files, f++);
      }
    };

    uploadHandler(req.files);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// DOWNLOAD FROM GOOGLE CLOUD STORAGE
exports.readWorkMedia('/:workId/media', async (req, res, next) => {
  console.log(req.files);
  let media = [];

  try {
    const work = await database.Work.findById(req.params.workId);

    const downloadHandler = async (files = work.media, f = 0) => {
      if (f >= files.length - 1) {
        res.json(media);
      } else {
        const file = await bucket.file(files[f]);
        const destination = `./tmp/${work._id}_${file.name}`;

        if (file !== null) {
          console.log(file);
          const options = { destination };

          await file.download(options);

          media.push({
            name: file.name,
            url: file.metadata.mediaLink,
            type: file.metadata.metadata.contentType
          });
        } else {
          downloadHandler(files, f++);
        }
        downloadHandler(files, f++);
      }
    };

    downloadHandler(req.files);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

// DOWNLOAD SINGLE FILE FROM GOOGLE CLOUD STORAGE
exports.readWorkMediaFile('/:workId/media/:mediaId', async (req, res, next) => {
  console.log(req.files);
  try {
    const file = await bucket.file(req.body.media[req.params.mediaId]);
    console.log(file);
    const destination = `./tmp/${work._id}_${file.name}`;

    if (file !== null) {
      console.log(file);
      const options = { destination };

      const media = await file.download(options);
      res.json(media);
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

// DELETE FROM GOOGLE CLOUD STORAGE
exports.deleteWorkMediaFile(
  '/:workId/media/:mediaId',
  async (req, res, next) => {
    console.log(req.files);
    try {
      const file = await bucket.file(req.body.media[req.params.mediaId]);
      console.log(file);
      await file.delete();
      const work = await database.Work.findById(req.params.workId);
      const media = work.media.filter(f => f !== file);
      console.log(media);

      await work.update({ _id: work._id }, { $set: { media } }, { new: true });
      res.json(media);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  }
);

// UPLOAD TO GOOGLE CLOUD STORAGE
exports.updateWorkMedia = (req, res, next) => {
  console.log(`[FILES]: ${req.files}`);
  m(req, res, next => {
    console.log(`[FILES]: ${req.files}`);
    let media = [];
    try {
      const uploadHandler = async (files = req.files, f = 0) => {
        if (f >= files.length - 1) {
          res.json(media);
        } else {
          const fileName = `${req.params.workId}_${files[f].name}`;
          const contentType = files[f].originalname.slice(
            files[f].originalname.lastIndexOf('.') + 1
          );
          const metadata = { metadata: contentType };
          const uploaded = await bucket.upload(fileName, { metadata });
          console.log(uploaded);
          await uploaded.makePublic();
          const file = await uploaded.get();
          media.push({
            name: file.name,
            url: file.metadata.mediaLink,
            type: file.metadata.metadata.contentType
          });
          fs.unlink(fileName, async () => {
            const work = await database.Work.findById(req.params.workId);
            work.media = media;
            await work.update(
              { _id: work._id },
              { $set: { media } },
              { new: true }
            );
          });
          uploadHandler(files, f++);
        }
      };
      uploadHandler(req.files);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  });
  next();
};

//-
// <h4>Downloading a File</h4>
//
// The example below demonstrates how we can reference a remote file, then
// pipe its contents to a local file. This is effectively creating a local
// backup of your remote data.
//-
var storage = require('@google-cloud/storage')();
var bucket = storage.bucket('my-bucket');

var fs = require('fs');
var remoteFile = bucket.file('image.png');
var localFilename = '/Users/stephen/Photos/image.png';

remoteFile
  .createReadStream()
  .on('error', function(err) {})
  .on('response', function(response) {
    // Server connected and responded with the specified status and headers.
  })
  .on('end', function() {
    // The file is fully downloaded.
  })
  .pipe(fs.createWriteStream(localFilename));

//-
// To limit the downloaded data to only a byte range, pass an options object.
//-
var logFile = myBucket.file('access_log');
logFile
  .createReadStream({
    start: 10000,
    end: 20000
  })
  .on('error', function(err) {})
  .pipe(fs.createWriteStream('/Users/stephen/logfile.txt'));

//-
// To read a tail byte range, specify only `options.end` as a negative
// number.
//-
var logFile = myBucket.file('access_log');
logFile
  .createReadStream({
    end: -100
  })
  .on('error', function(err) {})
  .pipe(fs.createWriteStream('/Users/stephen/logfile.txt'));
  
  var file = myBucket.file('my-file');
  file.createResumableUpload(function(err, uri) {
    if (!err) {
      // `uri` can be used to PUT data to.
    }
  });

  //-
  // If the callback is omitted, we'll return a Promise.
  //-
  file.createResumableUpload().then(function(data) {
    var uri = data[0];
  });

  var file = myBucket.file('my-file');

  //-
  // <h4>Uploading a File</h4>
  //
  // Now, consider a case where we want to upload a file to your bucket. You
  // have the option of using {@link Bucket#upload}, but that is just
  // a convenience method which will do the following.
  //-
  fs
    .createReadStream('/Users/stephen/Photos/birthday-at-the-zoo/panda.jpg')
    .pipe(file.createWriteStream())
    .on('error', function(err) {})
    .on('finish', function() {
      // The file upload is complete.
    });

  //-
  // <h4>Uploading a File with gzip compression</h4>
  //-
  fs
    .createReadStream('/Users/stephen/site/index.html')
    .pipe(file.createWriteStream({ gzip: true }))
    .on('error', function(err) {})
    .on('finish', function() {
      // The file upload is complete.
    });

  //-
  // Downloading the file with `createReadStream` will automatically decode the
  // file.
  //-

  //-
  // <h4>Uploading a File with Metadata</h4>
  //
  // One last case you may run into is when you want to upload a file to your
  // bucket and set its metadata at the same time. Like above, you can use
  // {@link Bucket#upload} to do this, which is just a wrapper around
  // the following.
  //-
  fs
    .createReadStream('/Users/stephen/Photos/birthday-at-the-zoo/panda.jpg')
    .pipe(file.createWriteStream({
        metadata: {
          contentType: 'image/jpeg',
          metadata: {
            custom: 'metadata'
          }
        }
      }))
    .on('error', function(err) {})
    .on('finish', function() {
      // The file upload is complete.
    });

    var file = myBucket.file('my-file');
    var options = { equals: ['$Content-Type', 'image/jpeg'], expires: '10-25-2022', contentLengthRange: { min: 0, max: 1024 } };

    file.getSignedPolicy(options, function(err, policy) {
      // policy.string: the policy document in plain text.
      // policy.base64: the policy document in base64.
      // policy.signature: the policy signature in base64.
    });

    //-
    // If the callback is omitted, we'll return a Promise.
    //-
    file.getSignedPolicy(options).then(function(data) {
      var policy = data[0];
    });

    var file = myBucket.file('my-file');

    //-
    // Set the file private so only project maintainers can see and modify it.
    //-
    file.makePrivate(function(err) {});

    //-
    // Set the file private so only the owner can see and modify it.
    //-
    file.makePrivate({ strict: true }, function(err) {});

    //-
    // If the callback is omitted, we'll return a Promise.
    //-
    file.makePrivate().then(function(data) {
      var apiResponse = data[0];
    });
const uuidv5 = require('uuid/v5');
const database = require('./database');

const Storage = require('@google-cloud/storage');

// Storage Channel
const channel = storage.channel('id', 'resource-id');
channel.stop(function(err, apiResponse) {
  if (!err) {
    // Channel stopped successfully.
  }
});

//-
// If the callback is omitted, we'll return a Promise.
//-
channel.stop().then(function(data) {
  const apiResponse = data[0];
});

/**
 * Generates a 256 bit (32 byte) AES encryption key and prints the base64
 * representation.
 *
 * This is included for demonstration purposes. You should generate your own
 * key. Please remember that encryption keys should be handled with a
 * comprehensive security policy.
 *
 * @returns {string} The encryption key.
 */
const crypto = require('crypto');

function generateEncryptionKey() {
  const buffer = crypto.randomBytes(32);
  const encodedKey = buffer.toString('base64');

  console.log(`Base 64 encoded encryption key: ${encodedKey}`);

  return encodedKey;
}

// Creates a client
const storage = new Storage();
// Your Google Cloud Platform project ID
const projectId = 'rozalado-tickets';
const bucketName = 'media-library-tickets';
const filename = 'Name of file to access, e.g. file.txt';
const srcFilename = 'Name of file to download';
const destFilename = 'Local destination of file';
const roleName = `Role to grant, e.g. 
  roles/owner
  roles/storage.objectAdmin
  roles/storage.objectCreator
  roles/storage.objectViewer 
  roles/storage.legacyBucketOwner
  `;
const members = [
  'user:jdoe@example.com', // Example members to grant
  'group:admins@example.com' // the new role to
];
const userEmail = 'Email of user to add, e.g. developer@company.com';
const IAM_URL = `https://storage.cloud.google.com/${bucketName}/${fileName}`;

const storage = Storage({
  projectId,
  keyFilename: './rozalado-tickets-key.json'
});
const bucket = storage.bucket('media-library-tickets');

// Creates a new bucket
storage
  .createBucket(bucketName)
  .then(() => {
    console.log(`Bucket ${bucketName} created.`);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });

// Lists all buckets in the current project
storage
  .getBuckets()
  .then(results => {
    const buckets = results[0];

    console.log('Buckets:');
    buckets.forEach(bucket => {
      console.log(bucket.name);
    });
  })
  .catch(err => {
    console.error('ERROR:', err);
  });

// Lists files in the bucket
storage
  .bucket(bucketName)
  .getFiles()
  .then(results => {
    const files = results[0];

    console.log('Files:');
    files.forEach(file => {
      console.log(file.name);
    });
  })
  .catch(err => {
    console.error('ERROR:', err);
  });

// Lists files in the bucket, filtered by a prefix
const options = { prefix: prefix };

if (delimiter) {
  options.delimiter = delimiter;
}

storage
  .bucket(bucketName)
  .getFiles(options)
  .then(results => {
    const files = results[0];

    console.log('Files:');
    files.forEach(file => {
      console.log(file.name);
    });
  })
  .catch(err => {
    console.error('ERROR:', err);
  });

// Deletes the bucket
storage
  .bucket(bucketName)
  .delete()
  .then(() => {
    console.log(`Bucket ${bucketName} deleted.`);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });

// Deletes the file from the bucket
storage
  .bucket(bucketName)
  .file(filename)
  .delete()
  .then(() => {
    console.log(`gs://${bucketName}/${filename} deleted.`);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });

// Enables requester-pays requests
storage
  .bucket(bucketName)
  .enableRequesterPays()
  .then(() => {
    console.log(
      `Requester-pays requests have been enabled for bucket ${bucketName}.`
    );
  })
  .catch(err => {
    console.error(`ERROR:`, err);
  });

// Disables requester-pays requests
storage
  .bucket(bucketName)
  .disableRequesterPays()
  .then(() => {
    console.log(
      `Requester-pays requests have been disabled for bucket ${bucketName}.`
    );
  })
  .catch(err => {
    console.error(`ERROR:`, err);
  });

// Gets the requester-pays status of a bucket
storage
  .bucket(bucketName)
  .getMetadata()
  .then(data => {
    let status;
    const metadata = data[0];
    if (metadata && metadata.billing && metadata.billing.requesterPays) {
      status = `enabled`;
    } else {
      status = `disabled`;
    }
    console.log(
      `Requester-pays requests are ${status} for bucket ${bucketName}.`
    );
  })
  .catch(err => {
    console.error(`ERROR:`, err);
  });

// Access the requester-pays bucket
const options = {
  // The path to which the file should be downloaded, e.g. "./file.txt"
  destination: destFilename,
  // The project to bill from, if requester-pays requests are enabled
  userProject: projectId
};

// Downloads the file using requester-pays
storage
  .bucket(bucketName)
  .file(srcFilename)
  .download(options)
  .then(() => {
    console.log(
      `gs://${bucketName}/${srcFilename} downloaded to ${destFilename} using requester-pays requests.`
    );
  })
  .catch(err => {
    console.error(`ERROR:`, err);
  });

// Makes the file public
storage
  .bucket(bucketName)
  .file(filename)
  .makePublic()
  .then(() => {
    console.log(`gs://${bucketName}/${filename} is now public.`);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });

// Gets and updates the bucket's IAM policy
bucket.iam
  .getPolicy()
  .then(results => {
    const policy = results[0];

    // Adds the new roles to the bucket's IAM policy
    policy.bindings.push({
      role: roleName,
      members: members
    });

    // Updates the bucket's IAM policy
    return bucket.iam.setPolicy(policy);
  })
  .then(() => {
    console.log(
      `Added the following member(s) with role ${roleName} to ${bucketName}:`
    );
    members.forEach(member => {
      console.log(`  ${member}`);
    });
  })
  .catch(err => {
    console.error('ERROR:', err);
  });

// Gets and displays the bucket's IAM policy
storage
  .bucket(bucketName)
  .iam.getPolicy()
  .then(results => {
    const policy = results[0].bindings;

    // Displays the roles in the bucket's IAM policy
    console.log(`Roles for bucket ${bucketName}:`);
    policy.forEach(role => {
      console.log(`  Role: ${role.role}`);
      console.log(`  Members:`);

      const members = role.members;
      members.forEach(member => {
        console.log(`    ${member}`);
      });
    });
  })
  .catch(err => {
    console.error('ERROR:', err);
  });

// Gets and updates the bucket's IAM policy
bucket.iam
  .getPolicy()
  .then(data => {
    const policy = data[0];

    // Finds and updates the appropriate role-member group
    const index = policy.bindings.findIndex(role => role.role === roleName);
    let role = policy.bindings[index];
    if (role) {
      role.members = role.members.filter(
        member => members.indexOf(member) === -1
      );

      // Updates the policy object with the new (or empty) role-member group
      if (role.members.length === 0) {
        policy.bindings.splice(index, 1);
      } else {
        policy.bindings.index = role;
      }

      // Updates the bucket's IAM policy
      return bucket.iam.setPolicy(policy);
    } else {
      // No matching role-member group(s) were found
      throw new Error('No matching role-member group(s) found.');
    }
  })
  .then(() => {
    console.log(
      `Removed the following member(s) with role ${roleName} from ${bucketName}:`
    );
    members.forEach(member => {
      console.log(`  ${member}`);
    });
  })
  .catch(err => {
    console.error('ERROR:', err);
  });

// Makes the user an owner of the bucket. You can use addAllUsers(),
// addDomain(), addProject(), addGroup(), and addAllAuthenticatedUsers()
// to grant access to different types of entities. You can also use "readers"
// and "writers" to grant different roles.
storage
  .bucket(bucketName)
  .acl.owners.addUser(userEmail)
  .then(() => {
    console.log(`Added user ${userEmail} as an owner on bucket ${bucketName}.`);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });

// Makes the user an owner of the file. You can use addAllUsers(),
// addDomain(), addProject(), addGroup(), and addAllAuthenticatedUsers()
// to grant access to different types of entities. You can also use "readers"
// and "writers" to grant different roles.
storage
  .bucket(bucketName)
  .file(filename)
  .acl.owners.addUser(userEmail)
  .then(() => {
    console.log(`Added user ${userEmail} as an owner on file ${filename}.`);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });

// Makes the user an owner in the default ACL of the bucket. You can use
// addAllUsers(), addDomain(), addProject(), addGroup(), and
// addAllAuthenticatedUsers() to grant access to different types of entities.
// You can also use "readers" and "writers" to grant different roles.
storage
  .bucket(bucketName)
  .acl.default.owners.addUser(userEmail)
  .then(() => {
    console.log(`Added user ${userEmail} as an owner on bucket ${bucketName}.`);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });

// Removes the user from the access control list of the bucket. You can use
// deleteAllUsers(), deleteDomain(), deleteProject(), deleteGroup(), and
// deleteAllAuthenticatedUsers() to remove access for different types of entities.
storage
  .bucket(bucketName)
  .acl.default.owners.deleteUser(userEmail)
  .then(() => {
    console.log(`Removed user ${userEmail} from bucket ${bucketName}.`);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });

// Gets the ACL for the bucket
storage
  .bucket(bucketName)
  .acl.get()
  .then(results => {
    const acls = results[0];

    acls.forEach(acl => {
      console.log(`${acl.role}: ${acl.entity}`);
    });
  })
  .catch(err => {
    console.error('ERROR:', err);
  });

// Gets the ACL for the file
storage
  .bucket(bucketName)
  .file(filename)
  .acl.get()
  .then(results => {
    const acls = results[0];

    acls.forEach(acl => {
      console.log(`${acl.role}: ${acl.entity}`);
    });
  })
  .catch(err => {
    console.error('ERROR:', err);
  });

// Removes the user from the access control list of the bucket. You can use
// deleteAllUsers(), deleteDomain(), deleteProject(), deleteGroup(), and
// deleteAllAuthenticatedUsers() to remove access for different types of entities.
storage
  .bucket(bucketName)
  .acl.owners.deleteUser(userEmail)
  .then(() => {
    console.log(`Removed user ${userEmail} from bucket ${bucketName}.`);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });

// Removes the user from the access control list of the file. You can use
// deleteAllUsers(), deleteDomain(), deleteProject(), deleteGroup(), and
// deleteAllAuthenticatedUsers() to remove access for different types of entities.
storage
  .bucket(bucketName)
  .file(filename)
  .acl.owners.deleteUser(userEmail)
  .then(() => {
    console.log(`Removed user ${userEmail} from file ${filename}.`);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });

//-
// Make a bucket's contents publicly readable.
//-
var options = { entity: 'allUsers', role: storage.acl.READER_ROLE };

myBucket.acl.add(options, function(err, aclObject) {});

//-
// If the callback is omitted, we'll return a Promise.
//-
myBucket.acl.add(options).then(function(data) {
  var aclObject = data[0];
  var apiResponse = data[1];
});

const options = {
  // Specify the user
  entity: `user-${userEmail}`
};

// Gets the user's ACL for the bucket
storage
  .bucket(bucketName)
  .acl.get(options)
  .then(results => {
    const aclObject = results[0];

    console.log(`${aclObject.role}: ${aclObject.entity}`);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });

  // Gets the metadata for the file
storage
  .bucket(bucketName)
  .file(filename)
  .getMetadata()
  .then(results => {
    const metadata = results[0];

    console.log(`File: ${metadata.name}`);
    console.log(`Bucket: ${metadata.bucket}`);
    console.log(`Storage class: ${metadata.storageClass}`);
    console.log(`Self link: ${metadata.selfLink}`);
    console.log(`ID: ${metadata.id}`);
    console.log(`Size: ${metadata.size}`);
    console.log(`Updated: ${metadata.updated}`);
    console.log(`Generation: ${metadata.generation}`);
    console.log(`Metageneration: ${metadata.metageneration}`);
    console.log(`Etag: ${metadata.etag}`);
    console.log(`Owner: ${metadata.owner}`);
    console.log(`Component count: ${metadata.component_count}`);
    console.log(`Crc32c: ${metadata.crc32c}`);
    console.log(`md5Hash: ${metadata.md5Hash}`);
    console.log(`Cache-control: ${metadata.cacheControl}`);
    console.log(`Content-type: ${metadata.contentType}`);
    console.log(`Content-disposition: ${metadata.contentDisposition}`);
    console.log(`Content-encoding: ${metadata.contentEncoding}`);
    console.log(`Content-language: ${metadata.contentLanguage}`);
    console.log(`Metadata: ${metadata.metadata}`);
    console.log(`Media link: ${metadata.mediaLink}`);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });

/* ROUTES */

app.post('/:workId/media/:mediaId', middleware.authentication, function(
  req,
  res
) {
  const file = bucket.file(req.body.pfilename);
  file.delete(function(err, apiResponse) {
    database
      .collection('tickets')
      .find({ _id: ObjectId(req.body.id) })
      .toArray(function(err2, result1) {
        for (let i = 0; i < result1[0].media.length; i++) {
          if (result1[0].media[i] !== undefined) {
            if (result1[0].media[i].indexOf(req.body.pfilename) > -1) {
              result1[0].media.splice(i, 1);
            }
          }
        }
        database.collection('tickets').update(
          { _id: ObjectId(req.body.id) },
          {
            $set: {
              media: result1[0].media
            }
          },
          function(err3, res1) {
            res.send('Files successfully deleted');
          }
        );
      });
  });
});

app.post('/:workId/media', middleware.authentication, upload.any(), function(
  req,
  res
) {
  let retURLS = [];
  function nextMedia(files, i) {
    const contentType = files[i].originalname.slice(
      files[i].originalname.lastIndexOf('.') + 1
    );
    bucket.upload(
      `./tmp/${files[i].filename}`,
      { metadata: { metadata: { contentType: contentType } } },
      function(err1, file, response) {
        const file = bucket.file(files[i].filename);
        file.makePublic(function(err, apiResponse) {});
        file.get(function(err4, file1, apiResponse1) {
          retURLS.push({
            url: file1.metadata.mediaLink,
            filetype: file1.metadata.metadata.contentType
          });
          fs.unlink(`./tmp/${files[i].filename}`, function() {
            database
              .collection('tickets')
              .find({ _id: ObjectId(req.header('id')) })
              .toArray(function(err2, result1) {
                if (typeof result1[0].media !== 'object') {
                  result1[0].media = [];
                }
                result1[0].media.push(files[i].filename);
                database.collection('tickets').update(
                  { _id: ObjectId(req.header('id')) },
                  {
                    $set: {
                      media: result1[0].media
                    }
                  },
                  function(err3, res1) {
                    if (i >= files.length - 1) {
                      res.send({ data: retURLS });
                    } else {
                      nextMedia(files, ++i);
                    }
                  }
                );
              });
          });
        });
      }
    );
  }
  nextMedia(req.files, 0);
});

app.post('/:workId/media', middleware.authentication, function(req, res) {
  let retURLS = [];
  database
    .collection('tickets')
    .find({ _id: ObjectId(req.body.id) })
    .toArray(function(err2, result1) {
      if (result1[0].media !== undefined) {
        if (result1[0].media.length > 0) {
          function nextFile(media, i) {
            const file = bucket.file(media[i]);
            file.get(function(err, file, apiResponse) {
              if (file !== null) {
                retURLS.push({
                  url: file.metadata.mediaLink,
                  filetype: file.metadata.metadata.contentType
                });
                if (i >= media.length - 1) {
                  res.send({ data: retURLS });
                } else {
                  nextFile(media, ++i);
                }
              } else {
                nextFile(media, ++i);
              }
            });
          }
          nextFile(result1[0].media, 0);
        } else {
          res.send({ data: [] });
        }
      } else {
        res.send({ data: [] });
      }
    });
});

/* 
* GET BUCKET INFO
curl -X GET -H "Authorization: Bearer [OAUTH2_TOKEN]" \
    "https://www.googleapis.com/storage/v1/b/[BUCKET_NAME]?fields=location%2CstorageClass"

* CHANGE DEFAULT STORAGE CLASS
curl -X PUT --data-binary @[JSON_FILE_NAME].json \
    -H "Authorization: Bearer [OAUTH2_TOKEN]" \
    -H "Content-Type: application/json" \
    "https://www.googleapis.com/storage/v1/b/[BUCKET_NAME]?fields=storageClass"

* COPY FILES TO NEW BUCKET
curl -X GET -H "Authorization: Bearer [OAUTH2_TOKEN]" \
    "https://www.googleapis.com/storage/v1/b/[BUCKET_NAME]?fields=location%2CstorageClass"
* SUBSEQUENT REQUESTS
curl -X POST -H "Authorization: Bearer [OAUTH2_TOKEN]" \
   -H "Content-Length: 0" \
   -d '{"rewriteToken": "[TOKEN_VALUE]"}' \
   "https://www.googleapis.com/storage/v1/b/[SOURCE_BUCKET]/o/[OBJECT_NAME]/rewriteTo/b/[DESTINATION_BUCKET]/o/[OBJECT_NAME]"
* DELETE OLD BUCKET FILES
curl -X DELETE -H "Authorization: Bearer [OAUTH2_TOKEN]" \
   https://www.googleapis.com/storage/v1/b/[SOURCE_BUCKET]/o/[OBJECT_NAME]

* ADD BUCKET LABEL
curl -X PATCH --data-binary @[JSON_FILE_NAME].json \
    -H "Authorization: Bearer [OAUTH2_TOKEN]" \
    -H "Content-Type: application/json" \
    "https://www.googleapis.com/storage/v1/b/[BUCKET_NAME]?fields=labels"

* VIEW BUCKET LABELS
curl -X GET -H "Authorization: Bearer [OAUTH2_TOKEN]" \
    "https://www.googleapis.com/storage/v1/b/[BUCKET_NAME]?fields=labels"

* DELETE BUCKET LABEL
-- create @[JSON_FILE_NAME].json
{
  "labels": {
    "[KEY_1]": null
  }
}

curl -X PATCH --data-binary @[JSON_FILE_NAME].json \
    -H "Authorization: Bearer [OAUTH2_TOKEN]" \
    -H "Content-Type: application/json" \
    "https://www.googleapis.com/storage/v1/b/[BUCKET_NAME]?fields=labels"

* ENABLE LIFECYCLE MANAGEMENT
-- create @[LIFECYCLE_CONFIG_FILE].json
{
    "lifecycle": {
    "rule": [
            {
                "action": {"type": "Delete"},
                "condition": {
                "age": 30,
                "isLive": true
                }
            },
            {
                "action": {"type": "Delete"},
                "condition": {
                "age": 10,
                "isLive": false
                }
            }
        ]
    }
}

OR 

{
"lifecycle": {
  "rule": [
  {
    "action": {
      "type": "SetStorageClass",
      "storageClass": "NEARLINE"
    },
    "condition": {
      "age": 365,
      "matchesStorageClass": ["MULTI_REGIONAL", "STANDARD", "DURABLE_REDUCED_AVAILABILITY"]
    }
  },
  {
    "action": {
      "type": "SetStorageClass",
      "storageClass": "COLDLINE"
    },
    "condition": {
      "age": 1095,
      "matchesStorageClass": ["NEARLINE"]
    }
  }
]
}
}

curl -X PATCH --data-binary @[LIFECYCLE_CONFIG_FILE].json \
  -H "Authorization: Bearer [OAUTH2_TOKEN]" \
  -H "Content-Type: application/json" \
  "https://www.googleapis.com/storage/v1/b/[BUCKET_NAME]?fields=lifecycle"

* CHECK LIFECYCLE MANAGEMENT CONFIG
curl -X GET -H "Authorization: Bearer [OAUTH2_TOKEN]" \
  "https://www.googleapis.com/storage/v1/b/[BUCKET_NAME]?fields=lifecycle"  

* DISABLE LIFECYCLE MANAGEMENT
-- create an EMPTY @[LIFECYCLE_CONFIG_FILE].json
{}

curl -X PATCH --data-binary @[LIFECYCLE_CONFIG_FILE].json \
  -H "Authorization: Bearer [OAUTH2_TOKEN]" \
  -H "Content-Type: application/json" \
  "https://www.googleapis.com/storage/v1/b/[BUCKET_NAME]?fields=lifecycle"

* ENABLE VERSIONING
-- create @[JSON_FILE_NAME].json
{
  "versioning": {
    "enabled": true
  }
}

curl -X PATCH --data-binary @[JSON_FILE_NAME].json \
    -H "Authorization: Bearer [OAUTH2_TOKEN]" \
    -H "Content-Type: application/json" \
    "https://www.googleapis.com/storage/v1/b/[BUCKET_NAME]?fields=versioning"

* DISABLE VERSIONING
-- create @[JSON_FILE_NAME].json
{
  "versioning": {
    "enabled": false
  }
}
curl -X PATCH --data-binary @[JSON_FILE_NAME].json \
    -H "Authorization: Bearer [OAUTH2_TOKEN]" \
    -H "Content-Type: application/json" \
    "https://www.googleapis.com/storage/v1/b/[BUCKET_NAME]?fields=versioning"

* CHECK VERSIONING
curl -X GET -H "Authorization: Bearer [OAUTH2_TOKEN]" \
    "https://www.googleapis.com/storage/v1/b/[BUCKET_NAME]?fields=versioning"

* LIST ARCHIVED OBJECT VERSIONS
curl -X GET -H "Authorization: Bearer [OAUTH2_TOKEN]" \
    "https://www.googleapis.com/storage/v1/b/[BUCKET_NAME]/o?versions=true"

* ACCESS ARCHIVED OBJECT VERSIONS
curl -X GET -H "Authorization: Bearer [OAUTH2_TOKEN]" \
    "https://www.googleapis.com/storage/v1/b/[BUCKET_NAME]/o/[OBJECT_NAME]?generation=[GENERATION_NUMBER]"

* COPY ARCHIVED OBJECT VERSIONS
curl -X POST \
    -H "Authorization: Bearer [OAUTH2_TOKEN]" \
    -H "Content-Length: 0" \
    "https://www.googleapis.com/upload/storage/v1/b/[SOURCE_BUCKET_NAME]/o/[SOURCE_OBJECT_NAME]/rewriteTo/b/[DESTINATION_BUCKET_NAME]/o/[NAME_OF_COPY]?sourceGeneration=[GENERATION_NUMBER]"

* DELETE ARCHIVED OBJECT VERSIONS
curl -X DELETE \
    -H "Authorization: Bearer [OAUTH2_TOKEN]" \
    "https://www.googleapis.com/storage/v1/b/[BUCKET_NAME]/o/[OBJECT_NAME]?generation=[GENERATION_NUMBER]"

* UPLOADING ENCRYPTION OBJECTS
curl -X POST --data-binary @[OBJECT] \
    -H "Authorization: Bearer [OAUTH2_TOKEN]" \
    -H "Content-Type: [OBJECT_CONTENT_TYPE]" \
    -H "x-goog-encryption-algorithm: AES256" \
    -H "x-goog-encryption-key: [YOUR_ENCRYPTION_KEY]" \
    -H "x-goog-encryption-key-sha256: [HASH_OF_YOUR_KEY]" \
    "https://www.googleapis.com/upload/storage/v1/b/[BUCKET_NAME]/o?uploadType=media&name=[OBJECT_NAME]"

* DOWNLOADING ENCRYPTED OBJECTS
curl -X GET \
    -H "Authorization: Bearer [OAUTH2_TOKEN]" \
    -H "x-goog-encryption-algorithm: AES256" \
    -H "x-goog-encryption-key: [YOUR_ENCRYPTION_KEY]" \
    -H "x-goog-encryption-key-sha256: [HASH_OF_YOUR_KEY]" \
    -o "[SAVE_TO_LOCATION]" \
    "https://www.googleapis.com/storage/v1/b/[BUCKET_NAME]/o/[OBJECT_NAME]?alt=media"

* ROTATE ENCRYPTION KEYS
curl -X POST --data-binary @[OBJECT] \
    -H "Authorization: Bearer [OAUTH2_TOKEN]" \
    -H "Content-Type: [OBJECT_CONTENT_TYPE]" \
    -H "x-goog-encryption-algorithm: AES256" \
    -H "x-goog-encryption-key: [NEW_ENCRYPTION_KEY]" \
    -H "x-goog-encryption-key-sha256: [HASH_OF_NEW_KEY]" \
    -H "x-goog-copy-source-encryption-algorithm: AES256" \
    -H "x-goog-copy-source-encryption-key: [OLD_ENCRYPTION_KEY]" \
    -H "x-goog-copy-source-encryption-key-sha256: [HASH_OF_OLD_KEY]" \
    "https://www.googleapis.com/storage/v1/b/[BUCKET_NAME]/o/[OBJECT_NAME]/rewriteTo/b/[BUCKET_NAME]/o/[OBJECT_NAME]"
    
* MAKE OBJECT GROUPS PUBLIC
-- create @[JSON_FILE_NAME].json
{
  "bindings":[
    {
      "role": "roles/storage.objectViewer",
      "members":["allUsers"]
    }
  ]
}    

curl -X PUT --data-binary @[JSON_FILE_NAME].json \
    -H "Authorization: Bearer [OAUTH2_TOKEN]" \
    -H "Content-Type: application/json" \
    "https://www.googleapis.com/storage/v1/b/[BUCKET_NAME]/iam"
    
* ADDING MEMBERS TO IAM POLICY 
-- create @[JSON_FILE_NAME].json
{
  "policy": {
    "version": "0",
    "bindings": {
      "role": "[IAM_ROLE]",
      "members": "[MEMBER_NAME]"
    },
  }
}

curl -X POST --data-binary @[JSON_FILE_NAME].json \
    -H "Authorization: Bearer [OAUTH2_TOKEN]" \
    -H "Content-Type: application/json" \
    "https://cloudresourcemanager.googleapis.com/v1/projects/[PROJECT_NAME]:setIamPolicy"
    
* VIEW IAM POLICY
curl -X POST \
    -H "Authorization: Bearer [OAUTH2_TOKEN]" \
    -H "Content-Length: 0" \
    "https://cloudresourcemanager.googleapis.com/v1/projects/[PROJECT_NAME]:getIamPolicy"

* REMOVING MEMBERS TO IAM POLICY 
curl -X POST \
    -H "Authorization: Bearer [OAUTH2_TOKEN]" \
    -H "Content-Length: 0" \
    "https://cloudresourcemanager.googleapis.com/v1/projects/[PROJECT_NAME]:getIamPolicy"

-- create @[JSON_FILE_NAME].json -- based on above result
{
  "policy": {
    "version": "0",
    "bindings": {
      "role": "[IAM_ROLE]",
      "members": "[MEMBER_NAME]"
    },
  }
}

curl -X POST --data-binary @[JSON_FILE_NAME].json \
    -H "Authorization: Bearer [OAUTH2_TOKEN]" \
    -H "Content-Type: application/json" \
    "https://cloudresourcemanager.googleapis.com/v1/projects/[PROJECT_NAME]:setIamPolicy"

* ACL ON NEW OBJECT
curl -X POST --data-binary @paris.jpg -H "Content-Type: image/jpeg" \
     -H "Authorization: Bearer ya29.AHES6ZRVmB7fkLtd1XTmq6mo0S1wqZZi3-Lh_s-6Uw7p8vtgSwg"  \
     "https://www.googleapis.com/upload/storage/v1/b/example-travel-maps/o?name=paris.jpg&predefinedAcl=bucketOwnerRead"
    
* ACL ON EXISTING OBJECT OR BUCKET
curl -X PATCH --data '{"acl": []}'  -H "Content-Type: application/json" \
     -H "Authorization: Bearer ya29.AHES6ZRVmB7fkLtd1XTmq6mo0S1wqZZi3-Lh_s-6Uw7p8vtgSwg"  \
     https://www.googleapis.com/storage/v1/b/example-travel-maps/o/paris.jpg?predefinedAcl=private    
     
* DEFAULT OBJECT ACL ON BUCKET
defaultObjectAcl": [
  {
   "kind": "storage#objectAccessControl",
   "entity": "project-owners-123412341234",
   "role": "OWNER",
   "projectTeam": {
"projectNumber": "123412341234",
"team": "owners"
   }
  },
  {
   "kind": "storage#objectAccessControl",
   "entity": "project-editors-123412341234",
   "role": "OWNER",
   "projectTeam": {
"projectNumber": "123412341234",
"team": "editors"
   }
  },
  {
   "kind": "storage#objectAccessControl",
   "entity": "project-viewers-123412341234",
   "role": "READER",
   "projectTeam": {
"projectNumber": "123412341234",
"team": "viewers"
   }
  }
 ]

curl -X PUT -H "Content-Length: 0" -H "Authorization: Bearer [OAUTH2_TOKEN]" \
https://www.googleapis.com/storage/v1/b/[BUCKET_NAME]?predefinedAcl=private     
     
     */

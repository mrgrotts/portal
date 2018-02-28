/* SEE FILE 'gcp_storage_utils.py' FOR MORE
This page describes how to use gsutil to create signed URLs, 
which are a mechanism for query string authentication for buckets and objects. 
Signed URLs are one way to control access to buckets and objects. 
A signed URL is associated with a bucket or object and gives 
time-limited read or write access to that specific resource. 
Anyone in possession of the URL has the access granted by the URL, 
regardless of whether they have a Google account.
https://cloud.google.com/storage/docs/access-control/signed-urls
https://cloud.google.com/storage/docs/access-control/create-signed-urls-program

1. Create Service Account
2. Download P12 or JSON Key File
3. Use the gsutil signurl command, passing in the path to the private key (stored on your computer) 
and the URL of the bucket or object you want to generate a signed URL for.
For example, using a key stored in the folder Desktop, the following command generates
a signed URL for users to view the object cat.jpeg for 10 minutes.

gsutil signurl -d 10m Desktop/private-key.json gs://example-bucket/cat.jpeg
*/

/* 
https://cloud.google.com/storage/docs/access-control/signed-urls#string-components

1. Choose the HTTP_Verb (such as GET, PUT, or DELETE) 
that the requests utilizing the signed URL must use.

2. Add an MD5 digest value if you want to include 
the value in the requests that will use the signed URL.
https://cloud.google.com/storage/docs/hashes-etags#_MD5

3. Specify the Content-Type of the object if the requests 
that will use the signed URL are going to have a Content-Type header.

4. Specify the timestamp (in seconds since the Unix Epoch) for when 
the signed URL expires (that is, when it no longer gives access to the associated object).

5. Specify any extension headers, separated by newlines, if the requests that will use 
the signed URL are going to contain such headers. However, do not specify the 
x-goog-encryption-key or x-goog-encryption-key-sha256 headers, even if the requests 
to access the associated object will use them.
https://cloud.google.com/storage/docs/access-control/signed-urls#about-canonical-extension-headers

6. Specify the path to the resource, beginning at the bucket level.
https://cloud.google.com/storage/docs/access-control/signed-urls#about-canonical-resources
*/

/* ACCESSING PUBLIC BUCKETS
If you don't have gsutil, follow these instructions to install gsutil.

Get the name of the bucket containing the public data.

If the bucket is public (and not just some of the data within it), 
you can list some or all of the data (objects) contained in the bucket by using the ls command.

For example, the Google public bucket gcp-public-data-landsat contains the Landsat public dataset. 
You can list files with the prefix LC08/PRE/063/046/LC80630462016 with the command:
gsutil ls -r gs://gcp-public-data-landsat/LC08/PRE/063/046/LC80630462016*

Get specific public objects contained in the bucket by using the cp command.

For example, the following command downloads a file from the bucket 
gcp-public-data-landsat to your local directory:
gsutil cp gs://gcp-public-data-landsat/LC08/PRE/063/046/LC80630462016136LGN00/LC80630462016136LGN00_B11.TIF
*/

/* GCP STORAGE INTEROPERABILITY
Copying many files to a bucket
If you have a large number of files to upload you can use the gsutil -m option, 
to perform a parallel (multi-threaded/multi-processing) copy. To recursively copy subdirectories, 
use the -R flag of the cp command. For example, to copy files including subdirectories from a 
local directory named top-level-dir to a bucket, you can use:
gsutil -m cp -R top-level-dir gs://example-bucket

You can use wildcards to match a specific set of names for an operation. 
For example, to copy only files that start with image:
gsutil -m cp -R top-level-dir/subdir/image* gs://example-bucket

You can remove files using the same wildcard:
gsutil -m rm gs://example-bucket/top-level-dir/subdir/image*

In addition to copying local files to the cloud and vice versa, 
you can also copy in the cloud, for example:
gsutil -m cp gs://example-bucket/top-level-dir/subdir/** 

gs://example-bucket/top-level-dir/subdir/subdir2

gsutil automatically detects that you're moving multiple files and 
creates them in a new directory named subdir2
*/

/* 
* Synchronize a local directory
gsutil -m rsync -r local-dir gs://example-bucket

If you use the rsync -d flag, it signals gsutil to delete files at the destination 
(gs://example-bucket in the command above) that aren't present at the source (local-dir). 
You can also synchronize between two buckets.

* Copy large files to a bucket
gsutil cp local-file gs://example-bucket

* Copy large files from an existing bucket
gsutil cp gs://example-source-bucket/file  gs://example-destination-bucket

* Configure bucket
gsutil ls -L -b gs://example-bucket

In the output, notice the bucket configuration information, most of which is configurable via gsutil:

CORS: controls Cross-Origin-Resource-Sharing settings for a bucket.
Logging: allows you to log bucket usage.
Website: allows objects in the bucket to act as web pages or be used as static assets in a website.
Versioning: causes deletes on objects in the bucket to create archived versions.
Storage Class: allows you to set the set storage class during bucket creation.
Lifecycle: allows periodic operations to run on the bucket - the most common is stale object deletion.

For example, suppose you only want to keep files in a particular bucket around for just one day, 
then you can set up the lifecycle rule for the bucket with:
echo '{ "rule": [{ "action": {"type": "Delete"}, "condition": {"age": 1}}]}' > lifecycle_config.json
gsutil lifecycle set lifecycle_config.json gs://example-bucket

* Verify bucket config
gsutil lifecycle get gs://example-bucket

* Share data from bucket
gsutil acl get gs://example-bucket/file

* You can configure your bucket so that anyone with a Google account can list the files in your bucket. 
* Note that this doesn’t give them access to the data. 
* So while users could see that bigfile exists in your bucket, they couldn’t see its contents.
gsutil acl ch -g 'AllAuthenticatedUsers:R' gs://example-bucket

* PUBLIC SHARING
* You can view the bucket’s ACL with the ls -Lb command:
gsutil ls -Lb gs://example-bucket

* Read access on the bucket so that its contents can be listed
gsutil acl ch -g AllUsers:R gs://example-bucket

* Default bucket ACL so any new objects added at a later date are readable.
gsutil defacl ch -g AllUsers:R gs://example-bucket

* Read access to all of its current contents.
gsutil -m acl ch -R -g AllUsers:R gs://example-bucket

* GROUP SHARING
# Read access to the the bucket so that its contents can be listed.
gsutil acl ch -g 'gs-announce@googlegroups.com:R' gs://example-bucket

# Default bucket ACL so any new objects added at a later date are readable.
gsutil defacl ch -g 'gs-announce@googlegroups.com:R' gs://example-bucket

# Read access to all of a bucket's current contents.
gsutil -m acl ch -R -g 'gs-announce@googlegroups.com:R' gs://example-bucket

* INDIVIDUAL SHARING
# Read access to the bucket so that its contents can be listed.
gsutil acl ch -u liz@gmail.com:R gs://example-bucket

# Default bucket ACL so any new objects added at a later date are readable.
gsutil defacl ch -u liz@gmail.com:R gs://example-bucket

# Read access to all of a bucket's current contents.
gsutil -m acl ch -R -u liz@gmail.com:R gs://example-bucket

* DATA IN BUCKET
# Total Space Used
gsutil du -sh gs://example-bucket

# Total File Count
gsutil ls gs://example-bucket/** | wc -l

# Clean Bucket
gsutil -m rm gs://example-bucket/**
*/

/* CHECKSUMS
When performing copies, the gsutil cp and rsync commands validate that the checksum of 
the source file matches the checksum of the destination file. In the rare event that 
checksums do not match, gsutil will delete the invalid copy and print a warning message. 
For more information, see Checksum Validation.

You can also use gsutil to get the checksum of a file in a bucket or calculate the checksum
of a local object. For example, suppose you copy a Google Genomics public data file to your 
working bucket with:
gsutil -m cp gs://genomics-public-data/1000-genomes/vcf/ALL.chrMT.phase1_samtools_si.20101123.snps.low_coverage.genotypes.vcf gs://example-bucket

Now, you can get the checksums of both the public bucket version of the file and your version of 
the file in your bucket to ensure they match:
gsutil ls -L gs://example-bucket/ALL.chrMT.phase1_samtools_si.20101123.snps.low_coverage.genotypes.vcf
gsutil ls -L gs://genomics-public-data/1000-genomes/vcf/ALL.chrMT.phase1_samtools_si.20101123.snps.low_coverage.genotypes.vcf

Now, suppose your data is in a file at a local data center and you copied it into Google Cloud Storage. 
You can use gsutil hash to get the checksum of your local file and then compare that with the checksum 
of the file you copied to a bucket. To get the checksum of a local file use:
gsutil hash local-file

MD5 values
Running gsutil ls -L on non-composite objects in a bucket returns output like the following:
gs://example-bucket/100MBfile.txt:
        Creation time:          Thu, 26 Mar 2015 20:11:51 GMT
        Content-Length:         102400000
        Content-Type:           text/plain
        Hash (crc32c):          FTiauw==
        Hash (md5):             daHmCObxxQdY9P7lp9jj0A==
        ETag:                   CPjo7ILqxsQCEAE=
        Generation:             1427400711419000
        Metageneration:         1
        ACL:            [
        ....

Running gsutil hash on a local file returns output like the following:
Hashing     100MBfile.txt:
Hashes [base64] for 100MBfile.txt:
        Hash (crc32c):          FTiauw==
        Hash (md5):             daHmCObxxQdY9P7lp9jj0A==

Both outputs have a CRC32c and MD5 value. 
There are no MD5 value for objects uploaded as composite objects as is the case 
when you configuring composite uploads for gsutil.
*/

/* PARALLEL UPLOADS
gsutil -m rm gs://example-bucket/**/gsutil/tmp/parallel_composite_uploads/for_details_see/gsutil_help_cp**
*/

/* NOTIFICATIONS
* Apply Notification
gsutil notification create -t [TOPIC_NAME] -f json gs://[BUCKET_NAME]

* View Notifications
gsutil notification list gs://[BUCKET_NAME]

* Remove Notification
gsutil notification delete projects/_/buckets/[BUCKET_NAME]/notificationConfigs/[CONFIGURATION_NAME]
*/

/* LOGGING
* CONFIGURING LOGGING BUCKET
Create a bucket to store your logs using the following command:
gsutil mb gs://example-logs-bucket

Set permissions to allow Cloud Storage WRITE permission to the bucket.
Cloud Storage must have WRITE permission to create and store your logs as new objects. 
To grant Cloud Storage WRITE access to your bucket, grant the 
cloud-storage-analytics@google.com group write access with the following command:
gsutil acl ch -g cloud-storage-analytics@google.com:W gs://example-logs-bucket

Log objects will have the default object acl of the log bucket. 
You can set the default object acl of the log bucket using gsutil. 
For example, to set the default object acl to project-private:
gsutil defacl set project-private gs://example-logs-

Enable logging for your bucket.
You can enable logging for your bucket using the logging command:
gsutil logging set on -b gs://example-logs-bucket [-o log_object_prefix ] gs://example-bucket

Optionally, you can set the log_object_prefix object prefix for your log objects. 
The object prefix forms the beginning of the log object name. 
It can be at most 900 characters and must be a valid object name. 
By default, the object prefix is the name of the bucket for which the logs are enabled.

* LOGGING STATUS
Using gsutil, you can check logging by using the logging get command:
gsutil logging get gs://example-bucket

You can also save the logging configurations to a file:
gsutil logging get gs://example-bucket > your_logging_configuration_file

If logging is enabled, the server returns the logging configuration in the response:
{"logBucket": "example-logs-bucket", "logObjectPrefix": "log_object_prefix"}

If logging is not enabled, the following is returned:
gs://example-bucket/ has no logging configuration.

* DOWNLOAD LOGS
Your access logs are in CSV format and have the following naming convention:
gs://<bucket_name>/<object_prefix>_usage_<timestamp>_<id>_v0

gsutil cp <logs_object> <destination_uri>
OR GOOGLE CLOUD PLATFORM CONSOLE
*/

/* 
Using gsutil, disable logging with the logging command:

gsutil logging set off gs://example-bucket
To check that logging was successfully disabled, perform a logging get request:

gsutil logging get gs://example-bucket
If logging is disabled, the following is returned:

gs://example-bucket/ has no logging configuration.
*/

/* BIGQUERY FOR ACCESS LOGS -- SEE gcp-access-logs.json FOR CONFIG FILE
Pre-process storage access log files based on the new schema, before loading them into BigQuery.

For example, the following commands can be used in a Linux/Mac OS X or Windows (Cygwin) environment:

gsutil cp gs://example-logs-bucket/example-bucket_storage* .
for f in example-bucket_storage*; do sed -i -e "1s/$/,\"filename\"/" -e "2s/$/,\""$f"\"/" $f; do

The gsutil command copies the files into your working directory. 
The second command loops through the log files and adds "filename" 
to the description row (first row) and the actual file name to the data row (second row). 
Here's an example of a modified log file:
"bucket","storage_byte_hours","filename"
"example-bucket","5532482018","example-bucket_storage_2014_01_05_08_00_00_021fd_v0"

When you load the storage access logs into BigQuery, 
load your locally modified logs and use the customized schema.
for f in example-bucket_storage*; \
  do ./bq.py load --skip_leading_rows=1 storageanalysis.storage $f ./cloud_storage_storage_schema_custom.json; done
*/

/* BUCKET CORS SETTINGS
gsutil cors get
*/
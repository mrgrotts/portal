// Imports the Google Cloud client library
const Logging = require('@google-cloud/logging');

// Creates a client
const logging = new Logging({
  projectId: process.env.GCLOUD_PROJECT_ID
});

// The name of the log to write to
const logName = 'Rozalado-Log';
// Selects the log to write to
const log = logging.log(logName);

// The data to write to the log
const text = 'Hello, world!';
// The metadata associated with the entry
const metadata = { resource: { type: 'global' } };
// Prepares a log entry
const entry = log.entry(metadata, text);

// Writes the log entry
log
  .write(entry)
  .then(() => {
    console.log(`Logged: ${text}`);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });

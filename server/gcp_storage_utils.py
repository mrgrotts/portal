# Creating a signed URL with a program
# You can create a program that generates signed URLs in a number of different languages. Such a program needs to implement the steps for generating a signed URL that are outlined below.

# Generate a new private key, or use an existing private key. The key can be in either JSON or PKCS12 format.

# Expand for instructions on how to generate a private key.
# For more information on private keys and service accounts, see Service Account Authentication.

# Construct the string to be signed.

# Note: After each step of the string construction, add a newline to the string(\n).
# Choose the HTTP_Verb(such as GET, PUT, or DELETE) that the requests utilizing the signed URL must use.

# Add an MD5 digest value if you want to include the value in the requests that will use the signed URL.

# Specify the Content-Type of the object if the requests that will use the signed URL are going to have a Content-Type header.

# Specify the timestamp(in seconds since the Unix Epoch) for when the signed URL expires(that is, when it no longer gives access to the associated object).

# Specify any extension headers, separated by newlines, if the requests that will use the signed URL are going to contain such headers. However, do not specify the x-goog-encryption-key or x-goog-encryption-key-sha256 headers, even if the requests to access the associated object will use them.

# Specify the path to the resource, beginning at the bucket level.

# You can find a table describing each of the components in this string on the Overview of Signed URLs page.

# A signature string containing only the required components might look like the following(note that newlines are shown as actual new lines and not \n):

# GET


# 1388534400
# /bucket/objectname
# Alternatively, the following signature string contains every component and applies to an object with a customer-supplied encryption key(note that newlines are shown as actual new lines and not \n):

# GET
# rmYdCNHKFXam78uCt7xQLw ==
# text/plain
# 1388534400
# x-goog-encryption-algorithm: AES256
# x-goog-meta-foo: bar, baz
# /bucket/objectname
# Sign the string.

# In order to sign the string, you must have an OAuth client ID and private keys for a service account type application, as detailed in the first step of this guide.

# Sign the string you constructed using RSA signatures with SHA256 to authenticate requests.

# For example, in Python you can use the following code to sign your string:

# from oauth2client.service_account import ServiceAccountCredentials
# creds = ServiceAccountCredentials.from_json_keyfile_name([KEY_FILENAME])
# client_id = creds.service_account_email
# signature = creds.sign_blob([SIGNATURE_STRING])[1]
# where:

# [KEY_FILENAME] is the filename containing your private key.
# [SIGNATURE_STRING] is the string you constructed for signing.
# Note: Signing with the RSA algorithm is supported for the Cloud Storage XML API, but not the JSON API. You can also sign URLs using HMAC when using the XML API for interoperable access.
# Within a Google App Engine application, you can use the App Engine App Identity service to sign your string.

# Base64 encode the signature.

# Assemble the URL.

# After you construct the query string and sign it, assemble the URL as follows:

# Create the base URL, which refers to the resource, making sure you use the same value as you used in the query string you just signed. For example:

# https: // storage.googleapis.com/google-testbucket/testdata.txt
# Encode characters in the signature you created as needed so that they can be used in the URL.

# The Base64 encoded signature may contain characters not legal in URLs (specifically + and / ). These values must be replaced by safe encodings (%2B and % 2F, respectively).

# Concatenate the URL you want to distribute as follows:
# BASE_URL contains the URL you created in part a.
# GOOGLE_ACCESS_STORAGE_ID contains the email form of the client ID.
# EXPIRATION contains the same value that you used in the query string you signed.
# URL_ENCODED_SIGNATURE contains the signature you encoded in part b.
# Here is a sample completed URL:
# https://storage.googleapis.com/google-testbucket/testdata.txt?GoogleAccessId=1234567890123@developer.gserviceaccount.com&Expires=1331155464&Signature=BClz9e4UA2MRRDX62TPd8sNpUCxVsqUDG3YGPWvPcwN%2BmWBPqwgUYcOSszCPlgWREeF7oPGowkeKk7J4WApzkzxERdOQmAdrvshKSzUHg8Jqp1lw9tbiJfE2ExdOOIoJVmGLoDeAGnfzCd4fTsWcLbal9sFpqXsQI8IQi1493mw%3D

from oauth2client.service_account import ServiceAccountCredentials
creds = ServiceAccountCredentials.from_json_keyfile_name([KEY_FILENAME])
client_id = creds.service_account_email
signature = creds.sign_blob([SIGNATURE_STRING])[1]
BASE_URL = 'https://storage.googleapis.com/google-testbucket/testdata.txt'
GOOGLE_ACCESS_STORAGE_ID = ''
EXPIRATION = 1331155464
URL_ENCODED_SIGNATURE = ''
FINAL_URL = BASE_URL + "?GoogleAccessId=" + \
    GOOGLE_ACCESS_STORAGE_ID + "&Expires="
+ EXPIRATION + "&Signature=" + URL_ENCODED_SIGNATURE

encoded_signature = base64.b64encode(signature)

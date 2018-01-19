# Portal

Portal is a platform developed with React, Express, NodeJS and MongoDB. It uses JSON Web Tokens (JWT) for authentication, and features multiple user types:

* Admin - global access
* User Admin - team access
* User - basic access

Create React App was used to generate client side boilerplate. This project has already been ejected to enable CSS Modules and other customizations.

## Prerequisites

The following list outlines tools that must be installed locally to run Portal:

* NodeJS
* MongoDB
* Postman - optional

## Setup

1. Open a terminal and start MongoDB (from the directory you installed it in to) --> LEAVE RUNNING
2. Open a second terminal window, `cd server` --> `npm install` --> LEAVE OPEN
3. In the root of the `server` directory, create a file `.env` as follows, replacing values with your own:

```
APP_NAME=YOUR_APP_NAME
DATABASE_URI=YOUR_MONGO_DB_URI
JWT_KEY=YOUR_RANDOM_JWT_STRING
QUICKBOOKS_KEY=YOUR_QUICKBOOKS_KEY
QUICKBOOKS_SECRET=YOUR_QUICKBOOKS_SECRET
```

4. If you plan to use Google Cloud Storage, you must download your `client_secret.json` and include it in the root of the `server` directory
5. If you plan to use Google Cloud Service Accounts, you must download your service account's Private Key as a .json file and include it in the root of the `server` directory
6. `npm run start` --> backend runs on localhost:8080
7. Open a third terminal window, `cd client` --> npm install --> LEAVE OPEN
8. In the root of the `client` directory, create a file `.env` as follows, replacing values with your own:

```
REACT_APP_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
```

9. `npm run start` --> React Dev Server runs on localhost:3000

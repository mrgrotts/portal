# Portal

**Portal** is a platform developed with **React, Express, NodeJS and MongoDB**. It uses **JSON Web Tokens (JWT)** for authentication and features multiple user types:

* Super Admin - Global Access
* Owner - Account Access, Primary User & Admin
* Admin Manager - Account Access
* Admin User - Scoped Account Access
* Customer Manager - Company Access
* Customer User - Scoped Company Access
* New Account - Disabled Account Access

**Create React App** was used to generate client side boilerplate. This project has already been ejected to enable CSS Modules and other customizations.

## Prerequisites

The following list outlines tools that must be installed locally to run Portal:

* NodeJS
* MongoDB
* Postman - optional

## Setup

You could be building sick Portals too:

### MongoDB

1. Open a terminal and start MongoDB **-->** **_LEAVE RUNNING_**

### Server

1. Open a second terminal window, `cd server` **-->** `npm install` **-->** **_LEAVE OPEN_**
2. In the root of the `server` directory, create a file `.env` as follows, replacing values with your own:

```
APP_NAME=YOUR_APP_NAME
APP_DOMAIN=YOUR_DOMAIN
ADMIN_EMAIL=YOUR_EMAIL (FOR NODEMAILER)
ADMIN_PASSWORD=YOUR_PASSWORD (FOR NODEMAILER)
DATABASE_URI=YOUR_MONGO_DB_URI
JWT_KEY=YOUR_RANDOM_JWT_STRING
QUICKBOOKS_KEY=YOUR_QUICKBOOKS_KEY
QUICKBOOKS_SECRET=YOUR_QUICKBOOKS_SECRET
```

3. If you plan to use **Google Cloud Storage**, you must download your `client_secret.json` and include it in the root of the `server` directory
4. If you plan to use **Google Cloud Service Accounts**, you must download your service account's Private Key as a .json file and include it in the root of the `server` directory
5. `npm run start` **-->** backend runs on **localhost:8080**

### Client

1. Open a third terminal window, `cd client` **-->** `npm install` **-->** **_LEAVE OPEN_**
2. In the root of the `client` directory, create a file `.env` as follows, replacing values with your own:

```
REACT_APP_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
```

3. `npm run start` **-->** React Dev Server runs on **localhost:3000**

## Roadmap

All henceforth stated goals are by end of quarter.

### Q2 2018

* Admin Users - IMPLEMENTED
* Email (NodeMailer) - IMPLEMENTED
* Google Cloud Platform - IN PROCESS
* Location Collections - IMPLEMENTED
* Media Gallery
* QuickBooks - IN PROCESS
* Universal Search

### Q3 2018

* Google Calendar
* Offline Mode - IMPLEMENTED
* Push Notifications
* Real Time Geolocation
* Stripe

### Q4 2018

* Builder
* Drag and Drop
* E-Commerce
* Live Chat Agent
* Reports


# Portal

**Portal** is a platform developed with **React, Express, NodeJS and MongoDB**. It uses **JSON Web Tokens (JWT)** for authentication and features multiple user types:

* Admin - Global Access
* User Admin - Team Access
* User - Basic Access

**Create React App** was used to generate client side boilerplate. This project has already been ejected to enable CSS Modules and other customizations.

## Prerequisites

The following list outlines tools that must be installed locally to run Portal:

* NodeJS
* MongoDB
* Postman - optional

## Setup

1. Open a terminal and start MongoDB **-->** **_LEAVE RUNNING_**
2. Open a second terminal window, `cd server` **-->** `npm install` **-->** **_LEAVE OPEN_**
3. In the root of the `server` directory, create a file `.env` as follows, replacing values with your own:

```
APP_NAME=YOUR_APP_NAME
DATABASE_URI=YOUR_MONGO_DB_URI
JWT_KEY=YOUR_RANDOM_JWT_STRING
QUICKBOOKS_KEY=YOUR_QUICKBOOKS_KEY
QUICKBOOKS_SECRET=YOUR_QUICKBOOKS_SECRET
```

4. If you plan to use **Google Cloud Storage**, you must download your `client_secret.json` and include it in the root of the `server` directory
5. If you plan to use **Google Cloud Service Accounts**, you must download your service account's Private Key as a .json file and include it in the root of the `server` directory
6. `npm run start` **-->** backend runs on **localhost:8080**
7. Open a third terminal window, `cd client` **-->** `npm install` **-->** **_LEAVE OPEN_**
8. In the root of the `client` directory, create a file `.env` as follows, replacing values with your own:

```
REACT_APP_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
```

9. `npm run start` **-->** React Dev Server runs on **localhost:3000**
10. Create sick Portals

## Roadmap

All henceforth stated goals are by end of quarter.

### Q2 2018

* Admin Users
* Email (NodeMailer)
* Google Cloud Platform
* Location Collections
* Media Gallery
* QuickBooks
* Universal Search

### Q3 2018

* Calendar
* Offline First
* Push Notifications
* Real Time Geolocation
* Stripe

### Q4 2018

* Builder
* Drag and Drop
* E-Commerce
* Live Chat Agent

## Contributing

Interested in helping build more functionality in to Portal? Please connect with **Joe Grotto** by email at **josephmgrotto@gmail.com**. We'd love the help of developers in creating a robust set of modular components, as well as API functionality that our community can enjoy for their own projects.

## Special Thanks

I wanted to personally take a moment to appreciate all of the great instructors at [Udemy](http://www.udemy.com/) and [Udacity](http://www.udacity.com/) for providing outstanding educational content. I would recommend them both to anyone.

Special Thanks to Ricky and [Rozalado](https://rozaladocleaning.com/) for believing in Portal and our work. You guys are amazing.

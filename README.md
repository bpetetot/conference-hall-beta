# Conference Hall

[![circleci](https://circleci.com/gh/bpetetot/conference-hall.svg?style=shield)](https://circleci.com/gh/bpetetot/conference-hall)
[![Greenkeeper badge](https://badges.greenkeeper.io/bpetetot/conference-hall.svg)](https://greenkeeper.io/)

## Getting started

1. Clone the Conference Hall app

```
git clone https://github.com/bpetetot/conference-hall.git
```

2. Install dependencies with yarn

```
yarn
```

3. Configure the app with [Firebase](#configure-firebase) and [Google APIs](#configure-google-apis)

4. Start the app

```
yarn start
```

### Configure Firebase

1. Create a firebase project with the [firebase console](https://console.firebase.google.com).

  * activate "Cloud Firestore" for Database
  * activate "Google Provider" for Authentication

2. Create a `.env.local` file by copying `.env` file at root folder and set firebase environment variables.

  * REACT_APP_API_KEY=<API_KEY>
  * REACT_APP_AUTH_DOMAIN=<AUTH_DOMAIN>
  * REACT_APP_PROJECT_ID=<PROJECT_ID>

3. Install [firebase-cli](https://firebase.google.com/docs/cli/) :

```
npm install firebase-tools -g
```

4. You must be logged with firebase and select project :

```
firebase login
firebase use --add
```

> [Firebase documentation](https://firebase.google.com/docs/web)

### Configure Google APIs

Activate the following APIs in the [Google developer console](https://console.developers.google.com/apis) :

* Google Places API Web Service
* Google Maps Embed API
* Google Maps JavaScript API

### Configure Mailgun

The application sends emails through the [Mailgun API](https://www.mailgun.com/)

You have to create a Mailgun account if you want to send those emails, if not the app will still works perfectly but without sending any email.

Mailgun API is used to send email through Cloud Functions, so you will have to add environment variables with firebase CLI :
* The application URL: `app.url` (ex: `http://localhost:3000`)
* The API key: `mailgun.key`
* The domain name: `mailgun.domain`

Here the command to register those variables:

```
firebase functions:config:set app.url="https://myserver.com" mailgun.key="MAILGUN API KEY" mailgun.domain="YOUR DOMAIN NAME"
```

To test cloud functions with Mailgun on local machine (with cloud function shell), you will need to generate `.runtimeconfig.json` file with environment variables :

```
firebase functions:config:get > .runtimeconfig.json
```

> **Important Note:** Mailgun is an external service from Firebase and Google, so to be able use it with you will need to activate Firebase pricing.

## Deploy with Firebase

Build and deploy the app :

```
yarn build
firebase deploy
```

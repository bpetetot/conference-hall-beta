# Conference Hall

## Firebase

Firebase [documentation](https://firebase.google.com/docs/web)

### Configure

Create a firebase project with the [firebase console](https://console.firebase.google.com).

Create a `.env.local` file by copying `.env` file and set firebase configuration variables.

### Deploy
Install [firebase-cli](https://firebase.google.com/docs/cli/) :
```
npm install firebase-tools -g
```

You must be logged with firebase and select project :
```
firebase login
firebase use --add
```

Build and deploy the app :
```
yarn build
firebase deploy
```

## Google APIs

[Google developer console](https://console.developers.google.com/apis)

Activer les services :
* Google Places API Web Service
* Google Maps Embed API

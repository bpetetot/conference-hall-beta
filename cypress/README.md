# Cypress for Conference Hall

## Setup

To run Cypress tests for Conference Hall, you have to configure a **dedicated Firebase project**.

Follow the following steps to setup Cypress env.
1. Create and configure a Firebase project for Conference Hall Cypress tests.
2. Deploy the app on the instance
3. Authenticate with a user to the app and get the user UID
4. Configure the `cypress/config.json` with:
    * The UID in the property `TEST_UID`
    * The project ID in the property `FIREBASE_PROJECT_ID`

## Configure & Execute Cypress locally

1. From the firebase project settings, download a `serviceAccount.json` file and copy it to the project root folder
2. Set Firebase environment variables in your `.env.local` file.

    * `REACT_APP_API_KEY=<API_KEY>`
    * `REACT_APP_AUTH_DOMAIN=<AUTH_DOMAIN>`
    * `REACT_APP_PROJECT_ID=<PROJECT_ID>`
    * `FIREBASE_TOKEN=<TOKEN>` you can get it with command: `firebase login:ci`

3. Launch the app: `yarn start`
4. Launch Cypress:

    * With user interface: `yarn cypress:open`
    * In headless mode: `yarn cypress`

## Configure Cypress in the CI

1. From the firebase project settings download a `serviceAccount.json` file
2. Encode the `serviceAccount.json` file in base64

    * `cat serviceAccount.json | base64`

3. Set Firebase environment variables in your CI.

    * `E2E_FIREBASE_API_KEY=<API_KEY>`
    * `E2E_FIREBASE_AUTH_DOMAIN=<AUTH_DOMAIN>`
    * `E2E_FIREBASE_PROJECT_ID=<PROJECT_ID>`
    * `E2E_FIREBASE_DEPLOY_TOKEN=<TOKEN>` you can get it with command: `firebase login:ci`
    * `E2E_FIREBASE_SERVICE_ACCOUNT=<BASE64>` set the encoded base64 `serviceAccount.json` file
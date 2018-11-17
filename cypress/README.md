# Cypress for Conference Hall

## Setup

To run Cypress tests for Conference Hall, you have to configure a **dedicated Firebase project**.

Follow the following steps to setup Cypress env.
1. Create and configure a Firebase project for Conference Hall Cypress tests.
2. Activate "Email address / Password" login in "Authentication" Tab.
3. Add the following email / password with the Firebase Interface:
    - **email:** cypress@conference-hall.io
    - **password:** cypress
4. Set Firebase environment variables in your `.env.local` file.

  * CYPRESS_APP_API_KEY=<API_KEY>
  * CYPRESS_APP_AUTH_DOMAIN=<AUTH_DOMAIN>
  * CYPRESS_APP_PROJECT_ID=<PROJECT_ID>
  * CYPRESS_APP_TOKEN=<TOKEN>

## Execute

1. Launch the app: `yarn start`
2. Launch Cypress:
   - With user interface: `yarn cypress:open`
   - In headless mode: `yarn cypress:run`
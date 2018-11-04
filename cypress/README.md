# Cypress for Conference Hall

## Setup

To run Cypress tests for Conference Hall, you have to configure a **dedicated Firebase project**.

Follow the following steps to setup Cypress env.
1. [Create and configure a Firebase project for Conference Hall](../README.md)
2. Activate "Email address / Password" login in "Authentication" Tab
3. Add the following email / password with the Firebase Interface:
    - **email:** cypress@conference-hall.io
    - **password:** cypress

## Execute

**In your local environment,** Cypress will use your `.env.local` file.

**In CI environment,**  Cypress will need the following environment variables.
```
CYPRESS_APP_API_KEY=<api_key>
CYPRESS_APP_AUTH_DOMAIN=<auth_domain>
CYPRESS_APP_PROJECT_ID=<project_id>
```

1. Launch the app: `yarn start`
2. Launch Cypress:
   - With user interface: `yarn cypress:open`
   - In headless mode: `yarn cypress:run`
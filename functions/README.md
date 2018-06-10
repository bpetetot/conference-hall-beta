# Cloud functions

## Prerequities

Cloud functions uses its own `package.json`, all commands must be done in `/functions` folder:

Install dependencies:
```
yarn
```

## Development

### Test APIs locally

```
yarn api
```

You can test it on `http://localhost:5000/api/v1/xxx?key=<API_KEY>`

An API key must be generated in Conference Hall app.

### Test triggered functions

```
yarn shell
```

See [cloud functions documentation](https://firebase.google.com/docs/functions/local-emulator) for more info.

## Deployment

To deploy only functions, you can do:

```
yarn deploy
```
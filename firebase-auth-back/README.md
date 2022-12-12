Project based on: https://codingbeautydev.com/blog/auth-react-node-firebase/

References:
https://stackoverflow.com/a/69151259/18804917
https://firebase.google.com/docs/auth/web/manage-users
https://firebase.google.com/docs/auth/web/password-auth
https://firebase.google.com/docs/auth/web/google-signin
https://firebase.google.com/docs/web/setup

Firebase functions: 
https://firebase.google.com/docs/functions/get-started
https://www.npmjs.com/package/firebase-functions

Another userful tutorial: https://www.youtube.com/watch?v=H_PwteNwPr0


## Quickstart

```bash
cd functions
npm install
npm run serve

curl --location --request POST 'http://localhost:5001/cb-auth-tutorial-9b7d8/us-central1/api/auth/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "email@gmail.com",
    "password": "123456",
    "secureNote": "123"
}'
```





## Where to initialize Firebase

You should be able to put this anywhere in the application, as long as it is run before you attempt to use the admin client. Once initializeApp has been called, any other file that is imported and requires firebase-admin itself will also be authenticated.

https://stackoverflow.com/a/49808447/18804917



## To use typescript

```bash
npm install -g typescript
```

In the root project 

```bash
tsc --init
npm i --save-dev @types/node
npm i --save-dev @types/express
```

in tsconfig.json uncomment

```json
"moduleResolution": "node",
```

By deafult Typescript is tuned for web apps running in the browser and therefore this import will not be available:

```js
const express = require('express');
```

we should instead use this syntax:

```js
import express from 'express';
```

It however will be compiled to JS in the `require` syntax. So there will be a difference between the code we write and the code that will actually run in the server

instead of 
```js
module.exports = x;
```
use 
```js
export default x;
```

IMPORTANT: the functions library must be imported like:

```js
import * as functions from 'firebase-functions';
```
so we can access all of its methods.

To compile TS to JS just type tsc in the terminal, if you don't point at a specific file (tsc main.js) the configuration file will be taken into account and all types of files will be configured.

#### interface vs type

if you're just defining the structure of an object, both are correct tough interface is most common- interfaces can also be used to force classes to implement methods

Adding the libraries @type is to help for autocompletion but is not mandatory

References for TS and firestore Functions:

- https://firebase.google.com/docs/functions/typescript#migrating_an_existing_javascript_project_to_typescript
- https://stackoverflow.com/a/53629381/18804917
- https://bobbyhadz.com/blog/typescript-cannot-write-file-because-it-would-overwrite-input-files#:~:text=The%20error%20%22Cannot%20write%20file,being%20type%20checked%20and%20compiled.
- https://firebase.google.com/docs/emulator-suite/install_and_configure
- https://blog.logrocket.com/rest-api-firebase-cloud-functions-typescript-firestore/
- https://www.becomebetterprogrammer.com/how-to-use-error-handler-middleware-with-express-js-and-typescript/
- https://firebase.google.com/docs/functions/http-events

### Adding custom properties to the express Request type

https://blog.logrocket.com/extend-express-request-object-typescript/


To test: https://railsware.com/blog/mocking-es6-module-import-without-dependency-injection/

### Difference between firebase and firebase-admin package

https://stackoverflow.com/a/42959080/18804917

### Google signin

https://firebase.google.com/docs/auth/web/google-signin

## Email and password signin

https://firebase.google.com/docs/auth/web/password-auth
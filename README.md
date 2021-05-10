# Xendit assignment
This assignment is developed using **create-react-app**. The benefit of using `cra` is that you don't have to worry about webpack, babel and other build dependecies.

## Hosting URL
You can access the hosted application via https://xendit-242a3.web.app/, but due to https call over to http, the search request will failed, thus recommend to run on local.

## Getting Started

### Prerequisites
Please ensure that you have node install in your local machine.

### Run in development mode
Your application should start in localhost:3000 by default
```
npm install
npm start
```
> In order for **newletters** to work, please run the backend server from the `server` folder. Newsletter page will perform POST request upon a `Email` is submitted with the axios called to `/newletters` and write it to `users.json`

### Run in production mode
The application should start in localhost:5000 by default
```
npm install 
npm run build
serve -s build or npm run serve
```

## Unit testing
Due to limited time, not able to cover unit testing

## Tech Stack
1. React (with Hook) - Allow you to use state and other features without writing class
2. React Redux - Redux Hooks as an alternative to the existing connect() higher order component. Allow you to connect to the Redux store and dispatch actions without having to wrap your components in connect().
3. Firebase - You don't need to write your own authentication, realtime database with firestore, simple deployment with `firebase.json`
4. Material UI - Provide extensive components for you to style your application UI
5. Nodejs (for newsletter) - Due to react stubbed out `fs` from frontend, nodejs is the right choice for backend service to save the email to json in this assignment.

## Authors
- Alan Pang
- alantakashi@gmail.com
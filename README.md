# 👌

A sleek Todo application created by **Viktor Rudi** in the summer of 2019.

This is a fully functional **MERN** (Mongodb, Express, React, Node.JS) full stack application.

Frontend built using **React** 16.8, by taking advantage of the Context API and hooks.
Backend built using **Express**, with set up API routes for handling requests in the application.

In this applicaton you will be able to register user accounts (with a visual input verification), and login to create private todo items and folders. You can also reset your password.

> Dependencies
> Frontend: `js-cookie`, `react-icons`, `react-spinners`, `axios`, `lodash`, `react-dnd`
> Backend: `bcrypt`, `dotenv`, `jsonwebtoken`, `mongoose`, `nodemon`, `nodemailer`

> Eslint: Used [Standard](https://github.com/standard/eslint-config-standard) configuration.

# Interested in contributing?

You are very welcome to contribute to this project. To get started, fork or clone this repo, and run the following:

1. Install all dependencies with `npm i`
2. In the **frontend** directory: `npm run start`
3. In the **backend** directory: `nodemon server`
4. Set up a .env file in the **backend** directory with the following variables with something you can use:

```
DB_CONNECTION=
PORT=4000
MAILING_ACCOUNT=
MAILING_PASSWORD=
```

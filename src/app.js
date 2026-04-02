const express = require('express');
const session = require('express-session');
const path = require('path');
const nunjucks = require('nunjucks');

const authRoutes = require('./routes/auth.routes');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: 'change-this-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true
    }
  })
);

nunjucks.configure(path.join(__dirname, 'views'), {
  autoescape: true,
  express: app
});

app.set('view engine', 'njk');

app.use(express.static(path.join(__dirname, 'public')));

app.use(authRoutes);

module.exports = app;
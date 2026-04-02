const express = require('express');
const session = require('express-session');
const path = require('path');
const nunjucks = require('nunjucks');
const helmet = require('helmet');

const env = require('./config/env');
const authRoutes = require('./routes/auth.routes');
const { ensureCsrfToken, verifyCsrfToken } = require('./middleware/csrfMiddleware');
const { blockCrossSiteStateChanges } = require('./middleware/fetchMetadataMiddleware');

const app = express();

app.set('trust proxy', 1);

app.use(helmet({
  contentSecurityPolicy: false
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    secret: env.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: env.nodeEnv === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 2
    }
  })
);

nunjucks.configure(path.join(__dirname, 'views'), {
  autoescape: true,
  express: app
});

app.set('view engine', 'njk');

app.use(express.static(path.join(__dirname, 'public')));

app.use(ensureCsrfToken);
app.use(blockCrossSiteStateChanges);
app.use(verifyCsrfToken);

app.get('/', (req, res) => {
  res.send('Accueil');
});

app.use(authRoutes);

module.exports = app;
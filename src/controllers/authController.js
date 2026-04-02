const authService = require('../services/auth.service');

async function showSignupPage(req, res) {
  res.render('signup', { error: null, old: {} });
}

async function signup(req, res) {
  try {
    const { username, password, passwordConfirm } = req.body;

    if (password !== passwordConfirm) {
      throw new Error('Les mots de passe ne correspondent pas.');
    }

    const user = await authService.registerUser(username, password);

    req.session.regenerate((err) => {
      if (err) {
        return res.status(500).render('signup', {
          error: 'Erreur de session.',
          old: { username }
        });
      }

      req.session.user = user;
      res.redirect('/');
    });
  } catch (error) {
    res.status(400).render('signup', {
      error: error.message,
      old: { username: req.body.username || '' }
    });
  }
}

module.exports = {
  showSignupPage,
  signup
};
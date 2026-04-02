const express = require('express');
const rateLimit = require('express-rate-limit');
const authController = require('../controllers/authController');
const { redirectIfAuthenticated } = require('../middleware/authMiddleware');

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Trop de tentatives. Réessaie plus tard.'
});

router.get('/signup', redirectIfAuthenticated, authController.showSignupPage);
router.post('/signup', authLimiter, redirectIfAuthenticated, authController.signup);

module.exports = router;
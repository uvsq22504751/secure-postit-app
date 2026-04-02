const express = require('express');
const authController = require('../controllers/authController');
const { redirectIfAuthenticated } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/signup', redirectIfAuthenticated, authController.showSignupPage);
router.post('/signup', redirectIfAuthenticated, authController.signup);

module.exports = router;
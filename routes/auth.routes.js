const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout); // simple token discard on client
router.get('/me', require('../middlewares/auth'), authController.me);

module.exports = router;
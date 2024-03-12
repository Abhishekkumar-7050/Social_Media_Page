const router = require('express').Router();
const authController = require('../controllers/authCntrl.js');
router.post('/signup',authController.signupController);
router.post('/login',authController.logInController);
router.post('/refresh',authController.refreshAccessToken)

module.exports = router

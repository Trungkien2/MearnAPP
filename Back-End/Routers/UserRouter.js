const express = require('express');
const AuthController = require('../Controllers/AuthController');
const verifiToken = require('../middleware/auth');

const {signUp,login,checkUserLogin} = AuthController

const router = express.Router();


router.post('/signup',signUp)

router.post('/login',login)
router.get('/',verifiToken,checkUserLogin)




module.exports = router;
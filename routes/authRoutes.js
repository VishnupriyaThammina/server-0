const express = require('express')
// we need express router here so we are requiring express here
const router = express.Router();

const {signUp, login, logout} = require('../controllers/authController')

router.post('/signup',signUp)
router.post('/login',login)
router.post('/logout',logout)


module.exports = router
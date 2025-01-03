const { register, login, refreshToken } = require('../controllers/authController');


const router = require('express').Router();

router.route('/register').post(register);

router.route('/login').post(login);

router.route('/refresh-token').post(refreshToken);



module.exports = router;
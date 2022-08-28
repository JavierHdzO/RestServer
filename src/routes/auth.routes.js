const { Router } = require('express');
const { check } = require('express-validator');

const { existsEmailValidator } =  require('../helpers/db-validator');
const { validSlots } = require('../middlewares/valid-slots');

const {
        login,
        googleSignIn } = require( '../controllers/auth.controllers' );


const router = Router();

router.post('/login',[
    check('email', 'Email is obligatory').isEmail(),
    check('password', 'Password is obligatory').not().isEmpty(),
    validSlots
], login);

router.post('/google',[
    check('idToken', "Google's idToken is obligatory").not().isEmpty(),
    validSlots
], googleSignIn);



module.exports = router;
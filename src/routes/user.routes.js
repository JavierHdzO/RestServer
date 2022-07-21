const { Router } = require('express');
const { check } = require('express-validator');

/** Middlewares */
const { validSlots } = require('../middlewares/valid-slots')

const { 
        roleValidator, 
        existsEmailValidator, 
        existsUserByID } = require('../helpers/db-validator');


/** Controllers */
const { 
        getApi,
        posttApi,
        deleteApi,
        putApi } = require('../controllers/user.controllers');




/**init router - express */
const router = Router();


/** Routes */
router.get('/',[
    // check('limit', 'Limit have to be a number').isNumeric(),
    // check('to', 'To have to be a number').isNumeric(),
    validSlots
],getApi);

router.post('/', [
    check('name', "name is obligatory").not().isEmpty(),
    check('password', 'password is obligatory'),
    check('password', 'Must be at least 8 characters').isLength({ min: 8 }),
    check('email', "Email is not valid").isEmail(),
    // check('role', 'Role: It is valid role ').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom( roleValidator ),
    check('email').custom( existsEmailValidator ),
    validSlots
], posttApi);

router.put('/:id', [
    check('id', 'ID is not valid').isMongoId(),
    check('id').custom( existsUserByID ),
    check('role').custom( roleValidator ),
    validSlots
] ,putApi);

router.delete('/:id', [
    check('id', 'ID is not valid').isMongoId(),
    check('id').custom( existsUserByID ),
    validSlots
],deleteApi);



module.exports = router;
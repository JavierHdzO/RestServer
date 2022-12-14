const { Router } = require('express');
const { check } = require('express-validator');

const { 
        validateJwt,
        isAdminRole,
        validSlots } = require('../middlewares')

const { existsProductByID } = require('../helpers/db-validator');

const {
        getProducts,
        getProduct,
        createProduct,
        updateProduct,
        deleteProduct } =  require('../controllers/products.controllers');

const router = Router();

router.get('/', getProducts);

router.get('/:id',[
    check('id', 'iD  is invalid').isMongoId(),
    check('id').custom( existsProductByID ),
    validSlots
], getProduct);

router.post('/',[
    validateJwt,
    check('name', "Name field is required").not().isEmpty(),
    check('category', "Category field is required").isMongoId(),
    validSlots
],createProduct)

router.put('/:id',[
    validateJwt,
    check('name', 'Name field is required').not().isEmpty(),
    check('category', 'Category is invalid').isMongoId(),
    check('id').custom( existsProductByID ),
    validSlots
],updateProduct)

router.delete('/:id',[
    validateJwt,
    check('id', 'ID is invalid').isMongoId(),
    check('id').custom( existsProductByID ),
    validSlots
], deleteProduct)


module.exports = router;
const { Router } = require('express');
const { check } = require('express-validator');

const { existsEmailValidator, existsCategoryByID, existsCategoryByName } =  require('../helpers/db-validator');
const { validSlots, validateJwt, isAdminRole, categoryExists } = require('../middlewares');


const {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/categories.controllers');

// const {

// } = require('../controllers/categories.controllers');

const router = Router();

//Obtener todas las categorias
router.get('/',getCategories);

//Obtener una categoria por ID
router.get('/:id',[
    validateJwt,
    check('id', 'ID is invalid').isMongoId(),
    check('id').custom(existsCategoryByID),
    validSlots
],getCategory );

//Crear categoria - cualquiera con token valido
router.post('/', [ 
        validateJwt,
        check('name', 'Name is required').not().isEmpty(),
        validSlots
    ], createCategory );

// Actualizar un registro por el ID - cualquiera con token valido
router.put('/:id',[
    validateJwt,
    check('id', 'ID can not empty').not().isEmpty(),
    check('id', 'ID invalid').isMongoId(),
    check('name', 'name param is required').not().isEmpty(),
    check('id').custom(existsCategoryByID),
    check('name').custom(existsCategoryByName),
    validSlots
],updateCategory);

// Delete una categoria - sp;p si es admin

router.delete('/:id',[
    validateJwt,
    isAdminRole,
    check('id', 'ID is Invlid').isMongoId(),
    check('id').custom(existsCategoryByID),
    validSlots
], deleteCategory);


module.exports = router;
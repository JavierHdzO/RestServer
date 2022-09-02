const { Router } = require('express');
const { check } = require('express-validator');

const { existsEmailValidator } =  require('../helpers/db-validator');
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
router.get('/',[
    validateJwt
],getCategories);

//Obtener una categoria por ID
router.get('/:id',[
    validateJwt,
    check('id').isMongoId(),
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
    validSlots,
    categoryExists
],updateCategory);

// Delete una categoria - sp;p si es admin

router.delete('/:id',[
    validateJwt,
    isAdminRole,
    check('id', 'ID Invlid').isMongoId(),
    validSlots
], deleteCategory);


module.exports = router;
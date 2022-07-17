const { Router } = require('express');

/** Import controller for paths */
const { getApi,
        posttApi,
        deleteApi,
        putApi } = require('../controllers/api.controllers');


/**init router - express */
const router = Router();

router.get('/', getApi);
router.post('/', posttApi);
router.delete('/', deleteApi);
router.put('/', putApi);


module.exports = router;
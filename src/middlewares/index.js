
const validSlots = require('../middlewares/valid-slots');
const validateJwt = require('../middlewares/validate-JWT');
const validateRoles=  require('../middlewares/validate-role');


module.exports = {
    ...validSlots,
    ...validateJwt,
    ...validateRoles
}
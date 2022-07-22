
const Role = require('../models/role');
const User = require('../models/usuario');

const roleValidator = async(role = '') => {
    const roleExists = await Role.findOne( { role } );

    if ( !roleExists ) {
        throw new Error('Role is not valid');
    }

    
};

const existsEmailValidator = async ( email = '' ) => {
    const existsEmail = await User.findOne( { email } );

    if ( existsEmail ) {
        throw new Error('Email has already been registered');
    }

};


const existsUserByID = async(id) => {
    const user = await User.findById(id);

    if( !user ) throw new Error('User no exists');
};




module.exports = {
    roleValidator,
    existsEmailValidator,
    existsUserByID
};
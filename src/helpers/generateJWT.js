const jwt = require('jsonwebtoken');

const generateJWT = ( uid = '' ) => {
    return new Promise( (resolve, reject) => {
        const payload = { uid };

        jwt.sign( payload, process.env.PRIVATEKEY, {
            expiresIn: '4h'
        }, ( error, token )=>{
            if( error ){
                console.log(error);
                reject("Can't generate token");
            }else{
                resolve(token);
            }

        });

    });
}

module.exports = {
    generateJWT
};
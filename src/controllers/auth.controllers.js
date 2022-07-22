
const { request, response } = require('express');

const User = require('../models/usuario');
const { generateJWT } = require('../helpers/generateJWT');



const login = async ( req, res =  response ) =>{

    const { email, password } = req.body;
    
    try {

        // must verify if email exists

        const user = await User.findOne( { email } );

        if ( !user ) return res.status(400).json({msg:'Incorrect username or password - email'})
        // must verify if user still exists

        if( !user.status ) return res.status(400).json({ msg:'Incorrect username or password - status' });
        
        // must verify if paassword is correct
        
        const existsPassword = await user.comparePassword(password);

        if( !existsPassword ) return res.status(400).json({ msg:'Incorrect username or password - password' });
        
        // Generate JWT

        const token = await generateJWT(user._id);


        res.json({
            user,
            token
        });
        
    } catch (error) {

        console.log(error);
        return res.status(500).json({
            msg: 'Report to admin this error'
        });

    }


}

module.exports = {
    login
}
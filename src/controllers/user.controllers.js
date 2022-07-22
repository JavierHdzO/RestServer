const { request, response } = require('express');

const User = require('./../models/usuario');


const getApi = async (req = request, res = response) => {

    const { limit = 5, to = 0 } = req.query;
    const query = { status:true };


    const [total, users] = await Promise.all( [
        User.countDocuments( query ),
        User.find( query )
            .skip( Number( to ) )
            .limit( Number( limit ) )
    ]);

    res.json({
        total,
        users
    });

}
const posttApi = async (req = request, res) => {

    /** get Params from body */
    const {name, email, password, role} = req.body;

    const user = new User({
        name,
        email,
        password,
        role
    });

    /** Encrypt Password */
    user.password = await user.encryptPassword(user.password);

    await user.save();

    res.json({
        user
    });

}


const putApi = async (req = request, res) => {
    const { id } = req.params;

    const { _id, password, google, email, ...content } = req.body;

    // Todo validate within db
    const user = await User.findByIdAndUpdate(id, content);
    
    if ( password ) {
        user.password = await user.encryptPassword( password );
        await user.save();  
    }

    res.json({
        user
    });

}


const deleteApi = async (req, res) => {
    const { id } = req.params;

    const { authUser } = req;

    const user = await User.findByIdAndUpdate(id, { status: false });

    console.log(authUser);
    
    res.json(
        user
    );

}

module.exports = {
    getApi,
    posttApi,
    deleteApi,
    putApi
}


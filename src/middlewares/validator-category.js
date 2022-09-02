const {Category} = require('../models');


const categoryExists = async( req, res, next) => {

    const name  = req.body.name.toUpperCase();

    const category = await Category.findOne({name});

    if( category ) return res.status(401).json({
        msg:`${name} category is alredy registered`
    });

    next();

}

module.exports = {
    categoryExists
}
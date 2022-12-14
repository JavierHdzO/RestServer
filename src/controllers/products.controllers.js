const { request, response} = require('express');

const { Product, Usuario, Category } = require('../models');


const getProducts = async(req, res) => {

    const { limit = 5, to = 0 } = req.query;
    const query = { status: true };

    try {
        const [total, products] = await Promise.all([
                Product.countDocuments( query ),
                Product.find()
                    .skip(to)
                    .limit(limit)
                    .populate('user', 'name')
                    .populate('category', 'name')
        ]);

        res.json({
            total,
            products
        });

    } catch (error) {
        console.log( error );
        res.status(401).json({
            msg:"Can't get registers"
        })
    }
    
}

const getProduct = async(req, res) => {

    const { id } = req.params;

    try {
        const product = await Product.findById( id )
                                        .populate('user', "name")
                                        .populate('category', "name");

        if( !product ) return res.status(401).json({
            msg: `Product with this ${id} not exist`
        });

        res.json( product );
    } catch (error) {
        res.status(401).json({
            msg:"Can't get register"
        })
    }
}


const createProduct = async(req, res =  response) => {
    const { status, available, ...data } = req.body;


    try {

        data["user"] =  req.uid;

        const [category, user ] = await Promise.all([
            Category.findById( data.category ),
            Usuario.findById( data.user )
        ]);

        if(!category) return res.status(401).json({
            msg:`Category with ${data.category} id was not found`,
        });

        if(!user) return res.status(401).json({
            msg:`User with ${data.category} id was not found`,
        });

        const product = await new Product( {...data});

        product.save();

        res.json( product );

    } catch (error) {
        console.log( error );
        res.status(401).json({
            msg:"Can't create a new register"
        })
    }
}

const updateProduct = async(req, res) => {
    const { id } = req.params;

    const { status, available, _id,  ...rest } = req.body;

    if( rest.name ) {
        rest.name = rest.name.toUpperCase();
    }

    rest["user"] = req.uid;

    try {

        const product = await Product.findByIdAndUpdate( id, rest, {new: true});

        if( !product ) return res.status(401).json({
            msg:'Updating was not successful, try later'
        })

        res.json(
            product
        );
        
    } catch (error) {
        console.log( error );
        res.status(401).json({
            msg:"Can't update the specified register"
        })
    }

}

const deleteProduct = async(req, res) => {
    const { id } = req.params;
    const query = { status: false };

    try {
        
        const product = await Product.findByIdAndUpdate(id, query);

        if( !product ) return res.status(401).json({
            msg: "Deleting wan not successful, try later"
        });

        res.json( product );

    } catch (error) {
        console.log( error );
        res.status(401).json({
            msg:"Can't delete the specified register"
        })
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}
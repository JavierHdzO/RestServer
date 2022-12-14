const { response } = require("express");
const { ObjectId } = require('mongoose').Types;
const { Usuario, Product, Category } = require('../models')

const availableColections = [
    'users',
    'categories',
    'products',
    'roles'
];

const searchUsers = async( termn = '', res = response) => {

    try{
    const isMongoID = ObjectId.isValid( termn );

    if( isMongoID ){

        const user = await Usuario.findById( termn );

        return res.json({
            ok:true,
            data:{
                "user":( user ) ? [ user ]: []
            }
        });
          
    }

    const regex = new RegExp( termn, 'i' );

    const users = await Usuario.find({ 
        $or: [{ name:regex }, { email:regex }],
        $and: [{ status:true }]
     });
    
  
    return res.json({
        "ok": true,
        "data":{
            users
        }
    });


    }
    catch(error){
        console.log(error);
        res.status(500).json({
            "ok":false,
            "msg":"Try later, If the problem persists, report to the admin"
        });
    }
    
}

const searchCategories = async( termn = "", res =  response)=>{

    try{
        const isMongoID = ObjectId.isValid( termn );

        if(isMongoID){
            
            const category = await Category.findById(termn);

            if(category){
                return res.json({
                    "ok": true,
                    "data":{
                        category
                    }
                });
            }

            const categories = await Category.find({ user: termn });
            return res.json({
                "ok": true,
                "data":{
                    "categories": categories || []
                }
            });
        }

        const regex = new RegExp(termn, 'i');

        const categories = await Category.find( {  name: regex, status: true } );

        res.json({
            "ok": true,
            "data":{
                "categories": categories || []
            }
        });  

    }
    catch(error){
        console.log(error);

        res.status(500).json({
            "ok":false,
            "msg": "Try later, If the problem persists, report to the admin"
        });

    }

}


const searchProduct = async( termn, res =  response) => {
    try{
        const isMongoID = ObjectId.isValid( termn );
        let products = null;

        if( isMongoID ){

            const product = await Product.findById(termn);

            if( product ){
                return res.json({
                    "ok": true,
                    "data":{
                        "product": product || []
                    }
                });
            }

            
            products = await Product.find({
                $or: [ {user: termn}, {category: termn} ],
                $and: [ {status: true} ]
            });

            return res.json({
                "ok": true,
                "data":{
                    "products": products || []
                }
            });   
            
        }

        
        if( !isNaN(termn) ){
            products = await Product.find({ price: parseFloat(termn), status: true });
            console.log('entro');
            console.log( { "price": parseFloat(termn) });
        }else{
            const regex =  new RegExp( termn, 'i');

            products =  await Product.find({
                $or: [ {name: regex}, {description: regex} ],
                $and: [ {status: true} ]
            });
        }

        res.json({
            "ok": true,
            "data":{
                "products": products || []
            }
        });

    }
    catch( error ){
        console.log(error);
        res.status(500).json({
            "ok":false,
            "msg":"Try later, If the problem persists, report to the admin"
        });
    }


}


const search = ( req, res = response) => {

    const { collection, termn } =  req.params;
    
    if( !availableColections.includes(collection) ){
        return res.status(400).json({
            msg: `The available collections are ${ availableColections } `
        })
    }

    switch( collection ){
        case 'users':
            searchUsers( termn, res );
            break;
        case 'categories':
            searchCategories(termn, res);
            break;
        case 'products':
            searchProduct(termn, res);
            break;
        default:
            res.status(500).json({
                ok: false,
                msg: 'At the moment, this query is no available'
            })
    }

}


module.exports = {
    search
}
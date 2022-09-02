const { request, response } = require('express');

const { Category } = require('../models');


// getCategories - pages - total - populate
const getCategories = async( req = request, res = response ) => {

    const { limit = 5, to = 0 } = req.query;
    const query = { status: true };

    try {

        const [total, categories ] = await Promise.all([
            Category.countDocuments( query),
            Category.find( query )
                .populate('user', 'name')
                .skip( Number(to) )
                .limit( Number(limit) )
        ]);

        res.json({
            total,
            categories
        });

        
    } catch (error) {
        res.status(400).json({
            msg: "Can't get categories"
        });
    }
}

// getCategory - populate
const getCategory =  async(req, res = response) => {

    const { id } = req.params;

    try {
        
        const category =  await Category.findById(id)
                                            .populate('user', 'name');

        if( !category ) return res.status(201).json({
            msg:`Category with this ${id} not exist`
        })

        res.json(
            category
        )

    } catch (error) {
        res.status(401).json({
            msg:"Can't find category"
        })
    }


}

const createCategory =  async(req = request, res = response ) => {
    
    const name = req.body.name.toUpperCase();

    
    try {
        const categoryDB = await Category.findOne( {name} );
    
        if( categoryDB ) return res.status(400).json({
            msg:` ${name} category has already been defined`
        });
    
        const data = {
            name,
            user: req.uid
        }

        const category = new Category( data );
        await category.save();

        res.status(201).json(
            category
        );
        
    } catch (error) {
        
        res.status(400).json({
            ok:false,
            msg:"Can't add a new category"
        });
    }

}

const updateCategory = async( req = request, res = response) => {

    const { id } = req.params;
    const name = req.body.name.toUpperCase();

    try {
        
        const updateCategory = await Category.findByIdAndUpdate(id, {name});

        if( !updateCategory ) return res.status(401).json({
            msg:`Doesnt exist category with ${id} ID`
        });

        res.json( updateCategory );

    } catch (error) {
        res.status(400).json({
            msg:'Can not update category',
            error
        })
    }
}

const deleteCategory = async( req, res = response) => {

    const {id} = req.params;

    try {
        const category = await Category.findByIdAndUpdate(id, {status:false});

        if( !category )  return res.status(401).json({
            msg:`Category not found with ${id} ID`
        });

        res.json( category );
    } catch (error) {
        
    }

}

module.exports = {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
}
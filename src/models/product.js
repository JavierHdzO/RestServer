const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Categorie',
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    available: {
        type: Boolean,
        default: true
    }

});

ProductSchema.methods.toJSON = function(){
    const {__v, _id, status, ...product} = this.toObject();
    product["uid"] = _id;

    return product;
}




module.exports = model('Product', ProductSchema)


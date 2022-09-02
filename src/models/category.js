const { Schema, model } = require('mongoose');

const categorySchema = new Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required: true
    }


});

categorySchema.methods.toJSON = function(){
    const { __v, _id, ...category } =  this.toObject();
    category['uid'] = _id;

    return category;
}

module.exports = model('Categorie', categorySchema);
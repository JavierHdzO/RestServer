const { Schema, model } = require('mongoose');

const roleSchema = new Schema({
    role:{
        type: String,
        required: [true, 'Role is obligatory']
    }
});

module.exports = model('role', roleSchema);
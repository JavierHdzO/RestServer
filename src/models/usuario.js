

// {
//     name:"",
//     email: "",
//     password: "",
//     img: "",
//     rol: "",
//     estado: "",
//     google: ""
// }

const { Schema, model } = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is obligatory']
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: [true, "Rol is required"],
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }

});

userSchema.methods.toJSON = function() {
    const { __v, password, ...user }  = this.toObject();

    return user;
};


userSchema.methods.encryptPassword = async (password) => {

    const salt = await  bcrypt.genSalt(10);
    const hash = await  bcrypt.hash( password, salt );

    return hash;
};

userSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password, this.password)
};




module.exports = model('User', userSchema);

const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require("bcrypt")
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    address:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
        default:"user"
    },
    cart:{
        type:Array,
        default:[]
    },
    wishlist:[{type: mongoose.Schema.Types.ObjectId,ref: "Product"}],
    refreshToken : {
        type:String,
    },
},
{
    timestamps:true,
});

userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.isPasswordTrue = async function (inputPassword) {
    return await bcrypt.compare(inputPassword, this.password);
};

//Export the model
module.exports = mongoose.model('User', userSchema);
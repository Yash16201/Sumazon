const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    price:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        required:true,
     },
    quantity:{
        type:Number,
        required:true,
    },
    picture:{
        type:String,
    },
    isDeleted:{
        type:String,
        default:"False",
    },
},{
    timestamps: true,
});

//Export the model
module.exports = mongoose.model('Product', productSchema);
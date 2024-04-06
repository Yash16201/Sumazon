const mongoose = require("mongoose")

const validMongodbOjectId = (id) => {
    const valid = mongoose.Types.ObjectId.isValid(id);
    if(!valid){
        throw new Error("Not valid id");
    }
};

module.exports = validMongodbOjectId;
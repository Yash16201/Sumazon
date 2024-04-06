const {default: mongoose} = require("mongoose")

const dbConnect = () =>{
    try {
        const conn = mongoose.connect(process.env.SUMAZON_DB_URL);
        ("Sumazon database connected :)");
    } catch (error) {
        console.log("Sumazon database can't connect ");
    }
};

module.exports = dbConnect;
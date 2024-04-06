const webToken = require("jsonwebtoken")

const generateToken = (id) => {
    return webToken.sign({id}, process.env.SUMAZON_SECRET, {expiresIn:'1d'});
};

module.exports = {generateToken}
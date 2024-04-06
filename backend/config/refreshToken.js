const webToken = require("jsonwebtoken")

const generateRefreshToken = (id) => {
    return webToken.sign({id}, process.env.SUMAZON_SECRET, {expiresIn:'3d'});
};

module.exports = {generateRefreshToken};
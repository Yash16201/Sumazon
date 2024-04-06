const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req,res,next) => {
    let token;
    if(req?.headers?.authorization?.startsWith("Bearer ")){
        token = req.headers.authorization.split(" ")[1];
        if(token){
            const decodedToken = jwt.verify(token, process.env.SUMAZON_SECRET); 
            const user = await User.findById(decodedToken?.id);
            req.user = user
            next();
        }
    }else{
        throw new Error("Token dosent exists in header");
    }
});

const isAdmin = asyncHandler(async(req, res, next) => {
    const { email } = req.user;
    const isAdminUser = await User.findOne({email});
    if(isAdminUser.role !== "admin"){
        throw new Error("Sorry you are not admin!");
    }
    else{
        next();
    }
});

module.exports = {authMiddleware, isAdmin};
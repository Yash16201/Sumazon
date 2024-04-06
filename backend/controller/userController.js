const { isValidObjectId } = require("mongoose");
const { generateToken } = require("../config/webToken");
const { generateRefreshToken } = require("../config/refreshToken");
const webToken = require("jsonwebtoken")
const User = require("../models/userModel");
const Product = require("../models/productModel");
const Order = require("../models/orderModel");
const uniqid = require("uniqid");

const asyncHandler = require('express-async-handler')
const createUser = asyncHandler(async (req,res) => {
    const email = req.body.email;
    const isUserExists = await User.findOne({email : email});
    const isUserMobileExists = await User.findOne({mobile : req.body.mobile});
    if(!isUserExists && !isUserMobileExists){
        const newUser = await User.create(req.body);
        res.json({
            userData: newUser,
            success : true,
        });
    } else {
        throw new Error("User with this data already exists in the system");
    }
});

const login = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    const isUserExists = await User.findOne({email});
    if(isUserExists && (await isUserExists.isPasswordTrue(password))){
        const refreshToken = await generateRefreshToken(isUserExists?.id);
        const settoken = await User.findByIdAndUpdate(isUserExists?.id, 
        {
            refreshToken : refreshToken,
        },
        {
            new: true
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly : true,
            maxAge : 72*60*60*1000,
        })
        res.json({
            _id: isUserExists?._id,
            username: isUserExists?.username,
            email: isUserExists?.email,
            address: isUserExists?.address,
            mobile: isUserExists?.mobile,
            token: generateToken(isUserExists?._id),
            success : true,
        });
    } else {
        throw new Error("Invalid Credentials");
    }
});


const allUsers = asyncHandler(async (req,res) => {
    try {
        const getUsers = await User.find();
        res.json(getUsers);
    } catch (error) {
        throw new Error(error);     
    }
});

const getSingleUser = asyncHandler(async (req, res) => {
    const {id} = req.params
    try {
        const getUser = await User.findById(id)
        res.json(getUser);
    } catch (error) {
        throw new Error("User donot exists in the system");
    }
});

const deleteSingleUser = asyncHandler(async (req, res) => {
    const {id} = req.params
    // isValidObjectId(id);
    try {
        const getUser = await User.findByIdAndDelete(id)
        res.json({
            userData : getUser,
            msg : "Deleted Successfully",
            success : true
        });
    } catch (error) {
        throw new Error("User donot exists in the system");
        
    }
})

const updateSingleUser = asyncHandler(async (req, res) => {
    const {id} = req.params;
    // isValidObjectId(id);
    try {
        const updateUser = await User.findOneAndUpdate({_id : id} ,{
            username : req?.body?.username,
            email : req?.body?.email,
            mobile : req?.body?.mobile,
            address : req?.body?.address,
        },
        {
            new : true,
        });
        const updatedUserDetails = await User.findById(id);
        res.json({
            _id: updatedUserDetails?._id,
            username: updatedUserDetails?.username,
            email: updatedUserDetails?.email,
            address: updatedUserDetails?.address,
            mobile: updatedUserDetails?.mobile,
            token: generateToken(updatedUserDetails?._id),
        });
    } catch (error) {
        throw new Error("User donot exists in the system");
        
    }
});

const placeOrder = asyncHandler(async (req,res) => {
    const cart  = req.body.cart
    const cartTotal  = req.body.cartTotal
    const userData = req.body.user
    try {
        const user = await User.findById(userData._id)
        let amount = cartTotal
        let order = await new Order({
            products: cart,
            address: user.address,
            paymentDetails: {
                id: uniqid(),
                method: "COD",
                amount: amount,
            },
            orderBy: user._id,
        }).save();

        for(const item in cart){
            const ProductDetail = await Product.findById(cart[item]._id);
            if(ProductDetail){
                ProductDetail.quantity -= cart[item].Quantity;
                await ProductDetail.save();
            }
        }
        res.json({message:"Success"});
    } catch (error) {
        throw new Error(error);
    }
});

const getAllOrders = asyncHandler(async (req,res) =>{
    try {
        const orders = await Order.find().populate("products.product").populate("orderBy").exec();
        res.json(orders);
    } catch (error) {
        throw new Error(error);
    }
});

const getUserOrders = asyncHandler(async (req,res) =>{
    const {_id} = req.user;
    try {
        const orders = await Order.findOne({orderBy:_id}).populate("products.product").populate("orderby").exec();
        res.json(orders);
    } catch (error) {
        throw new Error(error);
    }
});


module.exports = { createUser, login, allUsers, getSingleUser, deleteSingleUser, updateSingleUser, placeOrder, getAllOrders, getUserOrders}
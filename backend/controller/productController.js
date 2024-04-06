const Product = require("../models/productModel")
const asyncHandler = require('express-async-handler')

const createProduct = asyncHandler(async (req,res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.json(newProduct);
    } catch (error) {
        throw new Error("Something went wrong");
    }
});

const updateProduct = asyncHandler(async (req,res) => {
    const id = req.body.id;
    try {
       const updatedProduct = await Product.findOneAndUpdate({_id : id}, req.body, {
            new: true
       });
       const updatedProductDetails = await Product.findById(id);
       res.json(updatedProductDetails);
    } catch (error) {
        throw new Error("Something went wrong");
    }
});


const deleteProduct = asyncHandler(async (req,res) => {
    const id = req.body._id;
    try {
        const deletedProduct = await Product.findOneAndUpdate({_id : id}, {isDeleted:"True"}, {
        new: true
    });
       res.json(deletedProduct);
    } catch (error) {
        throw new Error("Something went wrong");
    }
});

const getSingleProduct = asyncHandler(async (req,res) => {
    const id = req.body.id;
    try {
       const product = await Product.findById(id);
       res.json(product);
    } catch (error) {
        throw new Error("Something went wrong");
    }
});

const getAllProduct = asyncHandler(async (req,res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        throw new Error("Something went wrong");
    }
})


module.exports = { createProduct, updateProduct, deleteProduct, getSingleProduct, getAllProduct };
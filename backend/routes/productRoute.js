const express = require("express");
const router = express.Router();

const {authMiddleware, isAdmin} = require("../middlewares/authMiddleware");
const { createProduct, getAllProduct, getSingleProduct, deleteProduct, updateProduct } = require("../controller/productController");
router.post("/addProduct", authMiddleware, isAdmin, createProduct);
router.get("/all-products", getAllProduct)
router.put("/editproduct", authMiddleware, isAdmin, updateProduct);
router.post("/deleteproduct", authMiddleware, isAdmin, deleteProduct);
router.post("/productbyid", getSingleProduct);

module.exports = router;

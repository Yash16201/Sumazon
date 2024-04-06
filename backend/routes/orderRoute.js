const express = require("express");
const { createUser, login, allUsers, getSingleUser, deleteSingleUser, updateSingleUser, addToCart, getCart, emptyCart, placeOrder, getAllOrders, getUserOrders } = require("../controller/userController");
const router = express.Router();

const {authMiddleware, isAdmin} = require("../middlewares/authMiddleware")
router.get("/getallorders", authMiddleware, isAdmin, getAllOrders);
router.post("/makeorder", authMiddleware, placeOrder);
router.post("/getorderbyuser/:id",authMiddleware, getUserOrders);



module.exports = router;
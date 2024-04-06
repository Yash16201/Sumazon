const express = require("express");
const { createUser, login, allUsers, getSingleUser, deleteSingleUser, updateSingleUser, addToCart, getCart, emptyCart, placeOrder, getAllOrders, getUserOrders } = require("../controller/userController");
const router = express.Router();

const {authMiddleware, isAdmin} = require("../middlewares/authMiddleware")
router.post("/register", createUser);
router.post("/login", login);
router.get("/all-users", authMiddleware, isAdmin, allUsers);
router.get("/:id", getSingleUser);
router.delete("/:id",authMiddleware, isAdmin,deleteSingleUser);
router.put("/:id",authMiddleware, updateSingleUser);


module.exports = router;
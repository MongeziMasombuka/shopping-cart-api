import express from "express";
import {
  loginUser,
  logoutUser,
  refreshToken,
  registerUser,
} from "../controllers/authControllers.js";
import {
  getProductById,
  getProductBySlug,
  getProducts,
} from "../controllers/productController.js";
import {
  getCart,
  addToCart,
  updateCart,
  removeFromCart,
  clearCart,
} from "../controllers/cartController.js";
import { validateCartRequest } from "../middlewares/validateRequest.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Auth routes
router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.post("/auth/logout", logoutUser);
router.post("/auth/refresh", refreshToken);

// Product routes
router.get("/products", getProducts);
router.get("/products/:id", getProductById);
router.get("/products/slug/:slug", getProductBySlug);

// Cart routes
router.get("/cart", protect, getCart);
router.post("/cart", protect, validateCartRequest, addToCart);
router.put("/cart", protect, updateCart);
router.delete("/cart", protect, clearCart);
router.delete("/cart/:productId", protect, removeFromCart);

export default router;

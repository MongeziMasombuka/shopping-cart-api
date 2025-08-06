import express from "express";

import {
  getCart,
  addToCart,
  updateCart,
  removeFromCart,
  clearCart,
} from "../controllers/cartController.js";

import {
  getProductById,
  getProductBySlug,
  getProducts,
} from "../controllers/productController.js";
import { validateCartRequest } from "../middlewares/validateRequest.js";

const router = express.Router();

// Product routes
router.get("/products", getProducts);
router.get("/products/:id", getProductById);
router.get("/products/slug/:slug", getProductBySlug);

// Cart routes
router.get("/cart", getCart);
router.post("/cart", validateCartRequest, addToCart);
router.put("/cart/:id", updateCart);
router.delete("/cart/user/:userId", clearCart);
router.delete("/cart/:userId/:productId", removeFromCart);

export default router;

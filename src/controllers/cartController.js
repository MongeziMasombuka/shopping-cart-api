import prisma from "../models/prismaClient.js";

// GET /cart?userId=1
export const getCart = async (req, res, next) => {
  //const userId = parseInt(req.query.userId); // Add from JWT/session
  //const { userId } = req.body;
  const userId = req.user.id;

  try {
    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: {
        product: true,
      },
    });
    res.json(cartItems);
  } catch (error) {
    console.error("Error fetching cart:", error);
    next(error);
  }
};

export const addToCart = async (req, res, next) => {
  const { productId } = req.body;
  const userId = req.user.id;
  const quantity = parseInt(req.body.quantity, 10);
  try {
    const cartItem = await prisma.cartItem.upsert({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
      update: {
        quantity: {
          increment: quantity,
        },
      },
      create: {
        userId,
        productId,
        quantity,
      },
    });

    res.status(200).json(cartItem);
  } catch (error) {
    console.error("Error adding to cart:", error);
    next(error);
  }
};
// PUT /cart/:id
export const updateCart = async (req, res, next) => {
  const id = req.user.id;
  const quantity = parseInt(req.body.quantity);

  try {
    const updatedItem = await prisma.cartItem.update({
      where: { id },
      data: { quantity },
    });

    res.json(updatedItem);
  } catch (error) {
    console.error("Error updating cart:", error);
    next(error);
  }
};

// DELETE /cart/:id
export const removeFromCart = async (req, res, next) => {
  const userId = req.user.id;
  const productId = req.params.productId;

  try {
    await prisma.cartItem.delete({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });
    res.status(204).send();
  } catch (error) {
    console.error("Error removing from cart:", error);
    next(error);
  }
};

export const clearCart = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const result = await prisma.cartItem.deleteMany({
      where: { userId },
    });

    res
      .status(200)
      .json({ message: "Cart cleared", deletedCount: result.count });
  } catch (error) {
    console.error("Error clearing cart:", error);
    next(error);
  }
};

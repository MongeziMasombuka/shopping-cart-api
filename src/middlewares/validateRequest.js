export const validateCartRequest = (req, res, next) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity)
    return res
      .status(400)
      .json({ message: "ProductId and quantity are required" });

  if (quantity <= 0)
    return res.status(400).json({ message: "Quantity must be greater than 0" });

  next();
};

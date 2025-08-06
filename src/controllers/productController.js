import prisma from "../models/prismaClient.js";

// export const getProducts = async (req, res, next) => {
//   try {
//     const products = await prisma.product.findMany();
//     res.json(products);
//   } catch (error) {
//     //console.log(error);
//     next(error);
//   }
// };

export const getProductById = async (req, res, next) => {
  const id = parseInt(req.params.id);

  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
};
export const getProductBySlug = async (req, res, next) => {
  const { slug } = req.params;

  try {
    const product = await prisma.product.findUnique({
      where: { slug },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const getProducts = async (req, res, next) => {
  try {
    // ----- Parse query params -----
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit) || 10, 100); // cap to 100 max
    const skip = (page - 1) * limit;

    const { name, slug, category, minPrice, maxPrice, sort, search } =
      req.query;

    // ----- Filtering -----
    const where = {};
    if (search && search.trim() !== "") {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { category: { contains: search, mode: "insensitive" } },
      ];
    }
    if (name) {
      where.name = { contains: name, mode: "insensitive" };
    }

    if (slug) {
      where.slug = { equals: slug };
    }

    if (category) {
      where.category = { equals: category, mode: "insensitive" };
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }

    // ----- Sorting -----
    let orderBy = { id: "asc" }; // default

    if (sort === "price_asc") orderBy = { price: "asc" };
    else if (sort === "price_desc") orderBy = { price: "desc" };
    else if (sort === "name_asc") orderBy = { name: "asc" };
    else if (sort === "name_desc") orderBy = { name: "desc" };

    // ----- Query products and count -----
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy,
      }),
      prisma.product.count({ where }),
    ]);

    // ----- Respond -----
    res.json({
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
      products,
    });
  } catch (error) {
    next(error);
  }
};

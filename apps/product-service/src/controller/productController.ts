import { Request, Response, NextFunction } from "express";
import { prisma, Prisma } from "@repo/product-db"; // ✅

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data: Prisma.ProductCreateInput = req.body;

  const { colors, images } = data;

  if (!colors || !Array.isArray(colors) || colors.length === 0) {
    return res.status(400).json({ message: "Colors array is required." });
  }

  if (!images || typeof images !== "object") {
    return res.status(400).json({ message: "Images object is required." });
  }

  const missingColors = colors.filter((col) => !(col in images));

  if (missingColors.length > 0) {
    return res
      .status(400)
      .json({ message: "Missing images for colors.", missingColors });
  }

  const product = await prisma.product.create({ data });

  res.status(201).json({
    product,
  });
};
export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const data: Prisma.ProductUpdateInput = req.body;

  const updatedProduct = await prisma.product.update({
    where: { id: Number(id) },
    data,
  });

  res.status(200).json(updatedProduct);
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  await prisma.product.delete({
    where: { id: Number(id) },
  });

  res.status(200).json({message: "Product deleted successfully."});
};

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { sort, category, search, limit } = req.query;

  const sortOptions: Record<string, object> = {
    asc: { price: "asc" },
    desc: { price: "desc" },
    oldest: { createdAt: "asc" },
    newest: { createdAt: "desc" },
    updated: { updatedAt: "desc" },
  };

  const orderBy = sortOptions[sort as string] || { createdAt: "desc" };

  const where: any = {};
  if (category) {
    where.category = { slug: category as string };
  }

  if (search) {
    where.name = { contains: search as string, mode: "insensitive" };
  }

  const products = await prisma.product.findMany({
    where,
    orderBy: { updatedAt: "desc" },
    take: limit ? +limit : undefined,
  });

  res.status(200).json(products);
};

export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.params);
  const { id } = req.params;

  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
  });
  console.log(product);

  res.status(200).json(product);
};

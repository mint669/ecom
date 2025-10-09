import { prisma, Prisma } from "@repo/product-db";
import { Request, Response, NextFunction } from "express";

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data: Prisma.CategoryCreateInput = req.body;
  const category = await prisma.category.create({ data });

  return res.status(201).json({
    category,
  });
};
export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const data: Prisma.CategoryUpdateInput = req.body;

  const updatedCategory = await prisma.category.update({
    where: { id: Number(id) },
    data,
  });

  res.json(updatedCategory);
};

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  await prisma.category.delete({
    where: { id: Number(id) },
  });

  res.json({ message: "Category deleted successfully." });
};

export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const categories = await prisma.category.findMany();

  res.json(categories);
};

import Product from "../models/Product.js";
import { validBody } from "../utils/validBody.js";
import productSchema from "../validations/product.js";

export const getProducts = async (req, res, next) => {
  try {
    const data = await Product.find({});
    if (data && data.length > 0) {
      return res.status(200).json({
        message: "Lay danh sach san pham thanh cong!",
        data,
      });
    }
    return res.status(404).json({ message: "Khong co san pham nao!" });
  } catch (error) {
    next(error);
  }
};
export const createProduct = async (req, res, next) => {
  try {
    const resultValid= validBody(req.body, productSchema);
   if(resultValid){
    return res.status(400).json({message: resultValid.errors});
   }
    const data = await Product.create(req.body);
    console.log(data);
    if (!data) {
      return res.status(400).json({ message: "Them san pham that bai!" });
    }
    return res.status(201).json({
      message: "Them san pham thanh cong!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const data = await Product.findById(req.params.id);
    if (!data) {
      return res.status(400).json({ message: "Lay san pham that bai!" });
    }
    return res.status(201).json({
      message: "Lay san pham thanh cong!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProductById = async (req, res, next) => {
  try {
    const resultValid= validBody(req.body, productSchema);
   if(resultValid){
    return res.status(400).json({message: resultValid.errors});
   }
    const data = await Product.findByIdAndUpdate(`${req.params.id}`, req.body, {
      new: true,
    });
    if (!data) {
      return res.status(400).json({ message: "Cap nhat san pham that bai!" });
    }
    return res.status(201).json({
      message: "Cap nhat san pham thanh cong!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

// ! Xoá cứng! Không dùng
export const removeProductById = async (req, res, next) => {
  try {
    const data = await Product.findByIdAndDelete(req.params.id);
    if (data) {
      return res.status(200).json({
        message: "Xoa san pham thanh cong!",
        data,
      });
    }
  } catch (error) {
    next(error);
  }
};

// ! Xoá mềm

export const softRemoveProductById = async (req, res, next) => {
  try {
    const data = await Product.findByIdAndUpdate(
      `${req.params.id}`,
      {
        hide: true,
      },
      {
        new: true,
      }
    );
    
    if (!data) {
      return res.status(400).json({ message: "Cap nhat san pham that bai!" });
    }
    return res.status(201).json({
      message: "Cap nhat san pham thanh cong!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

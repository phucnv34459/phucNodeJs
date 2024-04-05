import { Router } from "express";
import {
  createProduct,
  getProductById,
  getProducts,
  removeProductById,
  softRemoveProductById,
  updateProductById,
} from "../controllers/product.js";
import validBodyRequest from "../middlewares/validRequestBody.js";
import productSchema from "../validations/product.js";
import { checkAuth } from "../middlewares/checkAuth.js";
import { checkIsAdmin } from "../middlewares/checkIsAdmin.js";

const productRouter = Router();

productRouter.get("/", getProducts);

productRouter.get("/:id", getProductById);
productRouter.use(checkAuth, checkIsAdmin);
productRouter.put("/hide/:id", softRemoveProductById);
productRouter.delete("/delete/:id", removeProductById);
productRouter.use(validBodyRequest(productSchema))
productRouter.put("/update/:id", updateProductById);
productRouter.post("/", createProduct);


export default productRouter;

import productPurchase from "./product-purchase/product-purchase.routes";
import product from "./product/product.routes";
import auth from "./auth/auth.routes";
import user from "./user/user.routes";
import { Router } from "express";

const routes = Router();

routes.use("/auth", auth);
routes.use("/user", user);
routes.use("/product", product);
routes.use("/product-purchase", productPurchase);

export default routes;
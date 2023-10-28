import { Router } from "express";
import cartController from "../controllers/cart.controller";
import cartValidator from "../validators/cart.validator";
import validationResults from "../../validators/validationResults";
const router = Router();

router.post(
  "/create",
  cartValidator.createCart(),
  validationResults,
  cartController.createCart
);
export default router;

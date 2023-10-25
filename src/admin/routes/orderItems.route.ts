import { Router } from "express";
import orderItemsValidator from "../validators/orderItems.validator";
import validationResults from "../../validators/validationResults";
import orderItemsController from "../controllers/orderItems.controller";
const router = Router();

router.post(
  "/create",
  orderItemsValidator.createOrderItem(),
  validationResults,
  orderItemsController.createOrderItem
);

export default router;

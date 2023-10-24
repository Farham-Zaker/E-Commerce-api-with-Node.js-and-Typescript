import { Router } from "express";
import orderController from "../controllers/order.controller";
import isLogged from "../middlewares/isLogged";
import orderValidator from "../validators/order.validator";
import validationResults from "../validators/validationResults";
const router = Router();

router.post(
  "/cancel",
  orderValidator.cancelvalidator(),
  validationResults,
  orderController.cancelOrder
);
router.get("/get", orderController.getAllOrders);
router.get("/get/:orderId", orderController.getOrderById);

export default router;

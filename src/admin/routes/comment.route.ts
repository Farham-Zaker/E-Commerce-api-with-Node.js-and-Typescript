import { Router } from "express";
import commentValidator from "../validators/comment.validator";
import validationResults from "../../validators/validationResults";
import commentController from "../controllers/comment.controller";
const router = Router();

router.post(
  "/create",
  commentValidator.createComment(),
  validationResults,
  commentController.createComment
);

export default router;

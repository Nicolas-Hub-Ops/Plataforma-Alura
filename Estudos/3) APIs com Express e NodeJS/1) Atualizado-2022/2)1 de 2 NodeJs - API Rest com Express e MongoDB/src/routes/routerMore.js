import express from "express";
import moreController from "../controllers/controllerMore.js";

const router = express.Router();

router
    .get("/More", moreController.listMore)
    
    .get("/More/:id", moreController.listIdMore)

    .post("/More", moreController.registerMore)

    .put("/More/:id", moreController.updateMore)

    .delete("/More/:id", moreController.removeMore) 

export default router;
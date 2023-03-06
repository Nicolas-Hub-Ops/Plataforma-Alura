import express from "express";
import imagesController from "../controllers/controllerImages.js";

const router = express.Router();

router
    .get("/images", imagesController.list)
    
    .get("/images/:id", imagesController.listId)

    .post("/images", imagesController.register)

    .put("/images/:id", imagesController.update)

    .delete("/images/:id", imagesController.remove) 

export default router;
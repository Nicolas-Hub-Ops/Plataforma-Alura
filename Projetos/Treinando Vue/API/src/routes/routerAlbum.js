import express from "express";
import albumController from "../controllers/controllerAlbum.js";

const router = express.Router();

router
    .get("/album", albumController.list)
    //.get("/cars/:filter", albumController.listFabricante)
    .get("/album/:id", albumController.listId)

    .post("/album", albumController.register)

    .put("/album/:id", albumController.update)

    .delete("/album/:id", albumController.remove) 

export default router;
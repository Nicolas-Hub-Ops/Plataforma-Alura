import express from "express";
import carController from "../controllers/controllerCars.js";

const router = express.Router();

router
    .get("/cars", carController.listCars)
    .get("/cars/busca", carController.listFabricante)
    .get("/cars/:id", carController.listIdCars)

    .post("/cars", carController.registerCars)

    .put("/cars/:id", carController.updateCars)

    .delete("/cars/:id", carController.removeCars) 

export default router;
import { Router } from "express";
import { articuloController } from "../controllers/articulosController.js";
import { verifyAccesToken } from "../middlewares/verifyAccesToken.js";

export const router = Router()

router.get("/", articuloController.getAll)
router.get("/:id", articuloController.getFirstById)
router.get("/s", articuloController.getByNombre)
router.post("/", verifyAccesToken, articuloController.createOne)
router.delete("/:id", verifyAccesToken, articuloController.deleteOne)
router.patch("/:id", verifyAccesToken, articuloController.updateOne)

import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  crearPersonajeCtrl,
  listarPersonajesCtrl,
  obtenerPersonajeCtrl,
  eliminarPersonajeCtrl,
  actualizarPersonajeCtrl,
} from "../controllers/personaje.ctrl";

const router = Router();

router.post("/", authMiddleware, crearPersonajeCtrl);
router.get("/lista", authMiddleware, listarPersonajesCtrl);
router.get("/detalle/:id", authMiddleware, obtenerPersonajeCtrl);
router.delete("/:id", authMiddleware, eliminarPersonajeCtrl);
router.put("/:id", authMiddleware, actualizarPersonajeCtrl);

export { router };

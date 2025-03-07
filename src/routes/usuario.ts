import { Router } from "express";
import { authMiddleware, adminMiddleware } from "../middlewares/auth.middleware";
import {
  listarUsuariosCtrl,
  obtenerUsuarioCtrl,
  actualizarUsuarioCtrl,
  eliminarUsuarioCtrl,
} from "../controllers/usuario.ctrl";

const router = Router();

router.get("/lista", authMiddleware, adminMiddleware, listarUsuariosCtrl);
router.get("/:id", authMiddleware, adminMiddleware, obtenerUsuarioCtrl);
router.put("/:id", authMiddleware, adminMiddleware, actualizarUsuarioCtrl);
router.delete("/:id", authMiddleware, adminMiddleware, eliminarUsuarioCtrl);

export { router };

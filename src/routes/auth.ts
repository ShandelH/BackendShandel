import { Router } from "express";
import { body } from "express-validator";
import { registrarCtrl, iniciarSesionCtrl } from "../controllers/auth.ctrl";

const router = Router();

/**
 * Registro de usuario.
 * Se valida que el nombre y correo no estén vacíos, que el correo sea válido, que la contraseña tenga mínimo 6 caracteres,
 * y se permite escoger el rol (ADMIN o REGULAR).
 */
router.post(
  "/registro",
  [
    body("nombre").notEmpty().withMessage("El nombre es requerido"),
    body("correo").isEmail().withMessage("Correo inválido"),
    body("contraseña").isLength({ min: 6 }).withMessage("Mínimo 6 caracteres"),
    body("rol").notEmpty().withMessage("El rol es requerido"),
  ],
  registrarCtrl
);

/**
 * Inicio de sesión.
 * Valida que el correo sea válido y que la contraseña tenga mínimo 6 caracteres.
 */
router.post(
  "/inicio-sesion",
  [
    body("correo").isEmail().withMessage("Correo inválido"),
    body("contraseña").isLength({ min: 6 }).withMessage("Mínimo 6 caracteres"),
  ],
  iniciarSesionCtrl
);

export { router };

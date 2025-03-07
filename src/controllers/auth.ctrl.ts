import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { registrarSrv, iniciarSesionSrv } from "../services/auth.srv";

export const registrarCtrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      res.status(400).json({ errores: errores.array() });
      return;
    }

    const { nombre, correo, contraseña, rol } = req.body;
    const usuario = await registrarSrv(nombre, correo, contraseña, rol);

    res.status(201).json({
      mensaje: "Usuario registrado",
      datos: usuario,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const iniciarSesionCtrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      res.status(400).json({ errores: errores.array() });
      return;
    }

    const { correo, contraseña } = req.body;
    const { token } = await iniciarSesionSrv(correo, contraseña);

    res.json({ token });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};

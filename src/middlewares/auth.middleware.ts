import { Request, Response, NextFunction } from "express";
import { generarToken, verificarToken } from "../utils/jwt";

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const header = req.headers.authorization;
    if (!header) {
      res.status(401).json({ error: "Ningún token proporcionado" });
      return;
    }
    const token = header.split(" ")[1];
    const decodificado = verificarToken(token) as { id: number; rol: string };
    (req as any).usuario = decodificado;

    const nuevoToken = generarToken({ id: decodificado.id, rol: decodificado.rol });
    res.setHeader("Authorization", `Bearer ${nuevoToken}`);

    next();
  } catch (error) {
    res.status(401).json({ error: "Token inválido" });
  }
};

export const adminMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const usuario = (req as any).usuario;
  if (usuario?.rol !== "ADMIN") {
    res.status(403).json({ error: "Se requiere rol ADMIN" });
    return;
  }
  next();
};

import { Request, Response } from "express";
import {
  listarUsuariosSrv,
  obtenerUsuarioPorIdSrv,
  actualizarUsuarioSrv,
  eliminarUsuarioSrv,
} from "../services/usuario.srv";

export const listarUsuariosCtrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuarios = await listarUsuariosSrv();
    res.json({ datos: usuarios });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerUsuarioCtrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const usuario = await obtenerUsuarioPorIdSrv(id);
    if (!usuario) {
      res.status(404).json({ error: "Usuario no encontrado" });
      return;
    }
    res.json({ datos: usuario });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const actualizarUsuarioCtrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const { nombre, correo, rol } = req.body;
    const actualizado = await actualizarUsuarioSrv(id, { nombre, correo, rol });
    res.json({ datos: actualizado });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const eliminarUsuarioCtrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const eliminado = await eliminarUsuarioSrv(id);
    res.json({ datos: eliminado });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

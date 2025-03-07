import { Request, Response } from "express";
import {
  crearPersonajeSrv,
  listarPersonajesSrv,
  obtenerPersonajeSrv,
  eliminarPersonajeSrv,
  actualizarPersonajeSrv,
} from "../services/personaje.srv";

export const crearPersonajeCtrl = async (req: Request, res: Response) => {
  try {
    const idUsuario = (req as any).usuario.id;
    const datos = req.body;
    const personaje = await crearPersonajeSrv(idUsuario, datos);
    res.status(201).json({ datos: personaje, exito: true });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const listarPersonajesCtrl = async (req: Request, res: Response) => {
  try {
    const idUsuario = (req as any).usuario.id;
    const rol = (req as any).usuario.rol;
    const personajes = await listarPersonajesSrv(idUsuario, rol);
    res.json({ datos: personajes });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerPersonajeCtrl = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const idUsuario = (req as any).usuario.id;
    const rol = (req as any).usuario.rol;
    const personaje = await obtenerPersonajeSrv(id, idUsuario, rol);
    res.json({ datos: personaje });
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

export const eliminarPersonajeCtrl = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const idUsuario = (req as any).usuario.id;
    const rol = (req as any).usuario.rol;
    const personaje = await eliminarPersonajeSrv(id, idUsuario, rol);
    res.json({ datos: personaje });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const actualizarPersonajeCtrl = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { nombre, foto } = req.body;
    const idUsuario = (req as any).usuario.id;
    const rol = (req as any).usuario.rol;
    const personaje = await actualizarPersonajeSrv(id, idUsuario, rol, { nombre, foto });
    res.json({ datos: personaje });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

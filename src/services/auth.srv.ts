import { generarToken } from "../utils/jwt";
import { crearUsuarioSrv, buscarUsuarioPorCorreo } from "./usuario.srv";
import bcrypt from "bcryptjs";

/**
 * Registra un usuario, permitiendo escoger el rol.
 */
export const registrarSrv = async (
  nombre: string,
  correo: string,
  contraseña: string,
  rol: string
) => {
  return crearUsuarioSrv(nombre, correo, contraseña, rol);
};

/**
 * Inicia sesión: valida credenciales y retorna un token JWT.
 */
export const iniciarSesionSrv = async (correo: string, contraseña: string) => {
  const usuario = await buscarUsuarioPorCorreo(correo);
  if (!usuario || !usuario.flag) {
    throw new Error("Credenciales inválidas");
  }
  const coincide = await bcrypt.compare(contraseña, usuario.contraseña);
  if (!coincide) {
    throw new Error("Credenciales inválidas");
  }
  const token = generarToken({ id: usuario.id, rol: usuario.rol });
  return { token };
};

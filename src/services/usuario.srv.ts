import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

/**
 * Crea un usuario con el rol escogido.
 * Verifica si el correo ya está registrado y encripta la contraseña.
 */
export const crearUsuarioSrv = async (
  nombre: string,
  correo: string,
  contraseña: string,
  rol: string
) => {
  const existente = await prisma.usuario.findUnique({ where: { correo } });
  if (existente) {
    throw new Error("El correo ya está registrado");
  }
  const encriptada = await bcrypt.hash(contraseña, 10);
  return prisma.usuario.create({
    data: {
      nombre,
      correo,
      contraseña: encriptada,
      rol: rol.toUpperCase(), // Se espera "ADMIN" o "REGULAR"
    },
  });
};

/**
 * Busca un usuario por correo, para el proceso de inicio de sesión.
 */
export const buscarUsuarioPorCorreo = async (correo: string) => {
  return prisma.usuario.findUnique({ where: { correo } });
};

/**
 * Lista todos los usuarios activos.
 */
export const listarUsuariosSrv = async () => {
  return prisma.usuario.findMany({ where: { flag: true } });
};

/**
 * Obtiene un usuario por ID, solo si está activo.
 */
export const obtenerUsuarioPorIdSrv = async (id: number) => {
  return prisma.usuario.findFirst({ where: { id, flag: true } });
};

/**
 * Actualiza los datos de un usuario.
 */
export const actualizarUsuarioSrv = async (
  id: number,
  datos: { nombre?: string; correo?: string; rol?: string }
) => {
  return prisma.usuario.update({
    where: { id },
    data: datos,
  });
};

/**
 * Realiza un soft delete en un usuario.
 */
export const eliminarUsuarioSrv = async (id: number) => {
  return prisma.usuario.update({
    where: { id },
    data: { flag: false },
  });
};

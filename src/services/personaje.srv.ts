import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * Crea un personaje asociado al usuario.
 */
export const crearPersonajeSrv = async (idUsuario: number, datos: { nombre: string; foto: string }) => {
  if (!datos.nombre) throw new Error("El nombre es requerido");
  return prisma.personaje.create({
    data: {
      nombre: datos.nombre,
      foto: datos.foto,
      usuarioId: idUsuario,
    },
  });
};

/**
 * Lista personajes:
 * - Si el rol es ADMIN, devuelve todos los personajes activos.
 * - Si el rol es REGULAR, devuelve solo los personajes del usuario autenticado.
 */
export const listarPersonajesSrv = async (idUsuario: number, rol: string) => {
  if (rol === "ADMIN") {
    return prisma.personaje.findMany({ where: { flag: true } });
  } else {
    return prisma.personaje.findMany({ where: { usuarioId: idUsuario, flag: true } });
  }
};

/**
 * Obtiene un personaje por ID, validando acceso.
 */
export const obtenerPersonajeSrv = async (id: number, idUsuario: number, rol: string) => {
  const personaje = await prisma.personaje.findFirst({
    where: {
      id,
      flag: true,
      ...(rol !== "ADMIN" && { usuarioId: idUsuario }),
    },
  });
  if (!personaje) {
    throw new Error("Personaje no encontrado o no tienes acceso");
  }
  return personaje;
};

/**
 * Realiza un soft delete en un personaje.
 */
export const eliminarPersonajeSrv = async (id: number, idUsuario: number, rol: string) => {
  const personaje = await prisma.personaje.findFirst({
    where: {
      id,
      flag: true,
      ...(rol !== "ADMIN" && { usuarioId: idUsuario }),
    },
  });
  if (!personaje) throw new Error("Personaje no encontrado o no tienes acceso");
  return prisma.personaje.update({
    where: { id },
    data: { flag: false },
  });
};

/**
 * Actualiza un personaje existente.
 */
export const actualizarPersonajeSrv = async (
  id: number,
  idUsuario: number,
  rol: string,
  datos: { nombre: string; foto: string }
) => {
  const personaje = await prisma.personaje.findFirst({
    where: {
      id,
      flag: true,
      ...(rol !== "ADMIN" && { usuarioId: idUsuario }),
    },
  });
  if (!personaje) throw new Error("Personaje no encontrado o no tienes acceso");
  if (!datos.nombre) throw new Error("El nombre es requerido");

  return prisma.personaje.update({
    where: { id },
    data: {
      nombre: datos.nombre,
      foto: datos.foto,
    },
  });
};

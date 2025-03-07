import { Router } from "express";
import { readdirSync } from "fs";

const PATH_ROUTER = `${__dirname}`;
const router = Router();

const limpiarNombreArchivo = (nombreArchivo: string) => nombreArchivo.split(".").shift()!;

readdirSync(PATH_ROUTER).forEach((filename) => {
  const nombreLimpio = limpiarNombreArchivo(filename);
  if (nombreLimpio !== "index") {
    import(`./${nombreLimpio}`).then((moduloRuta) => {
      router.use(`/${nombreLimpio}`, moduloRuta.router);
    });
  }
});

export { router };

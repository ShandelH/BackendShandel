import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "clave_secreta";

/**
 * Genera un token JWT.
 */
export const generarToken = (payload: object) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "5m" });
};

/**
 * Verifica un token JWT.
 */
export const verificarToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};

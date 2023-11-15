import jwt from "jsonwebtoken";

export const validateToken = (req, res, next) => {
  // obtenemos el token del header --> Authorization: Bearer token (el slice recorta el Bearer)
  const token = req.headers.authorization.slice(7);
  if (!token) {
    res.status(401).json({ msg: "No se envio el token" });
  } else {
    try {
      // verificamos el token con la clave secreta
      const payload = jwt.verify(
        token,
        process.env.SECRET_KEY || "passwordJWT"
      );
      req.payload = payload;
      next();
    } catch (error) {
      res.status(401).json({ msg: "Token invalido" });
    }
  }
};

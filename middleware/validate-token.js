import jwt from "jsonwebtoken";

export const validateToken = (req, res, next) => {
  const token = req.headers.authorization.slice(7);
  if (!token) {
    res.status(401).json({ msg: "No se envio el token" });
  } else {
    try {
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

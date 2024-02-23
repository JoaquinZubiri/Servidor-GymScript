import jwt from 'jsonwebtoken';

export const validateToken = (req, res, next) => {
  // obtenemos el token del header --> Authorization: Bearer token (el slice recorta el Bearer)
  try {
    const token = req.headers.authorization;
    if (!token) {
      res.status(401).json({ msg: 'No se envio el token' });
    } else {
      try {
        let token_number = token.slice(7);
        // verificamos el token con la clave secreta
        const payload = jwt.verify(
          token_number,
          process.env.SECRET_KEY || 'passwordJWT'
        );
        req.payload = payload;
        next();
      } catch (error) {
        res.status(401).json({ msg: 'Token invalido' });
      }
    }
  } catch (error) {
    res.status(500).json({ msg: 'Error al validar el token' });
  }
};

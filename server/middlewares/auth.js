import jwt from 'jsonwebtoken';

export const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1]; // Assuming "Bearer <token>"

    jwt.verify(token, 'your_secret_key', (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }

      req.user = user; // Attach the user data from the token to the request object
      next(); // Proceed to the next middleware or route handler
    });
  } else {
    res.status(401).json({ message: 'Unauthorized, token missing' });
  }
};

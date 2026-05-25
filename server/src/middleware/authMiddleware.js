import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // Fixed: added space after "Bearer"
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const token = authHeader.split(" ")[1];
    req.user = jwt.verify(token, process.env.JWT_SECRET); // Fixed: was JWT_SECRET_KEY, now matches .env
    next();
  } catch {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default protect;

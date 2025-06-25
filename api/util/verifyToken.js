const jwt = require("jsonwebtoken");

module.exports = async function (req, res, next) {
  //
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "token manquant" });
  }

  const decode = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decode;
  next();
};

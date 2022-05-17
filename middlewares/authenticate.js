const { User } = require("../models");
const jwt = require("jsonwebtoken");
const createError = require("./error");

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer")) {
      createError("you are unauthorized", 401);
    }
    const [, token] = authorization.split(" ");
    if (!token) {
      createError("you are unauthorized", 401);
    }
    const secretKey = process.env.JWT_SECRET_KEY || 'hello';
    const decodedPayload = jwt.verify(token, secretKey);

    //เช็คว่ามี user นี้หรือไม่
    const user = await User.findOne({
      where: { id: decodedPayload.id },
    });

    if (!user) {
      createError("User not found", 400);
    }
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

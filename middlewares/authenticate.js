const {User} = require('../models')
const jwt = require("jsonwebtoken");


module.exports = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer")) {
      createError("you are unauthorized", 401);
    }
    const [, token] = authorization.split(" ");
    if (!token) {
      createError("you are unauthorized", 401);
    }
    const secretKey = "1q2w3e";
    const decodedPayload = jwt.verify(token, secretKey);

    //เช็คว่ามี user นี้หรือไม่
    const user = await User.findOne({
      where: { id: decodedPayload.id },
    });

    if (!user) {
      createError("User not found", 400);
    }
    req.user = user
    next()
}
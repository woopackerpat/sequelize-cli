const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const passport = require("passport");
const { User } = require("../models");

const options = {
  secretOrKey: process.env.JWT_SECRET_KEY || "hello",
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //ให้ไปเอา token มาจาก header + bearer จะไปแกะค่า token ในรูปแบบ bearer ให้เราอัตโนมัติ
};

passport.use(
  new JwtStrategy(options, async (payload, done) => {
    try {
      const user = await User.findOne({
        where: { id: payload.id },
      });

      if (!user) {
        done(new Error("user not found"), false);
      }

      if (
        payload.iat * 1000 <
        new Date(user.lastUpdatePassword).getTime()
      ) {
        done(new Error("you are unauthorized"), 401);
      }

      done(null, user); // เป็ฯการเซ็ตค่า req.user = user
    } catch (err) {
        done(err, false)
    }
  })
);


// ถ้ามี passport อื่นๆก็ใส่เข้ามาที่นี่ได้เลย
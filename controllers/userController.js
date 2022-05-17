const createError = require("../utils/createError");
const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  try {
    // const body = req.body;
    const { username, email, password, confirmPassword } = req.body;

    if (!password) {
      createError("Password is required");
    }

    if (password.length < 6) {
      createError("password must be at least 6 charactor", 400);
    }

    if (password !== confirmPassword) {
      createError("password did not match", 404);
      // return res.status(400).json({message: 'password did not match'})
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await User.create({ username, email, password: hashedPassword });
    res.status(201).json({ message: "register success" });
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    //   const {id} = req.params;
    //   const { email, password, confirmPassword} = req.body;

    //   const user = await User.findOne({where: {id}})
    //   const updatedUser = {}
    //   updatedUser.id = user.id
    //   updatedUser.email = user.email
    //   updatedUser.password = user.password

    //   if(email) updatedUser.email = email
    //   if(password !== '' && confirmPassword !== '' && password === confirmPassword) {
    //       updatedUser.password = password
    //   }

    //   console.log(updatedUser)
    //    await User.update(updatedUser, {
    //       where: {
    //           id
    //       }
    //   })
    //   res.json(updatedUser)

    // เฉลย
    
    const { email, oldPassword, newPassword, confirmNewPassword, birthDate } =
      req.body;
      

    const isCorrectPassword = await bcrypt.compare(
      oldPassword,
      req.user.password
    );
    if (!isCorrectPassword) {
      createError("invalid password", 400);
    }

    if (newPassword !== confirmNewPassword) {
      createError("password di not match", 400);
    }

    const value = { email, birthDate };

    if (newPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      value.lastUpdatePassword = new Date();
      value.password = hashedPassword;
    }

    await User.update(value, { where: { id: req.user.id } });

    res.json({ message: "update success" });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username) {
      createError("username is required", 400);
    }

    if (!password) {
      createError("password is required", 400);
    }

    const user = await User.findOne({ where: { username } });
    if (!user) {
      createError("invalid username or password", 400);
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      createError("invalid username or password", 400);
    }
    // const result = await bcrypt.compare(password, )

    const secretKey = process.env.JWT_SECRET_KEY || "hello";
    const payload = {
      id: user.id,
      username,
      email: user.email,
    };

    const token = jwt.sign(payload, secretKey, { expiresIn: "30d" });

    res.json({ message: "login success", token });
  } catch (err) {
    next(err);
  }
};

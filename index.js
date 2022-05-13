const { sequelize, User } = require("./models");

sequelize.sync({force: true});

// const run = async () => {
//   try {
//     const user = await User.create({
//       username: "john",
//       password: "123456",
//       email: "john@gmail.com",
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

// run();

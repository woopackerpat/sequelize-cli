'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

// database connection
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// asscocate เข้าไปใน model ให้อัตนโนมัติ โดยไปเอาค่าใน config.json
// reddirectory -> เอาไฟล์ที่ไม่ใช่ .js แล้วไป loop เพิ่ม model เข้าไปใน db 
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model; // db['User'] = model
  });
  // db => {'User': userModel, 'Todo': 'todoModel'}
  // ['User', 'Todo']
  // Iter#1 modelName => 'User'
  // if db['User].associate ? call db['User'].associate({'User':userModel, 'Todo': todoModel})
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) { // db['User'].associate check ซ่ามีค่ามั้ย
    db[modelName].associate(db);
  }
});

// สร้าง db เป็น {}  เพิ่ม sequelize ใน db

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

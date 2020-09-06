"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (process.env.HEROKU_POSTGRESQL_MAUVE_URL) {
  sequelize = new Sequelize(
    "postgres://tzinnpvlyyuoaj:0b4c9367807856171bf605a3b1e831844cb0cf8094fa8961e4d4a685ba9a9446@ec2-54-247-118-139.eu-west-1.compute.amazonaws.com:5432/dffa820mqv3uj0",
    {
      dialect: "postgres",
      protocol: "postgres",
      port: match[4],
      host: match[3],
      logging: true, //false
    }
  );
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

const { Sequelize } = require("sequelize")

const dbUrl = process.env.DATABASE_URL
const isRender = dbUrl && dbUrl.includes("render.com")

const sequelize = new Sequelize(dbUrl, {
  dialect: "postgres",
  protocol: "postgres",
  logging: false,
  dialectOptions: isRender
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      }
    : {},
})

const db = {}

db.sequelize = sequelize
db.Sequelize = Sequelize

db.User = require("./user")(sequelize, Sequelize)
db.Lend = require("./lend")(sequelize, Sequelize)

module.exports = db
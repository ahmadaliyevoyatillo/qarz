const { Sequelize } = require("sequelize")

const isRender = process.env.DATABASE_URL?.includes("render.com")

const sequelize = new Sequelize(process.env.DATABASE_URL,{
 dialect:"postgres",
 protocol:"postgres",
 logging:false,

 dialectOptions: isRender ? {
  ssl:{
   require:true,
   rejectUnauthorized:false
  }
 } : {}
})

module.exports = {
 sequelize,
 Sequelize
}
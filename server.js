const session = require("express-session")
require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const db = require("./models/index.js");
const hbs = require("express-handlebars")

const app = express();
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("hbs", hbs.engine({ extname: "hbs" }))

app.set("view engine", "hbs")
app.set("views", "./views")
app.use(express.static("public"));

app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false
}))




app.get("/", (req, res) => {
  res.redirect("/debt");
});

app.use((req, res, next) => {
  res.locals.user = req.session.user || null
  next()
})


app.use("/auth", require("./routes/auth"))
app.use("/debt", require("./routes/debt.js"));

const PORT = process.env.PORT || 3000;

const start = async () => {

  try {

    await db.sequelize.sync({ alter: true });

    app.listen(PORT, () => {

      console.log(`Server running http://localhost:${PORT}`);

    });

  } catch (error) {

    console.log(error);

  }

}

start();
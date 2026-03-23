const router = require("express").Router()

const {
    Register,
    Login,
    Logout,
    VerifyTelegram,
} = require("../controllers/authController")

router.get("/login", (req, res) => {
    res.render("auth/login", { title: "Kirish bo'limi" })
})

router.get("/register", (req, res) => {
    res.render("auth/register", { title: "Akkaunt Yaratish bo'limi" })
})

router.post("/register", Register)

router.post("/login", Login)

router.get("/logout", Logout)

module.exports = router
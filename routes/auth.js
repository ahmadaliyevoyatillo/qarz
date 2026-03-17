const router = require("express").Router()

const {
    Register,
    Login,
    Logout
} = require("../controllers/authController")

router.get("/login", (req, res) => {
    res.render("auth/login")
})

router.get("/register", (req, res) => {
    res.render("auth/register")
})

router.post("/register", Register)

router.post("/login", Login)

router.get("/logout", Logout)

module.exports = router
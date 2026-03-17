const db = require("../models")
const User = db.User



const bcrypt = require("bcrypt")

const Register = async (req, res) => {
    const { email, password } = req.body
    const hash = await bcrypt.hash(password, 10)

    await User.create({ email, password: hash })

    res.redirect("/auth/login")
}

const Login = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })

    if (!user) return res.redirect("/auth/login")

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) return res.redirect("/auth/login")

    req.session.user = user
    res.redirect("/debt")
}
const Logout = (req, res) => {

    req.session.destroy(() => {
        res.redirect("/auth/login")
    })

}

module.exports = {
    Register,
    Login,
    Logout
}
const db = require("../models")
const User = db.User

const bcrypt = require("bcrypt")
const Register = async (req, res) => {
    try {
        let { user_name, born_day, email, password } = req.body

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return res.redirect("/auth/register?error=emailformat")
        }

        const existingUser = await User.findOne({ where: { email } })
        if (existingUser) {
            return res.redirect("/auth/register?error=email")
        }

        if (password.length < 8) {
            password = password.padEnd(8, "*")
        } else if (password.length > 8) {
            password = password.slice(0, 8)
        }

        const hash = await bcrypt.hash(password, 10)

        await User.create({
            user_name,
            born_day,
            email,
            password: hash
        })

        res.redirect("/auth/login?success=register")

    } catch (error) {
        console.error(error)
        res.redirect("/auth/register?error=server")
    }
}

module.exports = {
    Register
}

const Login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ where: { email } })

        if (!user) {
            return res.redirect("/auth/login?error=email")
        }

        const isValid = await bcrypt.compare(password, user.password)

        if (!isValid) {
            return res.redirect("/auth/login?error=password")
        }


        if (password.length < 8) {
            password = password.padEnd(8, "*")
        } else if (password.length > 8) {
            password = password.slice(0, 8)
        }

        req.session.user = user

        res.redirect("/debt")

    } catch (error) {
        res.redirect("/auth/login?error=server")
    }
}

const Logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/auth/login?success=logout")
    })
}


module.exports = {
    Register,
    Login,
    Logout
}
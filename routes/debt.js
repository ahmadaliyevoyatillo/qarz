const { AddLend, GetAll, DeleteLend, GetBlackList } = require("../controllers/debtController")
const AuthMiddleware = require("../middleware/auth")
const router = require("express").Router()

router.get("/", AuthMiddleware, GetAll)
router.get("/add", AuthMiddleware, (req, res) => {
    res.render("home/add", { title: "Qarz qo'shish" })
})
router.post("/add", AuthMiddleware, AddLend)
router.get("/delete/:id", AuthMiddleware, DeleteLend)
router.get("/blacklist", AuthMiddleware, GetBlackList)

module.exports = router
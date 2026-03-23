const { AddLend, GetAll, DeleteLend, GetBlackList, UpdateStatus, GetEdit, Edit } = require("../controllers/debtController")
const AuthMiddleware = require("../middleware/auth")
const router = require("express").Router()

router.get("/", AuthMiddleware, GetAll)
router.get("/add", AuthMiddleware, (req, res) => {
    res.render("home/add", { title: "Qarz qo'shish" })
})
router.get("/edit/:id", AuthMiddleware, GetEdit)
router.post("/add", AuthMiddleware, AddLend)
router.post("/edit/:id", AuthMiddleware, Edit)
router.get("/delete/:id", AuthMiddleware, DeleteLend)
router.get("/blacklist", AuthMiddleware, GetBlackList)


router.post("/toggle/:id", async (req, res) => {

    const lend = await Lend.findByPk(req.params.id)

    lend.status = !lend.status

    await lend.save()

    res.json({ success: true })

})
module.exports = router
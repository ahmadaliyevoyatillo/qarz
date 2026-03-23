const { where } = require("sequelize");
const db = require("../models")
const Lend = db.Lend

const GetAll = async (req, res) => {
    try {

        const lends = await Lend.findAll({ where: { userId: req.session.user.id } });
        const lendsPlain = lends.map(l => l.get({ plain: true }));

        res.render("home/home", {
            title: "Qarzlar",
            lends: lendsPlain
        })

    } catch (error) {
        console.log(error)
    }
}

const AddLend = async (req, res) => {
    try {
        const { full_name, summa, give_day, take_day } = req.body

        await Lend.create({
            full_name,
            summa,
            give_day,
            take_day,
            userId: req.session.user.id
        })

        res.redirect("/debt")



    } catch (error) {
        console.log(error)
    }
}

const DeleteLend = async (req, res) => {
    try {

        await Lend.destroy({
            where: { id: req.params.id }
        })

        res.redirect("/debt")

    } catch (error) {
        console.log(error)
    }
}

const GetBlackList = async (req, res) => {
    try {

        const lends = await Lend.findAll()

        res.render("home/blacklist", {
            title: "Black List",
            lends
        })

    } catch (error) {
        console.log(error)
    }
}


const GetEdit = async (req, res) => {

    const lend = await Lend.findOne({
        where: {
            id: req.params.id,
            userId: req.session.user.id
        }
    })

    const lendPlain = lend.get({ plain: true })

    lendPlain.give_day =
        lendPlain.give_day.toISOString().split('T')[0]

    lendPlain.take_day =
        lendPlain.take_day.toISOString().split('T')[0]

    res.render("home/update", {
        title: "Update",
        lend: lendPlain
    })

}

const Edit = async (req, res) => {
    try {
        const { full_name, summa, give_day, take_day } = req.body

        await Lend.update(
            { full_name, summa, give_day, take_day },
            { where: { id: req.params.id, userId: req.session.user.id } }
        )

        res.redirect("/debt")
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    GetAll,
    AddLend,
    DeleteLend,
    GetBlackList,
    GetEdit,
    Edit
}
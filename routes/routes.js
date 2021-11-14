module.exports = app => {
    const controller = require("../controllers/controller.js");
    var router = require("express").Router();

    router.get("/", controller.findAll)

    router.get("/:id", controller.findOne);

    app.use('/news', router)
}
module.exports = (app) => {
  var router = require("express").Router();

  router.get("/", (req, res) => {
    res.send({
      message: "success",
    });
  });

  app.use(router)
};

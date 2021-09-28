module.exports = (app) => {
  const router = require('express').Router();
  const user = require('../controllers/user.controller');

  router.post('/', user.detail);

  app.use(router);
};

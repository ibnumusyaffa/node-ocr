module.exports = (app) => {
  const router = require('express').Router();
  const index = require('../controllers/indexController');
  const uploadMiddleware = require('../middleware/uploadMiddleware');
  router.post('/',uploadMiddleware, index.index);

  app.use(router);
};

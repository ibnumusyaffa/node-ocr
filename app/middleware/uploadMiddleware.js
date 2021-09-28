const multer = require('multer');
const path = require('path');

const { nanoid } = require('nanoid');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './storage/app');
  },

  filename: function (req, file, cb) {
    cb(null, nanoid() + path.extname(file.originalname));
  },
});
const maxSize = 2 * 1024 * 1024; // for 2MB
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Hanya format .png, .jpg and .jpeg yang dibolehkan'));
    }
  },
  limits: { fileSize: maxSize },
}).single('image');

const uploadWithValidation = (req, res, next) => {
  upload(req, res, function (err) {
    if (err) {
      res.status(400).send({
        message: err.message,
      });
    }
    next();
  });
};

module.exports = uploadWithValidation;

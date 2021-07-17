const express = require('express');
const cors = require('cors');
const path = require('path');
const compression = require('compression');
const helmet = require("helmet");
const morgan = require('morgan')


if (process.env.NODE_ENV == 'test') {
  require('dotenv').config({
    path: path.resolve(process.cwd(), '.env.test'),
  });
} else {
  require('dotenv').config();
}

const app = express();
const port = process.env.NODE_PORT || 3000;

app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(compression())
app.use(helmet());
app.use(morgan('dev'))

app.listen(port, () => {
  console.log(`Server listering at port ${port}`);
  console.log(`ENV : ${process.env.NODE_ENV}`);
});

require('./app/routes')(app);
module.exports = app;

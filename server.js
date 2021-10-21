const express = require('express');
const cors = require('cors');

const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');



require('dotenv').config();


const app = express();
const port = process.env.NODE_PORT || 3000;

app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(compression());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.static('storage/app'))
app.listen(port, () => {});

require('./app/routes')(app);
module.exports = app;

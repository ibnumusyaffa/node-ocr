const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.NODE_PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server listering at port ${port}`);
});

require('./app/routes')(app)
module.exports = app;

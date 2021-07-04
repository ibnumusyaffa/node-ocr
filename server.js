const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
require('dotenv').config()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server listering at port ${port}`);
});


module.exports = app
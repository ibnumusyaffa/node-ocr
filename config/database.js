const path = require('path');
if (process.env.NODE_ENV == 'test') {
  require('dotenv').config({
    path: path.resolve(process.cwd(), '.env.test'),
  });
} else {
  require('dotenv').config();
}

module.exports = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging:false
};

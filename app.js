const express = require('express')
const path = require('path');
const sassMiddleware = require('node-sass-middleware');
const app = express();
const moment = require('moment');
const mongoose = require('mongoose');
const db = require('./config/mongoose');
const expressLayout = require('express-ejs-layouts');
const port = 5000
app.set('view engine', 'ejs');
moment().format();

app.use(sassMiddleware({
  src: path.join(__dirname, './assets/sass'),
  dest: path.join(__dirname, './assets/css'),
  debug: false,
  outputStyle: 'compressed',
  prefix: '/css'
}));

app.use(express.static('./assets'))
app.use(express.static(path.join(__dirname)))
app.use(express.urlencoded());

app.use('/', require('./routers/index'))


app.listen(port, () => {
  console.log(`Click this link to get started :  http://localhost:${port}`);
})
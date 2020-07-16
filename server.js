// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').config();
// }
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
// const mongoose = require('mongoose');

const app = express();

const indexRouter = require('./routes/index')

app.set('view engine', 'ejs');
app.set('views', __dirname+ '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));

// DB connection
// mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser: true, useUnifiedTopology: true});
// mongoose.connection.on('error', err => {logError(err);});
// const db = mongoose.connection;

app.use('/', indexRouter);

app.listen(process.env.PORT || 3000);

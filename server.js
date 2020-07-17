// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').config();
// }
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

const app = express();

const indexRouter = require('./routes/index')

app.set('view engine', 'ejs');
app.set('views', __dirname+ '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('assest'));
app.use(express.urlencoded({ extended: true }));

// DB connection
const mongoURL = "mongodb+srv://root:node123@mynode.zgmzl.mongodb.net/node-project?retryWrites=true&w=majority";
mongoose.connect(mongoURL,{useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('error', err => {logError(err);});
const db = mongoose.connection;
// root/node123

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://root:node123@mynode.zgmzl.mongodb.net/node-project?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

// const Blog = require('./models/blog');
// app.get("/add-post", async (req, res) => {
// 	const blogs = new Blog({
// 		title: "new blog",
// 		snippet: "new blog snippet",
// 		description: "new blog description"
// 	});

// 	blogs.save()
// 		.then((result) =>{
// 			res.send(result);
// 		})
// 		.catch((err) =>{
// 			console.log(err);
// 		});
// })

app.use('/', indexRouter);

app.listen(process.env.PORT || 3000);

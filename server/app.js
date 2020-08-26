const express = require('express');
const mongoose = require('mongoose');

const userRouter = require('./routes/auth');
const postRouter = require('./routes/post');

require('dotenv').config();
const app = express();

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
var db = mongoose.connection;
db.on('open' || 'connected', () => {
    console.log("Connection to database has been established");
  });
db.on('error', console.error.bind(console, 'connection error:'));

require('./models/user');
require('./models/post');

app.use(express.json());
app.use(userRouter);
app.use(postRouter);

app.listen(process.env.PORT || 4000, (req,res) => {
    console.log(`The server is running on ${process.env.PORT}`);
})
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const foodRoutes = require('./routes/food');
const userRoutes = require('./routes/user');

const app = express();

mongoose.connect('mongodb+srv://cam:' + process.env.MONGO_ATLAS_PW +'@cluster0.4iudh.mongodb.net/myPantryFoods?retryWrites=true&w=majority')
  .then( () => {
    console.log("Connected to database.");
  }).catch( () => {
    console.log("Database connection failed.");
  });

  app.use("/", express.static( path.join(__dirname, "angular")))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req,res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});


app.use('/api/food', foodRoutes);
app.use('/api/users', userRoutes);
app.use( (req, res, next) => {
  res.sendFile(path.join(__dirname, "angular", "index.html"));
} )


module.exports = app;

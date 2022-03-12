const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const foodRoutes = require('./routes/food')

const app = express();

mongoose.connect('mongodb+srv://cam:' + process.env.MONGO_ATLAS_PW +'@cluster0.xhjip.mongodb.net/pantryFoods?retryWrites=true&w=majority')
  .then( () => {
    console.log("Connected to database.");
  }).catch( () => {
    console.log("Database connection failed.");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();
  });

app.use('/api/food', foodRoutes);

  //Mongo password:  pDWLxMoZBkbZaqee

// app.post('/api/food', (req, res, next) => {
//   const food = new Food({
//     name: req.body.name,
//     brand: req.body.brand,
//     quantity: req.body.quantity,
//     size: req.body.size,
//     expDate: req.body.expDate.toString(),
//     location: req.body.location,
//     storageType: req.body.storageType,
//     tags: req.body.tags
//   })
//   food.save();
//   res.status(201).json({
//     message: "Food added."
//   });
// });

// app.put('/api/food/:id', (req, res, next) => {
//   const food = new Food({
//     name: req.body.name,
//     brand: req.body.brand,
//     quantity: req.body.quantity,
//     size: req.body.size,
//     expDate: req.body.expDate,
//     location: req.body.location,
//     storageType: req.body.storageType,
//     tags: req.body.tags,
//     _id: req.body.id
//   })
//   Food.updateOne({_id: req.params.id}, food).then(result => {
//     console.log(result);
//     res.status(200).json({
//       message: "Post updated successfully."
//     });
//   });
// });

// app.get('/api/food', (req, res, next) => {
//   Food.find().then(documents => {
//     res.status(200).json({
//       message: "Food items fetched successfully",
//       food: documents
//     });
//   })
// });

// app.get('/api/food/:id', (req, res, next) => {
//   Food.findById(req.params.id).then(foodItem => {
//     if(foodItem){
//       res.status(200).json({
//         food: foodItem
//       });
//     }else {
//       res.status(404).json({
//         message: "Post not found"
//       })
//     }
//   })
// });

// app.delete('/api/food/:id', (req, res, next) => {
//   // console.log(req.params.id);
//   Food.deleteOne({ _id: req.params.id }).then(result => {
//     console.log(result);
//     res.status(200).json({
//       message: "Item deleted successfully"
//     });
//   });
// });

module.exports = app;

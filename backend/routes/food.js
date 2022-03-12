const express = require('express');
const Food = require('../models/food');

const router = express.Router();

router.post('', (req, res, next) => {
  const food = new Food({
    name: req.body.name,
    brand: req.body.brand,
    quantity: req.body.quantity,
    size: req.body.size,
    expDate: req.body.expDate.toString(),
    location: req.body.location,
    storageType: req.body.storageType,
    tags: req.body.tags
  })
  food.save();
  res.status(201).json({
    message: "Food added."
  });
});

router.put('/:id', (req, res, next) => {
  const food = new Food({
    name: req.body.name,
    brand: req.body.brand,
    quantity: req.body.quantity,
    size: req.body.size,
    expDate: req.body.expDate,
    location: req.body.location,
    storageType: req.body.storageType,
    tags: req.body.tags,
    _id: req.body.id
  })
  Food.updateOne({_id: req.params.id}, food).then(result => {
    console.log(result);
    res.status(200).json({
      message: "Post updated successfully."
    });
  });
});

router.get('', (req, res, next) => {
  Food.find().then(documents => {
    res.status(200).json({
      message: "Food items fetched successfully",
      food: documents
    });
  })
});

router.get('/:id', (req, res, next) => {
  Food.findById(req.params.id).then(foodItem => {
    if(foodItem){
      res.status(200).json({
        food: foodItem
      });
    }else {
      res.status(404).json({
        message: "Post not found"
      })
    }
  })
});

router.delete('/:id', (req, res, next) => {
  // console.log(req.params.id);
  Food.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({
      message: "Item deleted successfully"
    });
  });
});

module.exports = router;

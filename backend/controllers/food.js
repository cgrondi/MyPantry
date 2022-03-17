const Food = require('../models/food');

exports.createItem = (req, res, next) => {
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
  food.save().then( createdItem => {
    res.status(201).json({
      message: "Food item added to database."
    });
  })
  .catch( error => {
    res.status(500).json({
      message: "Adding food item to databse failed."
    });
  })
}

exports.updateItem = (req, res, next) => {
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
      message: "Food item updated successfully."
    });
  })
  .catch( error => {
    res.status(500).json({
      message: "Food item failed to update. Please try again."
    })
  });
}

exports.getItems = (req, res, next) => {
  let filter = {};
  if(req.query.filterString != ''){
    var filterString = req.query.filterString;
    filterString = filterString.charAt(0).toUpperCase() + filterString.slice(1);
    filter = { "storageType": filterString };
  }
  Food.find(filter).then(documents => {
    res.status(200).json({
      message: "Food items fetched successfully",
      food: documents
    })
  })
  .catch( error => {
    res.status(500).json({
      message: "Fetching food items failed. Please try again."
    })
  });
}

exports.getItem = (req, res, next) => {
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
  .catch( error => {
    res.status(500).json({
      message: "Fetching food item failed. Please try again."
    })
  })
}

exports.deleteItem = (req, res, next) => {
  Food.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({
      message: "Item deleted successfully"
    });
  })
  .catch( error => {
    res.status(500).json({
      message: "Failed to delete item. Please try again."
    })
  });
}

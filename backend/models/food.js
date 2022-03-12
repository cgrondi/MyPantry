const mongoose = require('mongoose');

const foodSchema = mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  quantity: { type: Number, required: true },
  size: { type: String, required: true },
  expDate: {type: String, required: true },
  location: { type: String, required: true },
  storageType: { type: String, required: true },
  tags: { type: [String], required: true }
});

module.exports = mongoose.model('Food', foodSchema);

const express = require('express');
// const food = require('../models/food');
const Food = require('../models/food');
const checkAuth = require('../middleware/check-auth');
const foodRoutes = require('../controllers/food');

const router = express.Router();

router.post('', checkAuth, foodRoutes.createItem);

router.put('/:id', checkAuth, foodRoutes.updateItem);

router.get('', foodRoutes.getItems);

router.get('/:id', foodRoutes.getItem);

router.delete('/:id', checkAuth, foodRoutes.deleteItem);

module.exports = router;

const express = require('express');

const userRoutes = require('../controllers/user');

const router = express.Router();

router.post('/signup', userRoutes.createUser);
router.post('/login', userRoutes.userLogin);

module.exports = router;

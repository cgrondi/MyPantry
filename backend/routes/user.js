const express = require('express');

const userRoutes = require('../controllers/user');

const router = express.Router();

router.post('/signup', userRoutes.createUser);
router.post('/login', userRoutes.userLogin);
router.delete('/deleteAll', userRoutes.deleteAllUsers);

module.exports = router;

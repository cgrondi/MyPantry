const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then( result => {
          res.status(201).json({
            message: 'User created',
            result: result
          });
        })
        .catch(err => {
          res.status(500).json({
          message: "Invalid authentication credentials. Sign up failed."
        });
      });
    });
}

exports.deleteAllUsers = (req, res, next) => {
  User.deleteMany({}, () => {
    res.status(200).json({
      message: "All users have been deleted."
    });
  }, error => {
    res.status(500).json({
      message: "Error. Unable to delete all users."
    });
  })
}

exports.userLogin = (req,res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email }).then( user => {
    if(!user){
      throw new TypeError('User not found. Login failed.');
    }
    fetchedUser = user;
    return bcrypt.compare(req.body.password, user.password);
  })
  .then( result => {
    if(!result){
      throw new TypeError('Password does not match. Login failed.');
    }
    const token = jwt.sign(
      { email: fetchedUser.email, userId: fetchedUser._id },
      process.env.JWT_KEY,
      { expiresIn: '1h'}
    );
    res.status(200).json({
      token: token,
      expiresIn: 3600
    })
  })
  .catch( error => {
    res.status(401).json({
      message: error.message
    });
  })
}

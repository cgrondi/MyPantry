const bcrypt = require('bcrypt');
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

exports.userLogin = (req,res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email }).then( user => {
    if(!user){
      res.status(401).json({
        message: "User not found. Login failed."
      });
    }
    fetchedUser = user;
    return bcrypt.compare(req.body.password, user.password);
  })
  .then( result => {
    if(!result){
      res.status(401).json({
        message: "Password does not match. Login failed."
      });
    }
    const token = jwt.sign(
      { email: fetchedUser.email, userId: fetchedUser._id },
      process.env.JWT_KEY,
      { expiresIn: '1h'}
    );
    // console.log(token);
    res.status(200).json({
      token: token,
      expiresIn: 3600
    })
  }).catch( err => {
    res.status(401).json({
      message: "Invalid authentication credentials. Login failed."
    });
  })
}

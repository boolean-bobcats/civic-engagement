const jwt = require('jwt-simple');
const Sequelize = require('sequelize');
const sequelize = require('./DB');
const Bcrypt = require('bcrypt');
const Promise = require('promise');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  location: Sequelize.STRING,
  issues: Sequelize.STRING,
  quote: Sequelize.STRING,
  aboutme: Sequelize.STRING,
  image: Sequelize.STRING
}, {
  freezeTableName: true,
  instanceMethods: {
    comparePasswords: function (candidatePassword, callback) {
      console.log('comparing pwords');
      const dbPassword = this.password;
      Bcrypt.compare(candidatePassword, dbPassword, function (err, isMatch) {
        console.log('candidatePassword',candidatePassword)
        console.log('dbPassword',dbPassword);
         callback(err, isMatch);
      });
    }
  }
});


function encrypt(pass) {
  return new Promise(function (fulfill, reject){
    Bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        reject(console.error(err));
      }
      return Bcrypt.hash(pass, salt, function (error, hash) {
        if (error) {
          reject(console.error(error));
        }
        // console.log(hash);
        fulfill(hash);
      });
    });
  });
}

module.exports = {

  signup: function (req, res, next) {
    console.log("In signup with sn & pw", req.body.username, req.body.password, req.body.location);
    const username = req.body.username;
    const password = req.body.password;
    const location = req.body.location;
    const issues = req.body.issues;
    const quote = req.body.quote;
    const aboutme = req.body.aboutme;
    // check to see if user already exists
    User.findOne({ where: { username: username } })
      .then(function (user) {
        if (user) {
          next(new Error('User already exist!'));
        } else {
          console.log("password:", password);
          encrypt(password)
            .then((encryptedPw) => {
              console.log("user didn't exist. pw encrypted is ", encryptedPw);
              User.create({
                username: username,
                password: encryptedPw,
                location: location,
                issues: issues,
                quote: quote,
                aboutme: aboutme,
                image: 'https://a1-images.myspacecdn.com/images04/12/22dd588cd2cf4309be40679b6edc20ad/300x300.jpg'
              })
              .then(function (newlyCreatedUser) {
                console.log("new user is now", newlyCreatedUser.get({ plain: true }));
                const token = jwt.encode(newlyCreatedUser, 'secret');
                console.log("token:", token);
                res.json({ token: token });
              })
              .fail(function (error) {
                console.log("some failure");
                next(error);
                    });
            })
            .catch((err) => { console.log(err); });
        }
      })
      .catch((err)=> { console.log(err)});
  },

  signin: function (req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    console.log('in signin')
    User.findOne({ where: { username: username } })
      .then(function (user) {
        if (!user) {
          next(new Error('User does not exist'));
        } else {
          console.log('user exists', user.dataValues);
          user.comparePasswords(password, function (err, isMatch) {
            console.log('back out the callback, yeah')
            console.log('ismatch:', isMatch);
            console.log('err', err);
            if (err) {
              console.log('err')
              next(new Error('Password doesn\'t match'));
            }
            if (isMatch) {
              console.log('is match');
              const token = jwt.encode(user, 'secret');
              res.json({ token: token });
            }
          });
        }
      })
      .catch(function (error) {
        next(error);
      });
  },

  checkAuth: function (req, res, next) {

    const token = req.headers.cookie.split('=')[1];
    console.log('token after split and parse', token);
    if (!token) {
      next(new Error('No token'));
    } else {
      const user = jwt.decode(token, 'secret');
      console.log('user decoded from token', user);
      User.findOne({ where: { username: user.username } })
        .then(function (foundUser) {
          if (foundUser) {
            res.send(foundUser);
          } else {
            res.sendStatus(401);
          }
        })
        .catch(function (error) {
          next(error);
        });
    }
  },

  update: function(req, res, next) {
    console.log(req.body);
    const token = req.headers.cookie.split('=')[1];
    console.log('update: token', token);
    if (!token) {
      next(new Error('No token'));
    } else {
      const decodeUser = jwt.decode(token, 'secret');
      console.log('user decoded from token', decodeUser);
      User.findOne({ where: { username: decodeUser.username } })
      .then((user) => {
        user.updateAttributes({
          location: req.body.location,
          issues: req.body.issues,
          quote: req.body.quote,
          aboutme: req.body.aboutme,
          image: req.body.image
        }).then((resp) => {
          console.log('should be updated user', resp);
          const newToken = jwt.encode(resp, 'secret');
          res.send({ user: resp, token: newToken });
        });
      })
      .catch((err) => { console.log(err); });
    }
  }
};

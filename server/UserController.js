const jwt = require('jwt-simple');
const Sequelize = require('sequelize');
const sequelize = require('./DB');
const Bcrypt = require('bcrypt');
const Promise = require('promise');


const User = sequelize.define('user', {
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
      const dbPassword = this.password;
      Bcrypt.compare(candidatePassword, dbPassword, function (err, isMatch) {
         callback(err, isMatch);
      });
    }
  }
},
  {
    tableName: 'user'
  }
)

sequelize
  .sync({ force: true })
  .then(function(err) {
    console.log('It worked!');
  }, function (err) {
    console.log('An error occurred while creating the table:', err);
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
                image: 'http://melplex.eu/wp-content/uploads/2015/06/provider_female.jpg'
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

    User.findOne({ where: { username: username } })
      .then(function (user) {
        if (!user) {
          next(new Error('User does not exist'));
        } else {
          console.log('user exists', user);
          user.comparePasswords(password, function (err, isMatch) {
            if (err) {
              next(new Error('Password doesn\'t match'));
            }
            if (isMatch) {
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
    // checking to see if the user is authenticated
    // grab the token in the header is any
    // then decode the token, which we end up being the user object
    // check to see if that user exists in the database
    // console.log(req);

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
  }

};

//
//   checkAuth: function (req, res, next) {
//     // checking to see if the user is authenticated
//     // grab the token in the header is any
//     // then decode the token, which we end up being the user object
//     // check to see if that user exists in the database
//     var token = req.headers['x-access-token'];
//     if (!token) {
//       next(new Error('No token'));
//     } else {
//       var user = jwt.decode(token, 'secret');
//       findUser({username: user.username})
//         .then(function (foundUser) {
//           if (foundUser) {
//             res.send(200);
//           } else {
//             res.send(401);
//           }
//         })
//         .fail(function (error) {
//           next(error);
//         });
//     }
//   }


// function encrypt(pass) {
//   return Bcrypt.genSalt(10, function (err, salt) {
//     if (err) {
//       return console.error(err);
//     }
//     return Bcrypt.hash(pass, salt, function (error, hash) {
//       if (error) {
//         return console.error(error);
//       }
//       console.log(hash);
//       return hash;
//     });
//   });
// };
//
// const dummyPW = encrypt('AYOO');
//
// sequelize.sync().then(function(){
//   const hey = encrypt('Ayo');
//   hey.then((resp) => {
//     User.create({
//       username: 'janedoe',
//       password: resp
//     })
//     .then(function (jane) {
//       console.log(jane.get({
//         plain: true
//       }));
//     });
//   });
// });

const User = require('../../models/User');
const Tools = require('../../common/tools');
const jwt = require('jsonwebtoken');
const config = require('../../../config/config');
const bcrypt = require('bcrypt');

module.exports = (app) => {

  /*
   * Sign in 
   */
  app.post('/account/signin', (req, res, next) => {
    const { body } = req;
    const { password } = body;
    let { email } = body;

    if (!email)
      return res.send({ success: false, message: 'Email cannot be blank.' });

    if (!password)
      return res.send({ success: false, message: 'Password cannot be blank.' });

    if (!Tools.validateEmail(email))
      return res.send({ success: false, message: 'Invalid email.' });

    email = email.toLowerCase();
    email = email.trim();

    User.query()
      .where('email', email)
      .then(users => {

        if (users.length != 1)
          return res.send({ success: false, message: 'This user does not exist.' });

        const user = users[0];

        if (!user.validPassword(password, user.password))
          return res.send({ success: false, message: 'Wrong password. Try again.' });

        const payload = {
          user: user.id
        };

        var token = jwt.sign(payload, config.super_secret, {
          expiresIn: 60 * 60 * 24 // expires in 24 hours 
        });

        // All good. User validate, send the validate token
        return res.send({
          success: true,
          message: 'All good.',
          token: token,
          user: user.id
        });

      })
      .catch(err => {
        return res.status(500).send({ success: false, message: err });
      });
  });

  /*
  * Sign up
  */
  app.post('/account/signup', (req, res, next) => {

    const { body } = req;
    const { data } = body;

    if (!data.email)
      return res.send({ success: false, message: 'Error: Email cannot be blank.' });

    if (!Tools.validateEmail(data.email))
      return res.send({ success: false, message: 'Invalid email.' });

    if (!data.password)
      return res.send({ success: false, message: 'Error: Password cannot be blank.' });

    data.email = data.email.toLowerCase();
    data.email = data.email.trim();

    // Steps:
    // 1. Verify email doesn't exist
    // 2. Save
    User.query()
      .where('email', data.email)
      .then(users => {
        if (users.length > 0)
          return res.send({ success: false, message: 'This user already exists.' });

        try {
          data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(8), null);
        } catch (err) {
          return res.status(500).send({ success: false, message: "Ta tudo cagado." });
        }

        // Save the new user
        User.query().insert(data)
          .then(json => {
            if (!json.id)
              return res.send({ success: false, message: "Error: Not added." });

            return res.send({ success: true, message: "Added!" });

          })
          .catch(err => {
            return res.status(500).send({ success: false, message: err });
          });

      })
      .catch(err => {
        return res.status(500).send({ success: false, message: err });
      });

  });

  app.get('/account/verify', (req, res, next) => {
    const { query } = req;
    const { token } = query;

    if (token) {
      jwt.verify(token, config.super_secret, function (err, decoded) {
        if (err) {
          return res.json({
            success: false,
            message: 'Failed to authenticate token.'
          });
        } else {
          req.decoded = decoded;
          return res.json({
            success: true,
            message: 'Token validate.',
            token: decoded
          });
        }
      });
    } else {
      return res.send({
        success: false,
        message: 'No token provided.'
      });
    }
  });

};
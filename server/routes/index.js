const fs = require('fs');
const path = require('path');
const config = require('../../config/config');
const jwt = require('jsonwebtoken');

module.exports = (app, express) => {

  // validation token in each request that starts with 'api'
  app.all('/api/*', function(req, res, next) {

    var token = req.headers['x-access-token'] ||
                req.body.token || 
                req.query.token;   
    
    if (token) {
      jwt.verify(token, config.super_secret, function(err, decoded) {      
        if (err) {    
          res.status(404).send({
              status: 404
          });
          return;
        } else {
          //req.decoded = decoded;    
          next();
        }
      });
    } else {
      res.status(404).send({
          status: 404
      });
      return;
    }
  });

  // Let's loop each on /api file and require it
  fs.readdirSync(__dirname + '/api/').forEach((file) => {
    require(`./api/${file.substr(0, file.indexOf('.'))}`)(app);
  });

};
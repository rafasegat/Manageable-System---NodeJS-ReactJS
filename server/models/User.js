const Model = require('objection').Model;
const bcrypt  = require('bcrypt'); 

class User extends Model {
  
  static get tableName() {
    return 'user';
  }

  validPassword(password_input, password) {
    return bcrypt.compareSync(password_input, password);
  }

  generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  }
  
}

module.exports = User;
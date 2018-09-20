const Model = require('objection').Model;

class Provider extends Model {
  
  static get tableName() {
    return 'provider';
  }
  
}

module.exports = Provider;
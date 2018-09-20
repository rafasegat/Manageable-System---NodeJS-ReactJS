const Model = require('objection').Model;

class Organization extends Model {
  
  static get tableName() {
    return 'organization';
  }

}

module.exports = Organization;


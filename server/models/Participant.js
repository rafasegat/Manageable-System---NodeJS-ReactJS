const Model = require('objection').Model;

class Participant extends Model {
  
  static get tableName() {
    return 'participant';
  }

}

module.exports = Participant;
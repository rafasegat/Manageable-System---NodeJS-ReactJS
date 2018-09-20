const Model = require('objection').Model;

class Project extends Model {
  
  static get tableName() {
    return 'project';
  }
  
}

module.exports = Project;
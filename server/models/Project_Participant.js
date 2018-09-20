const Model = require('objection').Model;

class ProjectParticipant extends Model {
  
  static get tableName() {
    return 'project_participant';
  }
  
}

module.exports = ProjectParticipant;
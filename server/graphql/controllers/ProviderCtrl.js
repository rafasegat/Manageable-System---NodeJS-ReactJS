
const ProjectModel = require('../../models/Project');
const Tools = require('../../common/tools');

exports.getAllProviders = (args) => {
    ProjectParticipant
      .query()
      .select('a.*')
      .join('participant as a', 'a.id', 'project_participant.id_participant')
      .where('id_project', args.id_project)
      .then( results => { return results; })
      .catch( err => { return { status: "Error 500: "+err }; });
}


const ParticipantModel = require('../../models/Project');
const ProjectParticipantModel = require('../../models/Project_Participant');
const ProviderModel = require('../../models/Provider');
const Tools = require('../../common/tools');

exports.getAll = (args) => {
    return ProjectParticipantModel
    .query()
    .select('a.*')
    .join('participant as a', 'a.id', 'project_participant.id_participant')
    .where('id_project', args.id_project)
    .then( results => { return results; })
    .catch( err => { return { status: "Error 500: "+err }; });
};

exports.getAllLessCurrent = (args) => {
    return ProjectParticipantModel
    .query()
    .select('a.*')
    .join('participant as a', 'a.id', 'project_participant.id_participant')
    .where({
        'id_project': args.id_project
    })
    .whereNot({
        'a.id': args.id_participant
    })
    .then( results => { return results; })
    .catch( err => { return { status: "Error 500: "+err }; });
};

exports.getProvidersByParticipant = (args) => {
    return ProviderModel
      .query()
      .select(
            'provider.id as pk_id_provider',
            'provider.relationship as provider_relationship', 
            'provider.status as provider_status', 
            'a.*')
      .join('participant as a', 'a.id', 'provider.id_provider')
      .where({
                id_participant: args.id_participant,
                id_project: args.id_project
      })
      .then( results => { return results; })
      .catch( err => { return { status: "Error 500: "+err }; });
}

const ProjectModel = require('../../models/Project');
const Tools = require('../../common/tools');

exports.getAll = (args) => {
    return ProjectModel
    .query()
    .where('id_organization', args.id_organization)
    .then( results => { return results; })
    .catch( err => { return { status: "Error 500: "+err }; });
};
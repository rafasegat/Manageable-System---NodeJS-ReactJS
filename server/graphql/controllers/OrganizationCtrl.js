
const OrganizationModel = require('../../models/Organization');
const Tools = require('../../common/tools');

exports.getAll = (args) => {
    return OrganizationModel
    .query()
    .where('id_user', args.id_user)
    .then( results => { return results; })
    .catch( err => { return { status: "Error 500: "+err }; });
};

// exports.create = (input) => {
//     return OrganizationModel    
//     .query()
//     .insert(input)
//     .then( json => { return json; })
//     .catch( err => { return { status: "Error 500: "+err }; });
// }
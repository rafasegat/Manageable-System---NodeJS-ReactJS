const ProviderCustomerOrganizationModel = require('../../models/Provider_Customer_Organization');
const Tools = require('../../common/tools');

exports.getAll = (args) => {
      return ProviderCustomerOrganizationModel
      .query()
      .select('*')
      .where({
                id_organization: args.id_organization
      })
      .then( results => { return results; })
      .catch( err => { return { status: "Error 500: "+err }; });
}
const ProviderCustomerModel = require('../../models/Provider_Customer');
const Tools = require('../../common/tools');

exports.getAll = (args) => {
    return ProviderCustomerModel
      .query()
      .select(
         'a.name as organization_name',
         'provider_customer.*'
      )
      .join('provider_customer_organization as a', 'a.id', 'provider_customer.id_provider_customer_organization')
      .where('provider_customer.id_organization', args.id_organization)
      .then( results => { return results; })
      .catch( err => { return { status: "Error 500: "+err }; });
}
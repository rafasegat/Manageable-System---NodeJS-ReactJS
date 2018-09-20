const Model = require('objection').Model;

class ProviderCustomerOrganization extends Model {
  
  static get tableName() {
    return 'provider_customer_organization';
  }
  
}

module.exports = ProviderCustomerOrganization;
const Model = require('objection').Model;

class ProviderCustomer extends Model {
  
  static get tableName() {
    return 'provider_customer';
  }
  
}

module.exports = ProviderCustomer;
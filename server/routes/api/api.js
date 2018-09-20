const ParticipantController = require('../../controllers/ParticipantController');
const OrganizationController = require('../../controllers/OrganizationController');
const ProjectController = require('../../controllers/ProjectController');
const ProviderController = require('../../controllers/ProviderController');
const ProviderCustomerController = require('../../controllers/ProviderCustomerController');
const ProviderCustomerOrganizationController = require('../../controllers/ProviderCustomerOrganizationController');
const Tools = require('../../common/tools');


module.exports = (app) => {
  
  //Organizations
  app.post('/api/organization/save', OrganizationController.save);

  // Project
  app.post('/api/project/save', ProjectController.save);

  // Participants
  app.post('/api/participant/save', ParticipantController.save);

  // Provider
  app.post('/api/provider/save', ProviderController.save);
  app.post('/api/provider/delete', ProviderController.delete);

  // Provider Customer
  app.post('/api/provider-customer/save', ProviderCustomerController.save);
  app.post('/api/provider-customer/delete', ProviderCustomerController.delete);

  // Provider Customer Organization
  app.post('/api/provider-customer-organization/save', ProviderCustomerOrganizationController.save);
  app.post('/api/provider-customer-organization/delete', ProviderCustomerOrganizationController.delete);

};
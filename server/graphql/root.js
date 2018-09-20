const OrganizationCtrl = require('./controllers/OrganizationCtrl');
const ProjectCtrl = require('./controllers/ProjectCtrl');
const ParticipantCtrl = require('./controllers/ParticipantCtrl');
const ProviderCustomerCtrl = require('./controllers/ProviderCustomerCtrl');
const ProviderCustomerOrganizationCtrl = require('./controllers/ProviderCustomerOrganizationCtrl');

var async = require("async");

module.exports.graphql_root = {

    // Organizations
    organizations: (args) => {
        return OrganizationCtrl.getAll(args);
    },

    // Projects
    projects: (args) => {
        return ProjectCtrl.getAll(args);
    },

    // Participants
    participants: (args) => {
        return ParticipantCtrl.getAll(args);
    },
    participantsLessCurrent: (args) => {
        return ParticipantCtrl.getAllLessCurrent(args);
    },

    // Providers
    providersByParticipant: (args) => {
        return ParticipantCtrl.getProvidersByParticipant(args);
    },

    // Providers Customers
    provider_customers: (args) => {
        return ProviderCustomerCtrl.getAll(args);
    },

    // Providers Customers Organizations
    provider_customer_organization: (args) => {
        return ProviderCustomerOrganizationCtrl.getAll(args);
    }

};
const { buildSchema } = require('graphql');

module.exports.graphql_schema = buildSchema(`

    input OrganizationInput {
        name: String!
        id_user: Int!
        status: Int
    },
    type Organization {
        id: Int!
        name: String!
        id_user: Int!
        status: Int
        created_at: String
        updated_at: String
    },

    type Project {
        id: Int!
        name: String!
        id_organization: Int!
        status: Int
        created_at: String
        updated_at: String
    },

    type Participant {
        id: Int!
        name: String!
        email: String
        position: String
        status: Int
        self_assessment: Int
        choose_own_feedback_provider: Int
        feedback_provider_needs_approval: Int
        id_participant_feedback_reviewer: Int
    }

    type Provider {
        id: Int!
        name: String!
        email: String
        position: String
        status: Int
        self_assessment: Int
        choose_own_feedback_provider: Int
        feedback_provider_needs_approval: Int
        id_participant_feedback_reviewer: Int,
        pk_id_provider: Int!
        provider_relationship: Int,
        provider_status: Int

    }

    type ProviderCustomer {
        id: Int!
        name: String!
        email: String
        id_provider_customer_organization: Int!
        organization_name: String
    }

    type ProviderCustomerOrganization {
        id: Int!
        name: String!
        id_organization: Int
    }

    type Query {

        organizations(id_user: ID!): [Organization]

        projects(id_organization: ID!): [Project]

        participants(id_project: ID!): [Participant]

        participantsLessCurrent(id_project: ID!, id_participant: ID!): [Participant]

        providersByParticipant(id_participant: ID!, id_project: ID!): [Provider]

        provider_customers(id_organization: ID!): [ProviderCustomer]

        provider_customer_organization(id_organization: ID!): [ProviderCustomerOrganization]

    }

    

`);

// type Mutation {
//     createOrganization(input: OrganizationInput): Organization
// }
const appSync = {
    name: 'postplanningguru',
    schema: 'schema.api.graphql',
    authenticationType: 'AMAZON_COGNITO_USER_POOLS',
    userPoolConfig: {
        region: 'eu-central-1',
        defaultAction: 'ALLOW',
        userPoolId: { Ref: 'CognitoUserPool' },
    },
    mappingTemplatesLocation: 'serverless/mappingTemplates',
    mappingTemplates: [
        //Queries
        {
            type: 'Query',
            field: 'getMyUser',
            dataSource: 'usersTable',
        },
        {
            type: 'Query',
            field: 'getMyUser',
            dataSource: 'usersTable',
        },
        {
            type: 'Query',
            field: 'getCompany',
            dataSource: 'companiesTable',
        },
        {
            type: 'Query',
            field: 'getCompanies',
            kind: 'PIPELINE',
            functions: ['getCompanies', 'hydrateCompanies'],
            request: 'simplePipeline.request.vtl',
            response: 'simplePipeline.response.vtl',
        },

        // Mutations

        // Nested Fields
        {
            // Get Companies For User
            type: 'User',
            field: 'companies',
            dataSource: 'companiesTable',
        },
    ],

    functionConfigurations: [
        {
            name: 'getCompanies',
            dataSource: 'relationshipsTable',
        },
        {
            name: 'hydrateCompanies',
            dataSource: 'companiesTable',
        },
    ],

    dataSources: [
        {
            type: 'NONE',
            name: 'none',
        },
        {
            type: 'AMAZON_DYNAMODB',
            name: 'usersTable',
            config: {
                tableName: { Ref: 'UsersTable' },
            },
        },
        {
            type: 'AMAZON_DYNAMODB',
            name: 'companiesTable',
            config: {
                tableName: { Ref: 'CompaniesTable' },
            },
        },
        {
            type: 'AMAZON_DYNAMODB',
            name: 'relationshipsTable',
            config: {
                tableName: { Ref: 'RelationshipsTable' },
            },
        },
    ],

    substitutions: {
        CompaniesTable: { Ref: 'CompaniesTable' },
    },
};

export default appSync;

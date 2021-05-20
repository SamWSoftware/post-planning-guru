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

        {
            type: 'Query',
            field: 'getPost',
            dataSource: 'postsTable',
        },
        {
            type: 'Query',
            field: 'getPostsForCompany',
            dataSource: 'postsTable',
        },
        {
            type: 'Query',
            field: 'getPostsForGroup',
            dataSource: 'postsTable',
        },
        {
            type: 'Query',
            field: 'getPublishedPost',
            dataSource: 'publishedPostsTable',
        },
        {
            type: 'Query',
            field: 'getPublishedPostsForCompany',
            dataSource: 'publishedPostsTable',
        },
        {
            type: 'Query',
            field: 'getPublishedPostsForGroup',
            dataSource: 'publishedPostsTable',
        },

        {
            type: 'Query',
            field: 'getGroup',
            dataSource: 'groupsTable',
        },
        {
            type: 'Query',
            field: 'getGroups',
            dataSource: 'groupsTable',
        },

        {
            type: 'Query',
            field: 'getSchedule',
            dataSource: 'schedulesTable',
        },
        {
            type: 'Query',
            field: 'getSchedulesForCompany',
            dataSource: 'schedulesTable',
        },
        {
            type: 'Query',
            field: 'getSchedulesForGroup',
            dataSource: 'schedulesTable',
        },

        // Mutations

        // Nested Fields

        {
            type: 'Company',
            field: 'owner',
            dataSource: 'usersTable',
        },

        {
            type: 'Company',
            field: 'posts',
            dataSource: 'postsTable',
        },
        {
            type: 'Company',
            field: 'publishedPosts',
            dataSource: 'publishedPostsTable',
        },
        {
            type: 'Company',
            field: 'groups',
            dataSource: 'groupsTable',
        },
        {
            type: 'Company',
            field: 'schedules',
            dataSource: 'schedulesTable',
        },

        {
            type: 'Post',
            field: 'company',
            dataSource: 'companiesTable',
            request: 'Model.company.request.vtl',
            response: 'Model.company.response.vtl',
        },
        {
            type: 'Post',
            field: 'group',
            dataSource: 'groupsTable',
            request: 'Model.group.request.vtl',
            response: 'Model.group.response.vtl',
        },
        {
            type: 'PublishedPost',
            field: 'company',
            dataSource: 'companiesTable',
            request: 'Model.company.request.vtl',
            response: 'Model.company.response.vtl',
        },
        {
            type: 'PublishedPost',
            field: 'group',
            dataSource: 'groupsTable',
            request: 'Model.group.request.vtl',
            response: 'Model.group.response.vtl',
        },

        {
            type: 'Group',
            field: 'company',
            dataSource: 'companiesTable',
            request: 'Model.company.request.vtl',
            response: 'Model.company.response.vtl',
        },
        {
            type: 'Group',
            field: 'schedules',
            dataSource: 'schedulesTable',
        },
        {
            type: 'Group',
            field: 'posts',
            dataSource: 'postsTable',
        },
        {
            type: 'Group',
            field: 'publishedPosts',
            dataSource: 'publishedPostsTable',
        },

        {
            type: 'Schedule',
            field: 'group',
            dataSource: 'groupsTable',
            request: 'Model.group.request.vtl',
            response: 'Model.group.response.vtl',
        },

        {
            // Get Companies For User
            type: 'User',
            field: 'companies',
            kind: 'PIPELINE',
            functions: ['getCompanies', 'hydrateCompanies'],
            request: 'simplePipeline.request.vtl',
            response: 'simplePipeline.response.vtl',
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
        {
            type: 'AMAZON_DYNAMODB',
            name: 'postsTable',
            config: {
                tableName: { Ref: 'PostsTable' },
            },
        },
        {
            type: 'AMAZON_DYNAMODB',
            name: 'publishedPostsTable',
            config: {
                tableName: { Ref: 'PublishedPostsTable' },
            },
        },
        {
            type: 'AMAZON_DYNAMODB',
            name: 'groupsTable',
            config: {
                tableName: { Ref: 'GroupsTable' },
            },
        },
        {
            type: 'AMAZON_DYNAMODB',
            name: 'schedulesTable',
            config: {
                tableName: { Ref: 'ScheduleTable' },
            },
        },
    ],

    substitutions: {
        CompaniesTable: { Ref: 'CompaniesTable' },
    },
};

export default appSync;

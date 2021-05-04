const DynamoDBResources = {
    UsersTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
            BillingMode: 'PAY_PER_REQUEST',
            KeySchema: [
                {
                    AttributeName: 'userID',
                    KeyType: 'HASH',
                },
            ],
            AttributeDefinitions: [
                {
                    AttributeName: 'userID',
                    AttributeType: 'S',
                },
            ],
            GlobalSecondaryIndexes: [],
        },
    },

    CompaniesTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
            BillingMode: 'PAY_PER_REQUEST',
            KeySchema: [
                {
                    AttributeName: 'companyID',
                    KeyType: 'HASH',
                },
            ],
            AttributeDefinitions: [
                {
                    AttributeName: 'companyID',
                    AttributeType: 'S',
                },
                {
                    AttributeName: 'ownerID',
                    AttributeType: 'S',
                },
            ],
            GlobalSecondaryIndexes: [
                {
                    IndexName: 'byOwner',
                    KeySchema: [
                        {
                            AttributeName: 'ownerID',
                            KeyType: 'HASH',
                        },
                        {
                            AttributeName: 'companyID',
                            KeyType: 'RANGE',
                        },
                    ],
                    Projection: {
                        ProjectionType: 'ALL',
                    },
                },
            ],
        },
    },

    RelationshipsTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
            BillingMode: 'PAY_PER_REQUEST',
            KeySchema: [
                {
                    AttributeName: 'userID',
                    KeyType: 'HASH',
                },
                {
                    AttributeName: 'userRelationship',
                    KeyType: 'RANGE',
                },
            ],
            AttributeDefinitions: [
                {
                    AttributeName: 'userID',
                    AttributeType: 'S',
                },
                {
                    AttributeName: 'userRelationship',
                    AttributeType: 'S',
                },
                {
                    AttributeName: 'companyID',
                    AttributeType: 'S',
                },
                {
                    AttributeName: 'companyRelationship',
                    AttributeType: 'S',
                },
            ],
            GlobalSecondaryIndexes: [
                {
                    IndexName: 'byCompany',
                    KeySchema: [
                        {
                            AttributeName: 'companyID',
                            KeyType: 'HASH',
                        },
                        {
                            AttributeName: 'companyRelationship',
                            KeyType: 'RANGE',
                        },
                    ],
                    Projection: {
                        ProjectionType: 'ALL',
                    },
                },
            ],
        },
    },

    PostsTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
            BillingMode: 'PAY_PER_REQUEST',
            KeySchema: [
                {
                    AttributeName: 'postID',
                    KeyType: 'HASH',
                },
            ],
            AttributeDefinitions: [
                {
                    AttributeName: 'postID',
                    AttributeType: 'S',
                },
                {
                    AttributeName: 'companyID',
                    AttributeType: 'S',
                },
                {
                    AttributeName: 'sortKey2', // groupID-date
                    AttributeType: 'S',
                },
            ],
            GlobalSecondaryIndexes: [
                {
                    IndexName: 'byCompanyGroupDate',
                    KeySchema: [
                        {
                            AttributeName: 'companyID',
                            KeyType: 'HASH',
                        },
                        {
                            AttributeName: 'sortKey2',
                            KeyType: 'RANGE',
                        },
                    ],
                    Projection: {
                        ProjectionType: 'ALL',
                    },
                },
            ],
        },
    },
    PublishedPostsTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
            BillingMode: 'PAY_PER_REQUEST',
            KeySchema: [
                {
                    AttributeName: 'postID',
                    KeyType: 'HASH',
                },
            ],
            AttributeDefinitions: [
                {
                    AttributeName: 'postID',
                    AttributeType: 'S',
                },
                {
                    AttributeName: 'companyID',
                    AttributeType: 'S',
                },
                {
                    AttributeName: 'sortKey2', // groupID-date
                    AttributeType: 'S',
                },
            ],
            GlobalSecondaryIndexes: [
                {
                    IndexName: 'byCompanyGroupDate',
                    KeySchema: [
                        {
                            AttributeName: 'companyID',
                            KeyType: 'HASH',
                        },
                        {
                            AttributeName: 'sortKey2',
                            KeyType: 'RANGE',
                        },
                    ],
                    Projection: {
                        ProjectionType: 'ALL',
                    },
                },
            ],
        },
    },

    GroupsTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
            BillingMode: 'PAY_PER_REQUEST',
            KeySchema: [
                {
                    AttributeName: 'companyID',
                    KeyType: 'HASH',
                },
                {
                    AttributeName: 'groupID',
                    KeyType: 'RANGE',
                },
            ],
            AttributeDefinitions: [
                {
                    AttributeName: 'companyID',
                    AttributeType: 'S',
                },
                {
                    AttributeName: 'groupID',
                    AttributeType: 'S',
                },
            ],
        },
    },

    ScheduleTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
            BillingMode: 'PAY_PER_REQUEST',
            KeySchema: [
                {
                    AttributeName: 'companyID',
                    KeyType: 'HASH',
                },
                {
                    AttributeName: 'scheduleID',
                    KeyType: 'RANGE',
                },
            ],
            AttributeDefinitions: [
                {
                    AttributeName: 'companyID',
                    AttributeType: 'S',
                },
                {
                    AttributeName: 'scheduleID',
                    AttributeType: 'S',
                },
            ],
        },
    },
};

export default DynamoDBResources;

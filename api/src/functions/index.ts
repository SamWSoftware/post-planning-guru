const functions = {
    confirmUserSignup: {
        handler: `src/functions/confirmUserSignup/handler.main`,

        iamRoleStatements: [
            {
                Effect: 'Allow',
                Action: 'dynamodb:PutItem',
                Resource: { 'Fn::GetAtt': ['UsersTable', 'Arn'] },
            },
        ],
    },
    createSchedule: {
        handler: 'src/functions/createSchedule/index.handler',
        iamRoleStatements: [
            {
                Effect: 'Allow',
                Action: ['dynamodb:PutItem', 'dynamodb:GetItem'],
                Resource: { 'Fn::GetAtt': ['SchedulesTable', 'Arn'] },
            },
        ],
    },
    updateGroup: {
        handler: 'src/functions/updateGroup/index.handler',
        iamRoleStatements: [
            {
                Effect: 'Allow',
                Action: ['dynamodb:PutItem', 'dynamodb:GetItem'],
                Resource: { 'Fn::GetAtt': ['GroupsTable', 'Arn'] },
            },
        ],
    },
    updatePost: {
        handler: 'src/functions/updatePost/index.handler',
        iamRoleStatements: [
            {
                Effect: 'Allow',
                Action: ['dynamodb:PutItem', 'dynamodb:GetItem'],
                Resource: { 'Fn::GetAtt': ['PostsTable', 'Arn'] },
            },
        ],
    },
    updateSchedule: {
        handler: 'src/functions/updateSchedule/index.handler',
        iamRoleStatements: [
            {
                Effect: 'Allow',
                Action: ['dynamodb:PutItem', 'dynamodb:GetItem'],
                Resource: { 'Fn::GetAtt': ['SchedulesTable', 'Arn'] },
            },
        ],
    },
};

export default functions;

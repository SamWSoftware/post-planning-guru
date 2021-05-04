import { handlerPath } from '@libs/handlerResolver';

export default {
    handler: `${handlerPath(__dirname)}/handler.main`,

    environment: {
        USERS_TABLE: { Ref: 'UsersTable' },
    },
    iamRoleStatements: [
        {
            Effect: 'Allow',
            Action: 'dynamodb:PutItem',
            Resource: { 'Fn::GetAtt': ['UsersTable', 'Arn'] },
        },
    ],
};

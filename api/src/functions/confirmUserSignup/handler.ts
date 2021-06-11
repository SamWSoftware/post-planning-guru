import 'source-map-support/register';
import { Handler } from 'aws-lambda';
import DynamoUtils from '@libs/dynamoDB';

const { USERS_TABLE } = process.env;

interface PostConfirmationEvent {
    version: string;
    region: string;
    userPoolId: string;
    userName: string;
    callerContext: {
        awsSdkVersion: string;
        clientId: string;
    };
    triggerSource: string;
    request: {
        userAttributes: {
            sub: string;
            'cognito:email_alias': string;
            'cognito:user_status': string;
            email_verified: string;
            name: string;
            email: string;
        };
    };
    response: {};
}

const handler: Handler<PostConfirmationEvent> = async event => {
    try {
        if (event.triggerSource == 'PostConfirmation_ConfirmSignup') {
            const { userAttributes } = event.request;
            const userData = {
                userID: event.userName,
                name: userAttributes.name || '',
                email: userAttributes.email || userAttributes['cognito:email_alias'],
            };

            await DynamoUtils.write({ data: userData, tableName: USERS_TABLE });

            return event;
        }

        throw Error('not post confirm user signup');
    } catch (error) {
        return event;
    }
};

export const main = handler;

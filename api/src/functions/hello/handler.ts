import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';



import { middyfy } from '@libs/lambda';
import Responses from '@libs/apiGateway';

import schema from './schema';

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async event => {
    return Responses._200({
        message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
    });
};

export const main = middyfy(hello);

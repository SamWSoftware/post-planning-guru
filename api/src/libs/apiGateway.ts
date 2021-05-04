import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from 'aws-lambda';
import type { FromSchema } from 'json-schema-to-ts';

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & {
    body: FromSchema<S>;
};
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<
    ValidatedAPIGatewayProxyEvent<S>,
    APIGatewayProxyResult
>;

export const formatJSONResponse = ({
    response,
    statusCode,
}: {
    response: Record<string, unknown>;
    statusCode: number;
}) => {
    return {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Origin': '*',
        },
        statusCode,
        body: JSON.stringify(response),
    };
};

const Responses = {
    _200: (response: Record<string, unknown>) => formatJSONResponse({ response, statusCode: 200 }),
    _204: (response: Record<string, unknown>) => formatJSONResponse({ response, statusCode: 204 }),
    _400: (response: Record<string, unknown>) => formatJSONResponse({ response, statusCode: 400 }),
    _401: (response: Record<string, unknown>) => formatJSONResponse({ response, statusCode: 401 }),
    _404: (response: Record<string, unknown>) => formatJSONResponse({ response, statusCode: 404 }),
    _500: (response: Record<string, unknown>) => formatJSONResponse({ response, statusCode: 500 }),
    _502: (response: Record<string, unknown>) => formatJSONResponse({ response, statusCode: 502 }),
    formatJSONResponse,
};

export default Responses;

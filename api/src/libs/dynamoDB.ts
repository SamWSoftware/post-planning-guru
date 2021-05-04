import * as AWS from 'aws-sdk';

import { ItemList, AttributeMap } from 'aws-sdk/clients/dynamodb';

const isTest = process.env.JEST_WORKER_ID;
const isServerlessOffline = process.env.IS_OFFLINE;
const config = {
    convertEmptyValues: true,
    region: process.env.region || 'eu-central-1',
    ...(isTest && {
        endpoint: 'http://localhost:8000',
        sslEnabled: false,
        region: 'local-env',
    }),
    ...(isServerlessOffline && {
        endpoint: 'http://localhost:8005',
    }),
};
const documentClient = new AWS.DynamoDB.DocumentClient(config);
const dynamo = new AWS.DynamoDB(config); //Need this for secondary key queries while we fix bug.

const DynamoUtils = {
    get: async <T = AttributeMap>({
        hashKey,
        hashValue,
        rangeKey,
        rangeValue,
        tableName,
    }: {
        hashKey: string;
        hashValue: string;
        rangeKey?: string;
        rangeValue?: string;
        tableName: string;
    }) => {
        const params = {
            TableName: tableName,
            Key: {
                [hashKey]: hashValue,
            },
        };
        if (rangeKey && rangeValue) {
            params.Key[rangeKey] = rangeValue;
        }

        const data = await documentClient.get(params).promise();
        return data.Item as T;
    },
    write: async <T = AttributeMap>({
        data,
        tableName,
    }: {
        data: { [key: string]: any };
        tableName: string;
    }) => {
        const params = {
            TableName: tableName,
            Item: { ...data },
        };
        await documentClient.put(params).promise();
        return ({ ...data } as unknown) as T;
    },
    delete: async ({
        hashKey,
        hashValue,
        rangeKey,
        rangeValue,
        tableName,
    }: {
        hashKey: string;
        hashValue: string;
        rangeKey?: string;
        rangeValue?: string;
        tableName: string;
    }) => {
        const params = {
            TableName: tableName,
            Key: {
                [hashKey]: hashValue,
            },
        };
        if (rangeKey && rangeValue) {
            params.Key[rangeKey] = rangeValue;
        }

        return await documentClient.delete(params).promise();
    },
    query: async <T = ItemList>({
        index,
        hashKey,
        hashValue,
        rangeKey,
        rangeMin,
        rangeValue,
        rangeMax,
        tableName,
    }: {
        index: string;
        hashKey: string;
        hashValue: string;
        rangeKey?: string;
        rangeValue?: string;
        rangeMin?: number;
        rangeMax?: number;
        tableName: string;
    }) => {
        if (rangeKey && !(rangeMin || rangeMax)) {
            throw Error('Need a rangeMin or rangeMax when a range key is provided');
        }

        const rminExp = rangeMin ? `${rangeKey} > :rvaluemin` : '';
        const rmaxExp = rangeMax ? `${rangeKey} < :rvaluemax` : '';
        const rEqualsExp = rangeValue ? `${rangeValue} = : rkeyvalue` : '';

        const rKeyExp =
            rangeMin && rangeMax
                ? `${rangeKey} BETWEEN :rvaluemin AND :rvaluemax`
                : rminExp || rmaxExp || rEqualsExp;

        let params = {
            TableName: tableName,
            IndexName: index,
            KeyConditionExpression: `#hkey = :hvalue${rangeKey ? ` AND ${rKeyExp}` : ''}`,
            ExpressionAttributeValues: {
                ':hvalue': { S: hashValue },
                ':rvaluemin': { N: String(rangeMin) }, //temporarily removed as ts complained
                ':rvaluemax': { N: String(rangeMax) },
            },
            ExpressionAttributeNames: {
                '#hkey': hashKey,
            },
        };

        if (!rangeKey) {
            delete params.ExpressionAttributeValues[':rvaluemax'];
            delete params.ExpressionAttributeValues[':rvaluemin'];
        } else if (!rangeMin) {
            delete params.ExpressionAttributeValues[':rvaluemin'];
        } else if (!rangeMax) {
            delete params.ExpressionAttributeValues[':rvaluemax'];
        }

        /*
        const res = await documentClient.query(params).promise()
        const items = res.Items;
        */

        const res = await dynamo.query(params).promise(); //documentClient was not working with GSI, had to use this for now.
        let items = res.Items?.map(item => {
            return AWS.DynamoDB.Converter.unmarshall(item);
        });
        return (items as unknown) as T[];
    },
    update: async ({
        tableName,
        hashKey,
        hashValue,
        rangeKey,
        rangeValue,
        updateKey,
        updateValue,
    }: {
        tableName: string;
        hashKey: string;
        hashValue: string;
        rangeKey?: string;
        rangeValue?: string;
        updateKey: string;
        updateValue: string;
    }) => {
        const params = {
            TableName: tableName,
            Key: { [hashKey]: hashValue },
            UpdateExpression: `set ${updateKey} = :updateValue`,
            ExpressionAttributeValues: {
                ':updateValue': updateValue,
            },
        };
        if (rangeKey && rangeValue) {
            params.Key[rangeKey] = rangeValue;
        }

        return documentClient.update(params).promise();
    },
};

export default DynamoUtils;

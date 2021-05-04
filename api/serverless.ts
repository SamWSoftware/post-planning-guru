import type { AWS } from '@serverless/typescript';

import functions from './src/functions';
import appSync from './serverless/appsync.api'
import CognitoResources from './serverless/cognitoResources';
import DynamoDBResources from './serverless/dynamodb'

const serverlessConfiguration: AWS = {
    service: 'post-planning-guru-api',
    frameworkVersion: '2',
    custom: {
        webpack: {
            webpackConfig: './webpack.config.js',
            includeModules: true,
        },
        appSync
    },
    plugins: [
        'serverless-webpack',
        'serverless-offline',
        'serverless-dynamodb-local',
        'serverless-appsync-plugin',
        'serverless-iam-roles-per-function'
    ],
    provider: {
        name: 'aws',
        runtime: 'nodejs14.x',
        region: 'eu-central-1',
        profile: '${opts:profile, "postplanningguru-dev"}',
        apiGateway: {
            minimumCompressionSize: 1024,
            shouldStartNameWithService: true,
        },
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
            region: '${self:provider.region}'
        },
        lambdaHashingVersion: '20201221',
    },
    package:{
        exclude: [
            'package-lock.json',
            'package.json'
        ]
    },
    // import the function via paths
    functions,
    resources: {
        Resources: {
            ...CognitoResources,
            ...DynamoDBResources
        },
        Outputs:{ 
            CognitoUserPoolId: {
                Value: {"Ref": 'CognitoUserPool'}
            }
        }
    }
};

module.exports = serverlessConfiguration;

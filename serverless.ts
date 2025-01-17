import read from '@functions/read';
import write from '@functions/write';
import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'recipehub',
  frameworkVersion: '3',
  plugins: [
    'serverless-esbuild',
    'serverless-offline'
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      RECIPE_TABLE: '${self:service}-${sls:stage}-recipes',
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: [
          'dynamodb:PutItem',
          'dynamodb:UpdateItem',
          'dynamodb:DeleteItem',
          'dynamodb:GetItem',
          'dynamodb:Query',
          'dynamodb:Scan',
        ],
        Resource: {
          'Fn::Sub': 'arn:aws:dynamodb:${AWS::Region}:${AWS::AccountId}:table/${self:service}-${sls:stage}-recipes',
        },
      },
    ],
  },
  functions: { 
    ...read, 
    ...write 
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node18',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
  resources: {
    Resources: {
      RecipeTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: '${self:service}-${sls:stage}-recipes',
          AttributeDefinitions: [
            {
              AttributeName: 'id',
              AttributeType: 'S',
            },
          ],
          KeySchema: [
            {
              AttributeName: 'id',
              KeyType: 'HASH', 
            },
          ],
          BillingMode: 'PAY_PER_REQUEST',
          StreamSpecification: {
            StreamViewType: 'NEW_AND_OLD_IMAGES',
          },
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;

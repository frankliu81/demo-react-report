import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as path from 'path';
import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';

export class RenderingLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    
    const fn = new NodejsFunction(this, "frank-rendering-function", {
      entry: path.join(__dirname, "../src/index.ts"),
      handler: 'handler', // this string should match the exports in lambda
      bundling: {
        externalModules: ['aws-sdk']
      },
    });

    const api = new LambdaRestApi(this, "frank-rendering-lambda", {
      handler: fn,
    } )
    
  }
}

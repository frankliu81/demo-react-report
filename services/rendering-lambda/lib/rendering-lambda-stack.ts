import * as cdk from 'aws-cdk-lib';
import { aws_s3 as s3 } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as path from 'path';
import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';

export class RenderingLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    // https://www.cloudtechsimplified.com/aws-lambda-s3/#bucket-creation
    const removalPolicy = cdk.RemovalPolicy.DESTROY;
    const bucket = new s3.Bucket(this, 'S3Bucket', {
      bucketName: 'frank-product-templates',
      autoDeleteObjects: true,
      removalPolicy,
    });

    const readS3ObjFn = new NodejsFunction(this, "frank-rendering-function", {
      entry: path.join(__dirname, "../src2/index.js"),
      handler: 'handler', // this string should match the exports in lambda
      bundling: {
        externalModules: ['aws-sdk'],
        nodeModules: ['@dil-team-eevee/product-components'],
        esbuildArgs: { // Pass additional arguments to esbuild
          "--loader:.js": "jsx",
        },
      },
    });

    bucket.grantRead(readS3ObjFn);

    const api = new LambdaRestApi(this, "frank-rendering-lambda", {
      handler: readS3ObjFn,
    } )
    
  }
}

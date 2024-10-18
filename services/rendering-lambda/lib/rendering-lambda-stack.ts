import * as cdk from 'aws-cdk-lib';
import { aws_s3 as s3 } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as path from 'path';
import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';

export class RenderingLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    // https://www.cloudtechsimplified.com/aws-lambda-s3/#bucket-creation
    const removalPolicy = cdk.RemovalPolicy.DESTROY;
    const bucket = new s3.Bucket(this, 'S3Bucket', {
      bucketName: 'frank-react-report',
      autoDeleteObjects: true,
      removalPolicy,
    });


    // publicly distributed lambda layer from https://github.com/shelfio/chrome-aws-lambda-layer
    const chromiumLayerArn = 'arn:aws:lambda:ca-central-1:764866452798:layer:chrome-aws-lambda:49';

    // manualy created lambda layer
    // const chromiumLayerArn = 'arn:aws:lambda:ca-central-1:536986426115:layer:chromium:1';

    // Reference the existing layer using the ARN
    const chromiumLayer = lambda.LayerVersion.fromLayerVersionArn(this, 'chromium-layer', chromiumLayerArn);

    
    const writeS3ObjFn = new NodejsFunction(this, "frank-rendering-function", {
      entry: path.join(__dirname, "../src3/index.js"),
      runtime: lambda.Runtime.NODEJS_16_X,  
      handler: 'handler', // this string should match the exports in lambda
      timeout: cdk.Duration.minutes(5),
      memorySize: 512,  // Set the memory to 512 MB
      bundling: {
        externalModules: ['aws-sdk'],
        esbuildArgs: { // Pass additional arguments to esbuild
          "--loader:.js": "jsx",
        },
      },
      layers: [chromiumLayer] 
    });

    bucket.grantWrite(writeS3ObjFn);

    const api = new LambdaRestApi(this, "frank-rendering-lambda", {
      handler: writeS3ObjFn,
    } )
    
  }
}

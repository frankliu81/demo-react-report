"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderingLambdaStack = void 0;
const cdk = require("aws-cdk-lib");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_lambda_nodejs_1 = require("aws-cdk-lib/aws-lambda-nodejs");
const path = require("path");
const aws_apigateway_1 = require("aws-cdk-lib/aws-apigateway");
const lambda = require("aws-cdk-lib/aws-lambda");
class RenderingLambdaStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // The code that defines your stack goes here
        // https://www.cloudtechsimplified.com/aws-lambda-s3/#bucket-creation
        const removalPolicy = cdk.RemovalPolicy.DESTROY;
        const bucket = new aws_cdk_lib_1.aws_s3.Bucket(this, 'S3Bucket', {
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
        const writeS3ObjFn = new aws_lambda_nodejs_1.NodejsFunction(this, "frank-rendering-function", {
            entry: path.join(__dirname, "../src/index.js"),
            runtime: lambda.Runtime.NODEJS_16_X,
            handler: 'handler',
            timeout: cdk.Duration.minutes(5),
            memorySize: 512,
            bundling: {
                externalModules: ['aws-sdk'],
                esbuildArgs: {
                    "--loader:.js": "jsx",
                },
            },
            layers: [chromiumLayer]
        });
        bucket.grantWrite(writeS3ObjFn);
        const api = new aws_apigateway_1.LambdaRestApi(this, "frank-rendering-lambda", {
            handler: writeS3ObjFn,
        });
    }
}
exports.RenderingLambdaStack = RenderingLambdaStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyaW5nLWxhbWJkYS1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlbmRlcmluZy1sYW1iZGEtc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUNBQW1DO0FBQ25DLDZDQUEyQztBQUUzQyxxRUFBK0Q7QUFDL0QsNkJBQTZCO0FBQzdCLCtEQUEyRDtBQUMzRCxpREFBaUQ7QUFFakQsTUFBYSxvQkFBcUIsU0FBUSxHQUFHLENBQUMsS0FBSztJQUNqRCxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQXNCO1FBQzlELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLDZDQUE2QztRQUM3QyxxRUFBcUU7UUFDckUsTUFBTSxhQUFhLEdBQUcsR0FBRyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUM7UUFDaEQsTUFBTSxNQUFNLEdBQUcsSUFBSSxvQkFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFO1lBQzdDLFVBQVUsRUFBRSxvQkFBb0I7WUFDaEMsaUJBQWlCLEVBQUUsSUFBSTtZQUN2QixhQUFhO1NBQ2QsQ0FBQyxDQUFDO1FBR0gsNEZBQTRGO1FBQzVGLE1BQU0sZ0JBQWdCLEdBQUcscUVBQXFFLENBQUM7UUFFL0YsK0JBQStCO1FBQy9CLHdGQUF3RjtRQUV4Riw2Q0FBNkM7UUFDN0MsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUd4RyxNQUFNLFlBQVksR0FBRyxJQUFJLGtDQUFjLENBQUMsSUFBSSxFQUFFLDBCQUEwQixFQUFFO1lBQ3hFLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxpQkFBaUIsQ0FBQztZQUM5QyxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXO1lBQ25DLE9BQU8sRUFBRSxTQUFTO1lBQ2xCLE9BQU8sRUFBRSxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDaEMsVUFBVSxFQUFFLEdBQUc7WUFDZixRQUFRLEVBQUU7Z0JBQ1IsZUFBZSxFQUFFLENBQUMsU0FBUyxDQUFDO2dCQUM1QixXQUFXLEVBQUU7b0JBQ1gsY0FBYyxFQUFFLEtBQUs7aUJBQ3RCO2FBQ0Y7WUFDRCxNQUFNLEVBQUUsQ0FBQyxhQUFhLENBQUM7U0FDeEIsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVoQyxNQUFNLEdBQUcsR0FBRyxJQUFJLDhCQUFhLENBQUMsSUFBSSxFQUFFLHdCQUF3QixFQUFFO1lBQzVELE9BQU8sRUFBRSxZQUFZO1NBQ3RCLENBQUUsQ0FBQTtJQUVMLENBQUM7Q0FDRjtBQTlDRCxvREE4Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgYXdzX3MzIGFzIHMzIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5pbXBvcnQgeyBOb2RlanNGdW5jdGlvbiB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1sYW1iZGEtbm9kZWpzJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBMYW1iZGFSZXN0QXBpIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWFwaWdhdGV3YXknO1xuaW1wb3J0ICogYXMgbGFtYmRhIGZyb20gJ2F3cy1jZGstbGliL2F3cy1sYW1iZGEnO1xuXG5leHBvcnQgY2xhc3MgUmVuZGVyaW5nTGFtYmRhU3RhY2sgZXh0ZW5kcyBjZGsuU3RhY2sge1xuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IGNkay5TdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICAvLyBUaGUgY29kZSB0aGF0IGRlZmluZXMgeW91ciBzdGFjayBnb2VzIGhlcmVcbiAgICAvLyBodHRwczovL3d3dy5jbG91ZHRlY2hzaW1wbGlmaWVkLmNvbS9hd3MtbGFtYmRhLXMzLyNidWNrZXQtY3JlYXRpb25cbiAgICBjb25zdCByZW1vdmFsUG9saWN5ID0gY2RrLlJlbW92YWxQb2xpY3kuREVTVFJPWTtcbiAgICBjb25zdCBidWNrZXQgPSBuZXcgczMuQnVja2V0KHRoaXMsICdTM0J1Y2tldCcsIHtcbiAgICAgIGJ1Y2tldE5hbWU6ICdmcmFuay1yZWFjdC1yZXBvcnQnLFxuICAgICAgYXV0b0RlbGV0ZU9iamVjdHM6IHRydWUsXG4gICAgICByZW1vdmFsUG9saWN5LFxuICAgIH0pO1xuXG5cbiAgICAvLyBwdWJsaWNseSBkaXN0cmlidXRlZCBsYW1iZGEgbGF5ZXIgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vc2hlbGZpby9jaHJvbWUtYXdzLWxhbWJkYS1sYXllclxuICAgIGNvbnN0IGNocm9taXVtTGF5ZXJBcm4gPSAnYXJuOmF3czpsYW1iZGE6Y2EtY2VudHJhbC0xOjc2NDg2NjQ1Mjc5ODpsYXllcjpjaHJvbWUtYXdzLWxhbWJkYTo0OSc7XG5cbiAgICAvLyBtYW51YWx5IGNyZWF0ZWQgbGFtYmRhIGxheWVyXG4gICAgLy8gY29uc3QgY2hyb21pdW1MYXllckFybiA9ICdhcm46YXdzOmxhbWJkYTpjYS1jZW50cmFsLTE6NTM2OTg2NDI2MTE1OmxheWVyOmNocm9taXVtOjEnO1xuXG4gICAgLy8gUmVmZXJlbmNlIHRoZSBleGlzdGluZyBsYXllciB1c2luZyB0aGUgQVJOXG4gICAgY29uc3QgY2hyb21pdW1MYXllciA9IGxhbWJkYS5MYXllclZlcnNpb24uZnJvbUxheWVyVmVyc2lvbkFybih0aGlzLCAnY2hyb21pdW0tbGF5ZXInLCBjaHJvbWl1bUxheWVyQXJuKTtcblxuICAgIFxuICAgIGNvbnN0IHdyaXRlUzNPYmpGbiA9IG5ldyBOb2RlanNGdW5jdGlvbih0aGlzLCBcImZyYW5rLXJlbmRlcmluZy1mdW5jdGlvblwiLCB7XG4gICAgICBlbnRyeTogcGF0aC5qb2luKF9fZGlybmFtZSwgXCIuLi9zcmMvaW5kZXguanNcIiksXG4gICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMTZfWCwgIFxuICAgICAgaGFuZGxlcjogJ2hhbmRsZXInLCAvLyB0aGlzIHN0cmluZyBzaG91bGQgbWF0Y2ggdGhlIGV4cG9ydHMgaW4gbGFtYmRhXG4gICAgICB0aW1lb3V0OiBjZGsuRHVyYXRpb24ubWludXRlcyg1KSxcbiAgICAgIG1lbW9yeVNpemU6IDUxMiwgIC8vIFNldCB0aGUgbWVtb3J5IHRvIDUxMiBNQlxuICAgICAgYnVuZGxpbmc6IHtcbiAgICAgICAgZXh0ZXJuYWxNb2R1bGVzOiBbJ2F3cy1zZGsnXSxcbiAgICAgICAgZXNidWlsZEFyZ3M6IHsgLy8gUGFzcyBhZGRpdGlvbmFsIGFyZ3VtZW50cyB0byBlc2J1aWxkXG4gICAgICAgICAgXCItLWxvYWRlcjouanNcIjogXCJqc3hcIixcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBsYXllcnM6IFtjaHJvbWl1bUxheWVyXSBcbiAgICB9KTtcblxuICAgIGJ1Y2tldC5ncmFudFdyaXRlKHdyaXRlUzNPYmpGbik7XG5cbiAgICBjb25zdCBhcGkgPSBuZXcgTGFtYmRhUmVzdEFwaSh0aGlzLCBcImZyYW5rLXJlbmRlcmluZy1sYW1iZGFcIiwge1xuICAgICAgaGFuZGxlcjogd3JpdGVTM09iakZuLFxuICAgIH0gKVxuICAgIFxuICB9XG59XG4iXX0=
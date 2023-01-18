"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderingLambdaStack = void 0;
const cdk = require("aws-cdk-lib");
const aws_lambda_nodejs_1 = require("aws-cdk-lib/aws-lambda-nodejs");
const path = require("path");
const aws_apigateway_1 = require("aws-cdk-lib/aws-apigateway");
class RenderingLambdaStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // The code that defines your stack goes here
        const fn = new aws_lambda_nodejs_1.NodejsFunction(this, "frank-rendering-function", {
            entry: path.join(__dirname, "../src2/index.js"),
            handler: 'handler',
            bundling: {
                externalModules: ['aws-sdk'],
                nodeModules: ['@dil-team-eevee/product-components'],
                esbuildArgs: {
                    "--loader:.js": "jsx",
                },
            },
        });
        const api = new aws_apigateway_1.LambdaRestApi(this, "frank-rendering-lambda", {
            handler: fn,
        });
    }
}
exports.RenderingLambdaStack = RenderingLambdaStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyaW5nLWxhbWJkYS1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlbmRlcmluZy1sYW1iZGEtc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUNBQW1DO0FBRW5DLHFFQUErRDtBQUMvRCw2QkFBNkI7QUFDN0IsK0RBQTJEO0FBRTNELE1BQWEsb0JBQXFCLFNBQVEsR0FBRyxDQUFDLEtBQUs7SUFDakQsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFzQjtRQUM5RCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4Qiw2Q0FBNkM7UUFFN0MsTUFBTSxFQUFFLEdBQUcsSUFBSSxrQ0FBYyxDQUFDLElBQUksRUFBRSwwQkFBMEIsRUFBRTtZQUM5RCxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsa0JBQWtCLENBQUM7WUFDL0MsT0FBTyxFQUFFLFNBQVM7WUFDbEIsUUFBUSxFQUFFO2dCQUNSLGVBQWUsRUFBRSxDQUFDLFNBQVMsQ0FBQztnQkFDNUIsV0FBVyxFQUFFLENBQUMsb0NBQW9DLENBQUM7Z0JBQ25ELFdBQVcsRUFBRTtvQkFDWCxjQUFjLEVBQUUsS0FBSztpQkFDdEI7YUFDRjtTQUNGLENBQUMsQ0FBQztRQUVILE1BQU0sR0FBRyxHQUFHLElBQUksOEJBQWEsQ0FBQyxJQUFJLEVBQUUsd0JBQXdCLEVBQUU7WUFDNUQsT0FBTyxFQUFFLEVBQUU7U0FDWixDQUFFLENBQUE7SUFFTCxDQUFDO0NBQ0Y7QUF2QkQsb0RBdUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuaW1wb3J0IHsgTm9kZWpzRnVuY3Rpb24gfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtbGFtYmRhLW5vZGVqcyc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgTGFtYmRhUmVzdEFwaSB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1hcGlnYXRld2F5JztcblxuZXhwb3J0IGNsYXNzIFJlbmRlcmluZ0xhbWJkYVN0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBjZGsuU3RhY2tQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgLy8gVGhlIGNvZGUgdGhhdCBkZWZpbmVzIHlvdXIgc3RhY2sgZ29lcyBoZXJlXG4gICAgXG4gICAgY29uc3QgZm4gPSBuZXcgTm9kZWpzRnVuY3Rpb24odGhpcywgXCJmcmFuay1yZW5kZXJpbmctZnVuY3Rpb25cIiwge1xuICAgICAgZW50cnk6IHBhdGguam9pbihfX2Rpcm5hbWUsIFwiLi4vc3JjMi9pbmRleC5qc1wiKSxcbiAgICAgIGhhbmRsZXI6ICdoYW5kbGVyJywgLy8gdGhpcyBzdHJpbmcgc2hvdWxkIG1hdGNoIHRoZSBleHBvcnRzIGluIGxhbWJkYVxuICAgICAgYnVuZGxpbmc6IHtcbiAgICAgICAgZXh0ZXJuYWxNb2R1bGVzOiBbJ2F3cy1zZGsnXSxcbiAgICAgICAgbm9kZU1vZHVsZXM6IFsnQGRpbC10ZWFtLWVldmVlL3Byb2R1Y3QtY29tcG9uZW50cyddLFxuICAgICAgICBlc2J1aWxkQXJnczogeyAvLyBQYXNzIGFkZGl0aW9uYWwgYXJndW1lbnRzIHRvIGVzYnVpbGRcbiAgICAgICAgICBcIi0tbG9hZGVyOi5qc1wiOiBcImpzeFwiLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIGNvbnN0IGFwaSA9IG5ldyBMYW1iZGFSZXN0QXBpKHRoaXMsIFwiZnJhbmstcmVuZGVyaW5nLWxhbWJkYVwiLCB7XG4gICAgICBoYW5kbGVyOiBmbixcbiAgICB9IClcbiAgICBcbiAgfVxufVxuIl19
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
            // depsLockFilePath: path.join(__dirname, "../src2/package-lock.json"),
            bundling: {
                externalModules: ['aws-sdk'],
                esbuildArgs: {
                    "--loader:.js": "jsx",
                },
                // commandHooks: {
                //   beforeBundling(inputDir: string, outputDir: string) {
                //     return [
                //       `cd ${inputDir}`,
                //       'npm install --frozen-lockfile',
                //     ]
                //   },
                //   beforeInstall() {
                //     return []
                //   },
                //   afterBundling() {
                //     return []
                //   }
                // }
            },
        });
        const api = new aws_apigateway_1.LambdaRestApi(this, "frank-rendering-lambda", {
            handler: fn,
        });
    }
}
exports.RenderingLambdaStack = RenderingLambdaStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyaW5nLWxhbWJkYS1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlbmRlcmluZy1sYW1iZGEtc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUNBQW1DO0FBRW5DLHFFQUErRDtBQUMvRCw2QkFBNkI7QUFDN0IsK0RBQTJEO0FBRTNELE1BQWEsb0JBQXFCLFNBQVEsR0FBRyxDQUFDLEtBQUs7SUFDakQsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFzQjtRQUM5RCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4Qiw2Q0FBNkM7UUFFN0MsTUFBTSxFQUFFLEdBQUcsSUFBSSxrQ0FBYyxDQUFDLElBQUksRUFBRSwwQkFBMEIsRUFBRTtZQUM5RCxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsa0JBQWtCLENBQUM7WUFDL0MsT0FBTyxFQUFFLFNBQVM7WUFDbEIsdUVBQXVFO1lBQ3ZFLFFBQVEsRUFBRTtnQkFDUixlQUFlLEVBQUUsQ0FBQyxTQUFTLENBQUM7Z0JBQzVCLFdBQVcsRUFBRTtvQkFDWCxjQUFjLEVBQUUsS0FBSztpQkFDdEI7Z0JBQ0Qsa0JBQWtCO2dCQUNsQiwwREFBMEQ7Z0JBQzFELGVBQWU7Z0JBQ2YsMEJBQTBCO2dCQUMxQix5Q0FBeUM7Z0JBQ3pDLFFBQVE7Z0JBQ1IsT0FBTztnQkFDUCxzQkFBc0I7Z0JBQ3RCLGdCQUFnQjtnQkFDaEIsT0FBTztnQkFDUCxzQkFBc0I7Z0JBQ3RCLGdCQUFnQjtnQkFDaEIsTUFBTTtnQkFDTixJQUFJO2FBQ0w7U0FDRixDQUFDLENBQUM7UUFFSCxNQUFNLEdBQUcsR0FBRyxJQUFJLDhCQUFhLENBQUMsSUFBSSxFQUFFLHdCQUF3QixFQUFFO1lBQzVELE9BQU8sRUFBRSxFQUFFO1NBQ1osQ0FBRSxDQUFBO0lBRUwsQ0FBQztDQUNGO0FBckNELG9EQXFDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcbmltcG9ydCB7IE5vZGVqc0Z1bmN0aW9uIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWxhbWJkYS1ub2RlanMnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IExhbWJkYVJlc3RBcGkgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtYXBpZ2F0ZXdheSc7XG5cbmV4cG9ydCBjbGFzcyBSZW5kZXJpbmdMYW1iZGFTdGFjayBleHRlbmRzIGNkay5TdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogY2RrLlN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIC8vIFRoZSBjb2RlIHRoYXQgZGVmaW5lcyB5b3VyIHN0YWNrIGdvZXMgaGVyZVxuICAgIFxuICAgIGNvbnN0IGZuID0gbmV3IE5vZGVqc0Z1bmN0aW9uKHRoaXMsIFwiZnJhbmstcmVuZGVyaW5nLWZ1bmN0aW9uXCIsIHtcbiAgICAgIGVudHJ5OiBwYXRoLmpvaW4oX19kaXJuYW1lLCBcIi4uL3NyYzIvaW5kZXguanNcIiksXG4gICAgICBoYW5kbGVyOiAnaGFuZGxlcicsIC8vIHRoaXMgc3RyaW5nIHNob3VsZCBtYXRjaCB0aGUgZXhwb3J0cyBpbiBsYW1iZGFcbiAgICAgIC8vIGRlcHNMb2NrRmlsZVBhdGg6IHBhdGguam9pbihfX2Rpcm5hbWUsIFwiLi4vc3JjMi9wYWNrYWdlLWxvY2suanNvblwiKSxcbiAgICAgIGJ1bmRsaW5nOiB7XG4gICAgICAgIGV4dGVybmFsTW9kdWxlczogWydhd3Mtc2RrJ10sXG4gICAgICAgIGVzYnVpbGRBcmdzOiB7IC8vIFBhc3MgYWRkaXRpb25hbCBhcmd1bWVudHMgdG8gZXNidWlsZFxuICAgICAgICAgIFwiLS1sb2FkZXI6LmpzXCI6IFwianN4XCIsXG4gICAgICAgIH0sXG4gICAgICAgIC8vIGNvbW1hbmRIb29rczoge1xuICAgICAgICAvLyAgIGJlZm9yZUJ1bmRsaW5nKGlucHV0RGlyOiBzdHJpbmcsIG91dHB1dERpcjogc3RyaW5nKSB7XG4gICAgICAgIC8vICAgICByZXR1cm4gW1xuICAgICAgICAvLyAgICAgICBgY2QgJHtpbnB1dERpcn1gLFxuICAgICAgICAvLyAgICAgICAnbnBtIGluc3RhbGwgLS1mcm96ZW4tbG9ja2ZpbGUnLFxuICAgICAgICAvLyAgICAgXVxuICAgICAgICAvLyAgIH0sXG4gICAgICAgIC8vICAgYmVmb3JlSW5zdGFsbCgpIHtcbiAgICAgICAgLy8gICAgIHJldHVybiBbXVxuICAgICAgICAvLyAgIH0sXG4gICAgICAgIC8vICAgYWZ0ZXJCdW5kbGluZygpIHtcbiAgICAgICAgLy8gICAgIHJldHVybiBbXVxuICAgICAgICAvLyAgIH1cbiAgICAgICAgLy8gfVxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIGNvbnN0IGFwaSA9IG5ldyBMYW1iZGFSZXN0QXBpKHRoaXMsIFwiZnJhbmstcmVuZGVyaW5nLWxhbWJkYVwiLCB7XG4gICAgICBoYW5kbGVyOiBmbixcbiAgICB9IClcbiAgICBcbiAgfVxufVxuIl19
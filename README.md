
Demo for SSR (server-side rendering) lambda deployed with CDK:

Reference: https://aws.amazon.com/blogs/compute/building-server-side-rendering-for-react-in-aws-lambda/


To Deploy:
cd services/rendering-lambda
npm run cdk deploy


Description:

- rendering-lambda: Contains the CDK stack with a NodejsFunction that runs a server side rendering app to render a react component on the server side.

rendering-lambda/src: Render a static ECM list and a simple Highchart chart then call ReactDOM with that output to render the final html. It will save the render HTML in s3, render the HTML to pdf using puppeteer and store the pdf in s3, and render the HTML to Word doc using html-to-docx and store the docx in s3.

To run puppeteer on lambda, you have to include Chromium, you can either
- Option 1 (Recommended): Create the lambda pointing to the ARN of the chromium layer of your region built in https://github.com/shelfio/chrome-aws-lambda-layer

- Option 2: Manually create chromium lambda layer:
https://github.com/Sparticuz/chromium/issues/41
see https://www.npmjs.com/package/@sparticuz/chromium, AWS Lamba Laye

```
git clone --depth=1 https://github.com/sparticuz/chromium.git && \
cd chromium && \
make chromium.zip

bucketName="chromiumUploadBucket" && \
versionNumber="107" && \
aws s3 cp chromium.zip "s3://${bucketName}/chromiumLayers/chromium${versionNumber}.zip" && \
aws lambda publish-layer-version --layer-name chromium --description "Chromium v${versionNumber}" --content "S3Bucket=${bucketName},S3Key=chromiumLayers/chromium${versionNumber}.zip" --compatible-runtimes nodejs --compatible-architectures x86_64
```
Note down the arn of the lambda layer and put in rendering-lambda-stack.ts.


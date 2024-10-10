
Demo for SSR (server-side rendering) lambda deployed with CDK:

Reference: https://aws.amazon.com/blogs/compute/building-server-side-rendering-for-react-in-aws-lambda/


To Deploy:
npm run cdk deploy


Description:

- rendering-lambda: the CDK stack, the NodejsFunction bundling function has node_modules set to include product-components. When this is bundled during cdk deploy, the assets under cdk.out would include product-components and react dependency. 

rendering-lambda/src3: Render a static ECM list and then call ReactDOM with that output to render the final html. It will save the render HTML in s3

- Manually create chromium lambda layer:
https://github.com/Sparticuz/chromium/issues/41
see https://www.npmjs.com/package/@sparticuz/chromium, AWS Lamba Layer

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

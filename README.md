Demo for rendering lambda

- product-components: npm package published to code artifact that contains the Product and ProductList component, think of it as shared email components like header, footer, or table

- product-templates: depends on react and product-components, but esbuild bundled without it. This is the email template that references ProductList, and compiled into javascript with esbuild, and uploaded manually to s3 (can be uploaded with a pipeline in automation)

- rendering-lambda: the CDK stack, the NodejsFunction bundling function has node_modules set to include product-components. When this is bundled during cdk deploy, the assets under cdk.out would include product-components and react dependency. The rendering lambda would load the dynamic product template js from s3, and using the module-from-string, requireFromString method, it loads the module and execute the compiled react js function passing in the user data, and then call ReactDOM with that output to render the final html. In this example, it is connected to APIGateway to render the ProductList html.  
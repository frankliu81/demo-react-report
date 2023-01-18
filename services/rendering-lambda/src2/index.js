import React from "react";
import ReactDOMServer from "react-dom/server";
import * as AWS from 'aws-sdk';
// import vm from 'vm';
// import * as fs from 'fs';
import {
  requireFromString,
  importFromString,
  importFromStringSync
} from 'module-from-string'

// not used
// import SSRApp from "./SSRApp";

const indexFile = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <div>Rendered on Server</div>
  </body>
</html>`;

const handler = async function (event) {
  try {
    const result = { data: [
      { id: 1, name: "item 1", desc: "product 1 description", price: "1.00" },
      { id: 2, name: "item 2", desc: "product 2 description", price: "2.00" },
      { id: 3, name: "item 3", desc: "product 3 description", price: "3.00" },
      { id: 4, name: "item 4", desc: "product 4 description", price: "4.00" },
      { id: 5, name: "item 5", desc: "product 5 description", price: "5.00" },
    ]};
    console.log("SSRApp: ")
    // force react and react-dom include into node_modules during esbuild so it will be part of the lambeda
    // can be fixed with layers
    const s3 = new AWS.S3();
    const params = { Bucket: 'frank-product-templates', Key: 'template.js' };
    const response = await s3.getObject(params).promise();
    const template = response.Body?.toString('utf-8') || '';
    const templateModule = requireFromString(template);
    const app = ReactDOMServer.renderToString(templateModule.SSRApp({data: result.data}));

    // did not work on Error Cannot find module '@dil-team-eevee/product-components' Require stack: - /tmp/template.js
    // console.log('file contents:', template);
    // fs.writeFileSync('/tmp/template.js', template);
    // const templateModule = await import('/tmp/template.js');
    // const app = templateModule.default(result.data);
    

    // did not work on exported function
    // https://stackoverflow.com/questions/69391079/execute-function-from-s3-downloaded-javascript-file-without-creating-a-local-fil
    // const script = new vm.Script(template);
    // script.runInThisContext()
    // console.log(SSRApp({result.data}))
  
    
    // console.log(<SSRApp data={result.data} />)
    // const app = ReactDOMServer.renderToString(<SSRApp data={result.data} />);
    const html = indexFile.replace(
      '<div id="root"></div>',
      `<div id="root">${app}</div>`
    );
    
    return {
      statusCode: 200,
      headers: { "Content-Type": "text/html" },
      body: html,
    };
  } catch (error) {
    console.log(`Error ${error.message}`);
    return `Error ${error}`;
  }
};

export { handler };


// export const handler = async (event: any, context: any, callback: any) => {
//     const responseCode = 200;
//     const responseBody = [
//       { id: 1, name: "item 1", desc: "product 1 description", price: "1.00" },
//       { id: 2, name: "item 2", desc: "product 2 description", price: "2.00" },
//       { id: 3, name: "item 3", desc: "product 3 description", price: "3.00" },
//       { id: 4, name: "item 4", desc: "product 4 description", price: "4.00" },
//       { id: 5, name: "item 5", desc: "product 5 description", price: "5.00" },
//     ];
//     const headers = {
//       "Access-Control-Allow-Origin": "*",
//       "Access-Control-Allow-Credentials": true,
//     };

//     const response = {
//       statusCode: responseCode,
//       headers: headers,
//       body: JSON.stringify(responseBody),
//     };
//     return response;
// }

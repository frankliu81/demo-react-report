import React from "react";
import ReactDOMServer from "react-dom/server";
import SSRApp from "./SSRApp";
import * as AWS from 'aws-sdk';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import fs from 'fs';
import htmlToDocx from 'html-to-docx';
// will get ReadableStream undefined if not included
import { ReadableStream } from 'web-streams-polyfill/polyfill';


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
      { id: 1, name: "ECM 1", desc: "LED lighting", price: "5000.00" },
      { id: 2, name: "ECM 2", desc: "Lighting control", price: "2000.00" },
      { id: 3, name: "ECM 3", desc: "Boiler upgrade", price: "12000.00" },
      { id: 4, name: "ECM 4", desc: "AHU upgrade", price: "11000.00" },
      { id: 5, name: "ECM 5", desc: "Piping insulation", price: "3000.00" },
    ]};
    console.log("SSRApp 3: ")
    console.log(<SSRApp data={result.data} />)
    const app = ReactDOMServer.renderToString(<SSRApp data={result.data} />);
    const htmlString = indexFile.replace(
      '<div id="root"></div>',
      `<div id="root">${app}</div>`
    );
    console.log(htmlString);

    const s3 = new AWS.S3();
    const params = { Bucket: 'frank-react-report', Key: 'report.html', Body: htmlString };
    const response = await s3.putObject(params).promise();
    console.log('Here is your HTML!.');

     // Convert HTML to PDF using Puppeteer
     const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath('/opt/nodejs/node_modules/@sparticuz/chromium/bin'),
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });
    console.log('Puppeteer launched.');

    const page = await browser.newPage();
    await page.setContent(htmlString);

    // Write the PDF to the /tmp directory in Lambda
    const pdfPath = '/tmp/report.pdf';  // Use /tmp for writing files
    await page.pdf({ path: pdfPath, format: 'A4' });
    await browser.close();
    console.log('PDF Generated.');

    // Read the PDF from /tmp directory
    const pdfBuffer = fs.readFileSync(pdfPath);

    // Upload the PDF to S3
    const paramsPdf = { Bucket: 'frank-react-report', Key: 'report.pdf', Body: pdfBuffer };
    await s3.putObject(paramsPdf).promise();
    console.log('PDF uploaded to S3.');
    
    // Convert HTML to word doc
    // clean the html from the noscript tag to avoid getting the message. "You need to enable JavaScript to run this app."
    const cleanedHtml = htmlString.replace(/<noscript[^>]*>([\s\S]*?)<\/noscript>/gi, '');
    const docxBuffer = await htmlToDocx(cleanedHtml, null, {}, null);
    fs.writeFileSync('/tmp/report.docx', docxBuffer);
    
    // Upload the PDF to S3
    const paramsDocx = { Bucket: 'frank-react-report', Key: 'report.docx', Body: docxBuffer };
    await s3.putObject(paramsDocx).promise();
    console.log('DOCX uploaded to S3.');
    


    return {
      statusCode: 200,
      headers: { "Content-Type": "text/html" },
      body: htmlString,
    };
  } catch (error) {
    console.log(`Error ${error.message}`);
    return `Error ${error}`;
  }
};

export { handler };


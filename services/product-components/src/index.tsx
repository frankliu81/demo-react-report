// from notification-service/email-templates/index.js
// const EmailTemplates = require("./app/components/EmailTemplates");
// module.exports = EmailTemplates;

import * as React from 'react'
import * as Server from 'react-dom/server'
import ProductList from '../app/components/ProductList'

// console.log(Server.renderToString(<ProductList result={{products: [
//   { id: 1, name: "item 1", desc: "product 1 description", price: "1.00" }
// ]}} />))

export { ProductList }
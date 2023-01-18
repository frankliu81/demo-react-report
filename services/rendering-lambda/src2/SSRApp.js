import React, { useState } from "react";
// import directly from local directory on lambda
import { ProductList } from "../node_modules/@dil-team-eevee/product-components";

const SSRApp = ({ data }) => {
  const [result, setResult] = useState({ loading: false, products: data });
  console.log('ProductList')
  console.log(ProductList)
  return (
    <div>
      <ProductList result={result} />
    </div>
  );
};

export default SSRApp;

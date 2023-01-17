import React, { useState } from "react";
// import directly from local directory so it is compiled into the lambda from esbuild
// but this could be npm install from a private npm registry
import { ProductList } from "../../product-components/src";

const SSRApp = ({ data }) => {
  const [result, setResult] = useState({ loading: false, products: data });
  return (
    <div>
      <ProductList result={result} />
    </div>
  );
};

export default SSRApp;

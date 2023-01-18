import React, { useState, lazy } from "react";
import { ProductList } from "@dil-team-eevee/product-components";


export const SSRApp = ({ data }) => {
  // const [result, setResult] = useState({ loading: false, products: data });
  const result = {loading: false, products: data}
  console.log('ProductList')
  console.log(ProductList)

  return (
    <div>
      <ProductList result={{result}} />
    </div>
  );
};

// export default SSRApp;

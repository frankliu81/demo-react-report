import React, { useState } from "react";
import ECMList from "./components/ECMList";

const SSRApp = ({ data }) => {
  const [result, setResult] = useState({ loading: false, ecms: data });
  return (
    <div>
      <ECMList result={result} />
    </div>
  );
};

export default SSRApp;

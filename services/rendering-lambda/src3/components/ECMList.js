import React from "react";
import ECM from "./ECM";

const ECMList = ({ result }) => {
  console.log(result);
  if (result.loading) {
    return <div>loading...</div>;
  } else {
    return (
      <div>
        {result.ecms.map((ecm, i) => (
          <ECM key={i} {...ecm} />
        ))}
      </div>
    );
  }
};
export default ECMList;

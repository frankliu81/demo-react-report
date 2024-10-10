import React from "react";

const ECM = ({ id, name, desc, price }) => {
  return (
    <div id={id}>
      <h1>ECM {name}</h1>
      <p>Price ${price}</p>
      <p>Description: {desc}</p>
    </div>
  );
};

export default ECM;

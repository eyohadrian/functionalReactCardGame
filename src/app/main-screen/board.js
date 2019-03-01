import React from "react";
import Card from "./card";

export default ({data}) => (
  <React.Fragment>
    {data
      .map(data =>
        <Card
          data={data}
          key={data.id}
          faceDown={true}/>)
    }
  </React.Fragment>
)
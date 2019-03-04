import React from "react";
import Card from "./card";

export default ({data}) => {
  return (
    <React.Fragment>
      {data
        .map(card =>
          <Card
            data={card}
            key={`${card.id}`}
            faceDown={true}/>)
      }
    </React.Fragment>
  )
}
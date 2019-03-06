import React from "react";
import Card from "./card";

export default ({data}) => {
  return (
    <React.Fragment>
      {data
        .sort((a, b) => a.order > b.order ? -1 : 1)
        .map(card =>
          <Card
            {...card}
            key={`${card.id}`}/>)
      }
    </React.Fragment>
  )
}
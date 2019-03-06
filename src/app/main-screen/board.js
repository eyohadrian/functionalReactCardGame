import React from "react";
import Card from "./card";

export default ({data}) => {
  return (
    <React.Fragment>
      {data
        .sort((a, b) => a.order > b.order ? -1 : 1)
        .map(card =>
          <Card
            id={card.id}
            url={card.url}
            cardState={card.state}
            key={`${card.id}`}/>)
      }
    </React.Fragment>
  )
}
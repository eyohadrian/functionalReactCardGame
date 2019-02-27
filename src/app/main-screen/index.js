import React, {useEffect} from 'react';
import {getGlobalState} from "../context/global-context";
import Card from './card';
import {withStyles} from "@material-ui/core";

const style = {
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 20%)',
    gridTemplateRows: 'repeat(2, 50%)',
    width: '80%',
    height: '65%'
  }
};

export default withStyles(style)(({classes}) => {

  useEffect(() => {
    console.log("Rendered main-screen")
  });

  const {state, dispatch} = getGlobalState();
  return (
    <div className={classes.root}>
      {state.cardRawData.map(data => <Card data={data} key={data.id}/>)}
    </div>
  )
})
import {withStyles} from "@material-ui/core";
import React from "react";

export const formattedTime = milis => {
  const time = new Date(milis);
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const mili = time.getMilliseconds();
  return `${minutes}min,  ${seconds}sec, ${mili}milI`
};

const style = {
  root: {
    margin: '0px',
    justifySelf: 'center',
    alignSelf: 'center',
    fontSize: '24px',
    fontFamily: 'monospace',
  }
};

export default withStyles(style)(({classes, time}) => (
  <p className={classes.root}>{
    formattedTime(time)
  }</p>
))
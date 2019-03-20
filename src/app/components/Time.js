import {withStyles} from "@material-ui/core";
import React from "react";

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
  <p className={classes.root}>{time}</p>
))
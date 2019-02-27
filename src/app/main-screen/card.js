import React from 'react';
import {withStyles} from "@material-ui/core";

const style = {
  root: {
    backgroundColor: 'red',
    height: '85%',
    width: '65%',
    alignSelf: 'center',
    justifySelf: 'center'
  }
};

export default withStyles(style)(({classes, data}) => {
  return (
    <div className={classes.root}>

    </div>
  )
})
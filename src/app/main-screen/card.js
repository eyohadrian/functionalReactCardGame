import React from 'react';
import {withStyles} from "@material-ui/core";

const style = {
  root: {
    backgroundColor: 'red',
    height: '85%',
    width: '65%',
    alignSelf: 'center',
    justifySelf: 'center',
    backgroundSize: '100% 100%',
    borderRadius: '10px'
  }
};

export default withStyles(style)(({classes, data}) => {
  return (
    <div className={classes.root} style={{
      backgroundImage: `url(${data.url})`
    }}>

    </div>
  )
})
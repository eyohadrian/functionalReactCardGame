import React, {useContext, useEffect} from 'react';
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
  },
  img: {
    height: '100%',
    width: '100%',
    backgroundSize: '100% 100%',
    borderRadius: '10px'
  }
};

export default withStyles(style)(({classes, data, onLoad}) => {
  return (
    <div className={classes.root} >
      <img className={classes.img}  src={data.url} onLoad={onLoad} />
    </div>
  )
})
import React from 'react';
import {withStyles} from "@material-ui/core";
import Button from "@material-ui/core/es/Button/Button";
import {formattedTime} from "../main-screen/utils";
import {getSetStage, STAGE} from "../main-screen/context/stage-context";



const align = {
  justifySelf: 'center',
  alignSelf: 'center'
};

const style = {
  root: {
    height: '320px',
    width: '560px',
    backgroundColor: '#ef8484',
    borderRadius: '20px',
    display: 'grid',
    gridTemplateRows: '42% 58%',
  },
  header: {
    ...align
  },
  button: {
    ...align,
    height: '56px',
    width: '120px'
  }
};

export default withStyles(style)(({classes}) => {
  const time = formattedTime(4131);
  const setStage = getSetStage();

  return (
    <div className={classes.root}>
      <h2 className={classes.header}>
        {time}
      </h2>
      <Button className={classes} onClick={() => setStage(STAGE.START)}>Play Again</Button>
    </div>
  )
})

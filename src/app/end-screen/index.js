import React from 'react';
import {withStyles} from "@material-ui/core";
import Button from "@material-ui/core/es/Button/Button";
import {formattedTime} from "../main-screen/utils";
import {getSetStage, STAGE} from "../constants/stage";
import {getGlobalState} from "../../context/global-context";
import {CHANGE_STAGE} from "../../actions";



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
  const {dispatchGlobal} = getGlobalState();
  return (
    <div className={classes.root}>
      <h2 className={classes.header}>
        {time}
      </h2>
      <Button className={classes} onClick={() => dispatchGlobal({type: CHANGE_STAGE, stage: STAGE.START})}>Play Again</Button>
    </div>
  )
})

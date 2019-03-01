import React from 'react';
import {withStyles} from "@material-ui/core";
import classNames from 'classnames';
import {getGameState} from "./context/game-context";
import CARD_STATE from "./card-state";
import {CARD_LOADED} from "./actions";

const cardProperties = {
  height: '100%',
  width: '100%',
  borderRadius: '10px',
  position: 'absolute',
  top: '0',
};

const style = {
  root: {
    height: '85%',
    width: '65%',
    alignSelf: 'center',
    justifySelf: 'center',
    position: 'relative'
  },

  img: {
    ...cardProperties,
    backgroundSize: '100% 100%'
  },
  back: {
    backgroundColor: 'red',
    ...cardProperties
  },
  hided: {
    zIndex: '-1'
  }
};

export default withStyles(style)(({classes, data, faceDown}) => {

  const {gameState, dispatch} = getGameState();
  const {id, state, url, loaded } = data;

  return (
    <div className={classes.root} >
      <div className={classes.back}/>
      <img className={classNames({
        [classes.img]: true,
        [classes.hided]: state === CARD_STATE.FACE_DOWN})}
           src={url}
           onLoad={() => dispatch({type: CARD_LOADED, id})}
           alt=""/>
    </div>
  )
})
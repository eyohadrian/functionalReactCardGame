import React, {useEffect, useRef, useState} from 'react';
import {withStyles} from "@material-ui/core";
import classNames from 'classnames';
import {getGameState} from "./context/game-context";
import CARD_STATE from "../constants/card-state";
import {CARD_CLICK, CARD_LOADED} from "./actions";
import GAME_STATE from "../constants/game-state";
import {getGameDispatchContext} from "./index";

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
  hidden: {
    zIndex: '-1'
  }
};

export default withStyles(style)(({classes, id, url, cardState}) => {

  const {"state": gameState, dispatch} = getGameState();
  const isGameRunning = gameState.state === GAME_STATE.RUNNING;
//TODO install reac-card-flip
  return (
    <div
      className={classes.root}
      onClick={
        () => isGameRunning
          ? dispatch({type: CARD_CLICK, id})
          : undefined
      }
    >
      <div className={classes.back}/>
      <img className={classNames({
        [classes.img]: true,
        [classes.hidden]: cardState === CARD_STATE.FACE_DOWN})}
           src={url}
           onLoad={() => dispatch({type: CARD_LOADED, id})}
           alt=""/>
    </div>
  )
})
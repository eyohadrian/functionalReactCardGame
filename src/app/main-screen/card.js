import React, {useEffect, useRef, useState} from 'react';
import {withStyles} from "@material-ui/core";
import classNames from 'classnames';
import {getGameState} from "./context/game-context";
import CARD_STATE from "./card-state";
import {CARD_CLICK, CARD_LOADED} from "./actions";
import GAME_STATE from "./game-state";
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
  hided: {
    zIndex: '-1'
  }
};

export default withStyles(style)(({classes, data, faceDown}) => {

  const [card, setCard] = useState({
    id: data.id,
    url: data.url,
    loaded: false,
    state: CARD_STATE.FACE_DOWN,
    order: data.order
  });
  const {id, url, state} = {...card};
  useEffect(() => {
    console.log("XXX - " + id)
  });

  const dispatch = getGameDispatchContext();
  debugger;
  //const isGameRunning = gameState.state === GAME_STATE.RUNNING;
  //e => isGameRunning ? dispatch({type: CARD_CLICK, id}) : undefined
  // () => dispatch({type: CARD_LOADED, id})
  console.log("Rerendered id: " + id);
  return (
    <div className={classes.root} onClick={() => setCard({...card, state: CARD_STATE.FACE_UP})}>
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
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
    zIndex: '1'
  }
};

export default withStyles(style)(({classes, id, url, loaded, state, order}) => {

  const ref = useRef({id, url, loaded, state});
  const dispatch = getGameDispatchContext();
  const [load, setLoad] = useState({
    shouldLoad: loaded,
    onLoad: () => dispatch({type: CARD_LOADED, id})
  });

  useEffect(() => {
    console.log("XXX - " + id);
    setLoad({...load, onLoad: () => {}});
    console.log("Rerendered id: " + id + " - Loaded : " + loaded);
    console.log(ref)
  }, [loaded]);
  //const isGameRunning = gameState.state === GAME_STATE.RUNNING;
  //e => isGameRunning ? dispatch({type: CARD_CLICK, id}) : undefined
  // () => dispatch({type: CARD_LOADED, id})

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
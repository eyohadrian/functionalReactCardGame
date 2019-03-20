import React from 'react';
import {withStyles} from "@material-ui/core";
import {getGameState} from "./context/game-context";
import CARD_STATE from "../constants/card-state";
import {CARD_CLICK, CARD_LOADED} from "./actions";
import GAME_STATE from "../constants/game-state";
import ReactCardFlip from 'react-card-flip';


const cardProperties = {
  height: '100%',
  width: '100%',
  borderRadius: '10px',
  position: 'absolute',
  top: '0',
  border: 'solid 2px black',
};

const style = {
  root: {
    height: '85%',
    width: '65%',
    alignSelf: 'center',
    justifySelf: 'center',
    position: 'relative',
    '& div': {
      height: '100%',
      width: '100%',
    }
  },

  img: {
    ...cardProperties,
    backgroundSize: '100% 100%'
  },
  back: {
    background: 'linear-gradient(61deg, #98c2cc -40%, #366379 45%)',
    ...cardProperties
  },
  hidden: {
    zIndex: '-1'
  }
};

export default withStyles(style)(({classes, id, url, cardState}) => {

  const {"state": gameState, dispatch} = getGameState();
  const isGameRunning = gameState.state === GAME_STATE.RUNNING;
  const isFaceDown = cardState === CARD_STATE.FACE_DOWN;

  return (
    <div className={classes.root}>
      <ReactCardFlip
        isFlipped={isFaceDown}
        flipDirection="horizontal"
        flipSpeedBackToFront={0.4}
        flipSpeedFrontToBack={0.4}
      >
        <div className={classes.back} key={"back"} onClick={
          () => isGameRunning
            ? dispatch({type: CARD_CLICK, id})
            : undefined}
        />
        <img className={classes.img}
             src={url}
             onLoad={() => dispatch({type: CARD_LOADED, id})}
             alt=""
             key={"front"}
             onClick={
              () => isGameRunning
                ? dispatch({type: CARD_CLICK, id})
                : undefined}
        />
      </ReactCardFlip>
    </div>
  )
})
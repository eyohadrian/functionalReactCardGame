import React, {createContext, useState} from 'react';
import {withStyles} from "@material-ui/core";
import StartScreen from './start-screen';
import MainScreen from './main-screen';
import {getGlobalState} from "../context/global-context";
import EndScreen from './end-screen';
import {STAGE} from "./constants/stage";

const style = {
  root: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    backgroundColor: '#a1cfff',
    height: '320px',
    width: '560px',
    display: 'grid',
    gridTemplateRows: '160px 160px',
    gridTemplateColumns: '240px 80px 240px'
  },
  header: {
    gridColumn: '1 / 4',
    gridRow: '1 / 2',
    justifySelf: 'center',
    alignSelf: 'center',
  },
  buttonAdd: {
    gridColumn: '1 / 2',
    gridRow: '2 / 3',
    justifySelf: 'center',
    alignSelf: 'center',
  },
  buttonSubstract: {
    gridColumn: '3 / 4',
    gridRow: '2 / 3',
    justifySelf: 'center',
    alignSelf: 'center',
  }
};

const StageController = ({stage}) => {
  switch (stage) {
    case STAGE.START: {
      return <StartScreen/>
    }
    case STAGE.GAME: {
      return <MainScreen/>
    }
    case STAGE.SUMMARY: {
      return <EndScreen/>
    }
    default: {
      return (<div>BAD STAGE</div>)
    }
  }
};

export default withStyles(style)(({classes}) => {

  const {globalState} = getGlobalState();
  return (
      <div className={classes.root}>
          <StageController stage={globalState.stage}/>
      </div>
  )
});

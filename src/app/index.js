import React from 'react';
import {withStyles} from "@material-ui/core";
import StartScreen from './start-screen';
import MainScreen from './main-screen';
import {getGlobalState} from "./context/global-context";


const style = {
  root: {
    backgroundColor: '#f0ffe5',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
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



export default withStyles(style)(({classes}) => {

  const {state} = getGlobalState();

  return (
      <div className={classes.root}>
        {false && <StartScreen/>}
        {true && <MainScreen/>}
      </div>
  )
});

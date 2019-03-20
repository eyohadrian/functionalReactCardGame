import {withStyles} from "@material-ui/core";
import Card from "@material-ui/core/es/Card/Card";
import Button from "@material-ui/core/es/Button/Button";
import React from "react";

const style = {
  root: {
    height: '300px',
    width: '600px',
    backgroundColor: '#fefefe',
    boxShadow: '5px 9px 3px 0px rgba(0,0,0,0.2), 11px 9px 1px 0px rgba(0,0,0,0.14), 11px 16px 1px -1px rgba(0,0,0,0.12)',
    display: 'grid',
    gridTemplateColumns: '16% auto 16%',
    gridTemplateRows: '16% auto 16%'
  },
  content: {
    gridColumn: '2/3',
    gridRow: '2/3',
    display: 'grid',
    gridTemplateRows: '32% 32% 32%',
    gridRowGap: '4%'
  },
  title: {
    fontFamily: 'fantasy',
    margin: 0,
    alignSelf: 'center',
    justifySelf: 'center',
    fontSize: '32px',
    fontWeight: '900',
    color: '#2e2c2f',
    textShadow: '2px 2px #6200ff4f'
  },
  button: {
    fontSize: '24px',
    background: 'linear-gradient(to right, #30CFD0 0%, #330867 100%)',
    '&:hover': {
      background: 'linear-gradient(to left, #30CFD0 0%, #330867 100%)',
      color:'white'
    }
  }
};


const Display = withStyles(style)(({classes, title, children, onClick, disabled, btnText}) => {
  return (
    <Card className={classes.root}>
      <div className={classes.content}>
        <h3 className={classes.title}>{title}</h3>
        {children}
        <Button onClick={onClick} disabled={disabled} className={classes.button}>{btnText}</Button>
      </div>
    </Card>
  )
});

Display.defaultProps = {
  disabled: false
};

export default Display;
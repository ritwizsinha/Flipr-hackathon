import React from 'react'
import {AppBar, Toolbar, IconButton, Typography} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

export default class Header extends React.Component {
    render() {
        return (
          <div className>
            <AppBar position="static">
              <Toolbar>
                <IconButton edge="start"  color="inherit" aria-label="menu">
                  <MenuIcon />
                </IconButton>
                <Typography variant="h4" >
                  Coronavirus
                </Typography>
              </Toolbar>
            </AppBar>
          </div>
        );
    }
}
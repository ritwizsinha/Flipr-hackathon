import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Switch,
  Route,
} from "react-router-dom";
import MiniDrawer from './MiniDrawer';
import HospitalBeds from './HospitalBeds';
import Cases from './Cases';
import Helpline from './Helpline';
import GovernmentNotifications from './GovernmentNotifications';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }));

export default function Main() {
    const classes = useStyles();
    return (
            <div className={classes.root}>
                <MiniDrawer />
                <div className={classes.content}>
                    <Switch>
                      <Route path="/reports">
                        <GovernmentNotifications />
                      </Route>
                      <Route path="/bedcount">
                        <HospitalBeds />
                      </Route>
                      <Route path="/helpline">
                        <Helpline />
                      </Route>
                      <Route path="/">
                        <Cases />
                      </Route>
                    </Switch>
                </div>
            </div>
        );
}
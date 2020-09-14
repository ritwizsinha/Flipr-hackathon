import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Paper } from '@material-ui/core';

import {apiEndpoints} from '../helpers/endpoints';

const useStyles = makeStyles(theme => ({
grid : {
    width: '100%',
}, 
paper: {
    padding: theme.spacing(3)
},
}));

export default  function Helpline()  {
    const [stateContacts, stateContactsChange] = useState([]);
    useEffect(() => {
        axios.get(apiEndpoints.CONTACTS).then(res => {
            stateContactsChange(res.data.data.contacts.regional);
        });
    },[]);

    const classes = useStyles();
    const styledList = stateContacts.map(item => {
        return  (
        <Grid item container xs={12} sm={6} md={4}>
            <Paper className={classes.paper}>
                <Typography variant="h5">
                    { item.loc } | {item.number}
                </Typography>
            </Paper>
        </Grid>
        );    
    });
        return(
            <Grid container spacing={2} direction="column" alignItems="center" className={classes.grid}>
                <Grid item xs={12}>
                    <Typography variant="h1">
                        State Helplines
                    </Typography>
                </Grid>
                <Grid container item spacing={2}>
                    {styledList}
                </Grid>
            </Grid>
        );
};
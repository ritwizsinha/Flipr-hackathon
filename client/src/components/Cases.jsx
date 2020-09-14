import React, {useEffect, useState}from 'react';
import {Grid, Card, CardContent, Typography, } from '@material-ui/core';
import { makeStyles} from '@material-ui/core/styles';
import { Line } from 'react-chartjs-2';
import CountUp from 'react-countup';
import { getDeaths } from '../api/getDeaths';
import {convertToMonthlyDeathObject } from '../helpers/convertData';
import logo from '../images/logo.png';
const useStyles = makeStyles({
    center : {
        margin: "0 auto",
    },
    image: {
        width: 370,
        marginTop: 50,
        margin:"0 auto"
    }
  });
export default function Cases() {
    const classes = useStyles();
    const [totalDeaths, totalDeathsChange] = useState([]);
    useEffect(() => {
        const getDeathsFromApi = async () => {
            totalDeathsChange(await getDeaths());
        }
        getDeathsFromApi();
    },[]); 
    const convertedData = convertToMonthlyDeathObject(totalDeaths);
        return (
            <Grid container spacing={2} direction="column">
                <Grid item xs={12} justify="center"     >
                    <img src={logo} className={classes.image}/>
                </Grid>
                <Grid item container spacing={2}>
                    <Grid item xs={0} sm={2} />
                    <Grid item xs = {12} sm={8} component={Card}>
                        <CardContent className = {classes.center}>
                            <Typography color="textSecondary" gutterBottom>Deceased</Typography>
                            <Typography variant="h5">
                                <CountUp start={0} end = { totalDeaths.length} duration={2.5} separator="," />
                            </Typography>
                            <Typography color="textSecondary">Total number of deaths</Typography>
                        </CardContent>    
                    </Grid>
                    <Grid item xs={0} sm={2} />
                </Grid>
                <Grid item xs={12}>
                    {
                        (totalDeaths)?
                        <Line
                        data={{
                            labels: convertedData.map(({date}) => date),
                            datasets: [{
                                label: 'Deceased',
                                data: convertedData.map(({count}) => count),
                                borderColor: '#3333ff',
                                fill: true,
                            }]
                        }} 
                        />
                        :null
                    }
                </Grid>
            </Grid>
        );
}
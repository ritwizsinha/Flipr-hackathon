import React from 'react';
import axios from 'axios';
import {Grid} from '@material-ui/core';


import { apiEndpoints } from '../helpers/endpoints';
import  Header  from './Header';
import MiniDrawer from './MiniDrawer';
export default class Cases extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmedCases: [],
            sampleTested: [],
        }
    }
    async componentDidMount() {
        const confirmedCases = await axios.get(apiEndpoints.CONFIRMED_CASES);
        const sampleTested = await axios.get(apiEndpoints.SAMPLE_TESTED);
        this.setState({
            confirmedCases: confirmedCases.data.data,
            sampleTested: sampleTested.data.data,
        })
    }

    render() {
        console.log(this.state);
        return (
            <Grid container spacing={2}>
                <Grid item container xs={12}>
                    Some text asdfjaldsjfl
                </Grid>
            </Grid>
        );
    }
}
import React from 'react';
import axios from 'axios';

import { apiEndpoints } from '../helpers/endpoints';

export class Cases extends React.Component {
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
            <h1>Hello from cases</h1>
        )
    }
}
import React from 'react'
import axios from 'axios'

import {apiEndpoints} from '../helpers/endpoints';

export class HospitalBeds extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hospitalBeds: [],
            medicalCollegeBeds: [],
        }
    }
    async componentDidMount() {
        const hospitalBeds = await axios.get(apiEndpoints.HOSPITAL_BEDS);
        const medicalCollegeBeds = await axios.get(apiEndpoints.MEDICAL_COLLEGES_BEDS);
        this.setState({
            hospitalBeds: hospitalBeds.data.data.regional,
            medicalCollegeBeds: medicalCollegeBeds.data.data.medicalColleges,
        });
    }
    render() {
        return (
            <h1>Hello from Hospital beds</h1>
        )
    }
}
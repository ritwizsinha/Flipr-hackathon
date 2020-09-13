import React from 'react';
import axios from 'axios';

import {apiEndpoints} from '../helpers/endpoints';
export default class Helpline extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            stateContacts: []
        }
    } 
    componentDidMount(){
        axios.get(apiEndpoints.CONTACTS).then(res => {
            this.setState({
                stateContacts: res.data.data.contacts.regional,
            });
        })
    }
    render() {
        console.log(this.state);
        return(
            <h1>Hello from Helpline</h1>
        );
    };
}
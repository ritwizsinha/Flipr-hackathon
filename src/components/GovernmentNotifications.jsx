import React from 'react';
import axios from 'axios';

import {apiEndpoints} from '../helpers/endpoints'
export class GovernmentNotifications extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notificationList: [],
        }
    }

    async componentDidMount() {
        const notificationApiResponse = await axios.get(apiEndpoints.NOTIFICATIONS);
        this.setState({
            notificationList: notificationApiResponse.data.data.notifications
        });
    }
    render() {
        return (
            <h1>Hello from Government Notifications</h1>
        );
    }
}
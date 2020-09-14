import axios from 'axios';
import { SERVER_URL } from '../helpers/url';

export const getDeaths = async () => {
    const response = await axios.get(`${SERVER_URL}/deaths`);
    return response.data;
}
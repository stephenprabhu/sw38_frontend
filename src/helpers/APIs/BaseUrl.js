import axios from 'axios';

const BaseUrl = axios.create({
    baseURL: 'https://bo.svw38.com/api'
});

export default BaseUrl

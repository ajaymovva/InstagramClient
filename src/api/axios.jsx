import axios from 'axios';
import  { BASE_URL } from './config';

const instaApi = axios.create({
    baseURL: BASE_URL,
});

const imageUploadApi = axios.create({});

export const CATCH_ERROR = (error) => {
    console.log('ERROR OCCURED ::', error);
}

export const setAuthorizationToken = () => {
    const token = "Bearer " + JSON.parse(sessionStorage.getItem('jwt'));
    instaApi.defaults.headers.common.authorization = token;
}

const api = {
    get: (url, auth) => {
        if(auth){
            setAuthorizationToken();
        }
        return instaApi.get(url).catch(CATCH_ERROR);
    },
    post: (url, data, auth) => {
        if(auth){
            setAuthorizationToken();
        }
        return instaApi.post(url, data).catch(CATCH_ERROR);
    },
}

export const imageApi = {
    get: (url) => {
        return imageUploadApi.get(url).catch(CATCH_ERROR);
    },
    post: (url, data) => {
        return imageUploadApi.post(url, data).catch(CATCH_ERROR);
    },
}

export default api;
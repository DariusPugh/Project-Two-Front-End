import axios from 'axios';

const PROXY = 'https://owdw8b3ri4.execute-api.us-east-2.amazonaws.com/dev';

export function getData(url:string) {
    return axios.get(PROXY + url, {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    });
}

export function postData(url:string, data:any) {
    return axios.post(PROXY + url, data, {
        headers: {
            Authorization: localStorage.getItem('token')
        },
    });
}

export function delData(url:string) {
    return axios.delete(PROXY + url, {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    });
}

export function delBody(url:string, body:any) {
    return axios.delete(PROXY + url, {
        data: body,
        headers: {
            Authorization: localStorage.getItem('token')
        }
    });
}

export function putData(url:string, data:any) {
    return axios.put(PROXY + url, data, {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    });
}

export function patchData(url:string, data:any) {
    return axios.patch(PROXY + url, data, {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    });
}
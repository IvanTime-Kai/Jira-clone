import axios from 'axios';
import { DOMAIN, TOKEN } from '../utils/SettingSystem/SettingSystem'

class BaseServices {
    get = (url, data) => {
        return axios({
            url : `${DOMAIN}/${url}`,
            method : 'GET',
            headers : { 'Authorization' : 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    }
    post = (url, data) => {
        return axios({
            url : `${DOMAIN}/${url}`,
            method: 'POST',
            data,
            headers : { 'Authorization' : 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    }
    delete = (url) => {
        return axios({
            url : `${DOMAIN}/${url}`,
            method : 'DELETE',
            headers : {'Authorization' : 'Bearer ' + localStorage.getItem(TOKEN)}
        })
    }
    put = (url, data) => {
        return axios({
            url : `${DOMAIN}/${url}`,
            method : 'PUT',
            data,
            headers : {'Authorization' : 'Bearer ' + localStorage.getItem(TOKEN)}
        })
    }
}

export default BaseServices
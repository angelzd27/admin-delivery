import axios from 'axios'
import { getJWT } from './jwt'

const url_services = 'http://localhost/api-delivery/controllers'

const headers = {
    'Content-Type': 'application/json',
    simpleauthpts: 'f9008bbc21129902e16e229994658240',
    authorization: getJWT()
}

export const BD_ACTION_GET = async (model, action) => {
    const params = '?opcion=' + action
    const url = url_services + '/' + model + '/' + '_api.php' + params

    const data = await axios.get(url, { headers })
    
    return data.data
}

export const BD_ACTION_POST = async (model, action, body) => {
    const params = '?opcion=' + action
    const url = url_services + '/' + model + '/' + '_api.php' + params
    const data = await axios.post(url, body, { headers })

    return data.data
}

export const BD_ACTION_PUT = async (model, action, body) => {
    const params = '?opcion=' + action
    const url = url_services + '/' + model + '/' + '_api.php' + params
    const data = await axios.put(url, body, { headers })

    return data.data
}

export const BD_ACTION_DELETE = async (model, action, body) => {
    const params = '?opcion=' + action
    const url = url_services + '/' + model + '/' + '_api.php' + params
    const data = await axios.delete(url, body, { headers })

    return data.data
}
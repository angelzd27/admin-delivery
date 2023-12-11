import axios from 'axios'
import { io } from 'socket.io-client'
import { getJWT } from './jwt'

// Localhost
const server = '127.0.0.1'

// Rober's Server
// const server = '172.16.1.79'

//Api key fastforex(api de divisas) tiene prueba gratuita 
//de 6 dias actualizar para que vuelva a funcionar
const api_key = '4478a047b6-26e6d929f6-s5gois';

const url_services = `http://${server}/api-delivery/controllers`
const headers = {
    'Content-Type': 'application/json',
    simpleauthpts: 'f9008bbc21129902e16e229994658240',
    authorization: getJWT()
}

export const BD_ACTION_GET = async (model, action, body) => {
    const url = `${url_services}/${model}/_api.php?opcion=${action}&params=${encodeURIComponent(JSON.stringify(body))}`
    const data = await axios.get(url, body, { headers: headers })

    return data.data
}

export const BD_ACTION_POST = async (model, action, body) => {
    const url = `${url_services}/${model}/_api.php?opcion=${action}&params=${encodeURIComponent(JSON.stringify(body))}`
    const data = await axios.post(url, body, { headers: headers })

    return data.data
}

export const BD_ACTION_PUT = async (model, action, body) => {
    const url = `${url_services}/${model}/_api.php?opcion=${action}&params=${encodeURIComponent(JSON.stringify(body))}`
    const data = await axios.put(url, body, { headers: headers })

    return data.data
}

export const BD_ACTION_DELETE = async (model, action, body) => {
    const url = `${url_services}/${model}/_api.php?opcion=${action}&params=${encodeURIComponent(JSON.stringify(body))}`
    const data = await axios.delete(url, { headers: headers, data: body })

    return data.data
}

export const data_chart = async (chart_type, chart_library) => {
    const url = `http://${server}:4003/charts/${chart_type}`
    const data = await axios.get(url)

    return data.data[chart_library]
}

export const divisa = async () =>{
    try{
    const url = `https://api.fastforex.io/fetch-multi?from=USD&to=MXN&api_key=${api_key}`
    const data = await axios.get(url)
    console.log('The request to the API has been made successfully', '\nUpdated: ', data.data.updated, ' \ndollar value: ', data.data.results.MXN )

    return data.data

    }catch(error){
        console.error('Error fetching exchange rate:', error);
    }
}
  
  

export const socket = io(`http://${server}:4003`)
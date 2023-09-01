import axios from 'axios'

const services = 'http://localhost:4003'

export const data_chart = async (chart_type, chart_library) => {
    const url = `${services}/charts/${chart_type}`
    const data = await axios.get(url)

    return data.data[chart_library]
}
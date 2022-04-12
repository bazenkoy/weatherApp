import axios from 'axios'

export const apiUrl = 'https://corsp-roxy.vercel.app/'
export const imagesUrl = 'https://www.metaweather.com/static/img/weather'

class Api {
  getLocation = async (latt: number, long: number) => {
    const { data } = await axios.request({
      method: 'get',
      url: `${apiUrl}location/search/?lattlong=${latt},${long}`
    })

    return data
  }

  getTodaysWeather = async (woeid: number) => {
    const { data } = await axios.request({
      method: 'get',
      url: `${apiUrl}location/${woeid}`
    })

    return data
  }

  getWeatherForSpecificDay = async (woeid: number, date: string) => {
    const { data } = await axios.request({
      method: 'get',
      url: `${apiUrl}location/search/${woeid}/${date}`
    })

    return data
  }

  getCitiesList = async (location: string) => {
    const data = await axios.get(`${apiUrl}location/search/?query=${location}`)
    return data
  }
}

export default new Api()

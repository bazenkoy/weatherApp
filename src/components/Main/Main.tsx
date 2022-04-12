import Card from '../Card'
import './style.css'
import { useWeatherContext } from 'utils/WeatherContext'
import { imagesUrl } from 'services/API/api'
import Loader from 'components/Loader'

interface IWeather {
  'air_pressure': number;
  'applicable_date': string;
  humidity: number;
  id: number;
  'max_temp': number;
  'min_temp': number;
  predictability: number;
  'the_temp': number;
  visibility: number;
  'weather_state_abbr': string;
  'weather_state_name': string;
  'wind_direction': number;
  'wind_direction_compass': string;
  'wind_speed': number;
}

const Main = () => {
  const {
    weather: { consolidated_weather: weather }
  } = useWeatherContext()
  const today = weather && weather[0]

  console.log(weather)

  return (
    <div className="main">
      <div className="bg">
        <div className="move1"></div>
        <div className="move2"></div>
      </div>
      {!weather && !today
        ? (
        <Loader />
          )
        : (
        <>
          <div className="main-card-wrapper">
            {weather.map((el: IWeather) => (
              <Card size="small" key={el.id}>
                <p>{el.applicable_date}</p>
                <img
                  src={`${imagesUrl}/${el.weather_state_abbr}.svg`}
                  style={{ width: '50px' }}
                />
                <p>{Math.round(el.the_temp)}°C</p>
              </Card>
            ))}
          </div>
          <p className="main-title">Today’s Hightlights</p>

          <div className="main-indicators-wrapper">
            <Card size="large">
              <p>Wind status</p>
              <p className="card-higlights">
                <span>{Math.round(today.wind_speed)}</span>mph
              </p>
            </Card>
            <Card size="large">
              <p>Humidity</p>
              <p className="card-higlights">
                <span>{today.humidity}</span>%
              </p>
            </Card>
            <Card size="large">
              <p>Visibility</p>
              <p className="card-higlights">
                <span>{Math.round(today.visibility)} </span>miles
              </p>
            </Card>
            <Card size="large">
              <p>Air Pressure</p>
              <p className="card-higlights">
                <span>{today.air_pressure} </span>mb
              </p>
            </Card>
          </div>
        </>
          )}
    </div>
  )
}

export default Main

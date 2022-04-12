import { useState, Dispatch, SetStateAction } from 'react'
import Button from '../Button'
import { GoLocation } from 'react-icons/go'
import { WiCelsius } from 'react-icons/wi'
import { IconContext } from 'react-icons'
import { MdClose } from 'react-icons/md'
import { useWeatherContext } from 'utils/WeatherContext'
import { imagesUrl } from 'services/API/api'
import './style.css'
import Loader from 'components/Loader'
import Search from 'components/Search'

type Props = {
  setPostion: Dispatch<SetStateAction<{latt: number; long: number}>>;
};

const NavBar = ({ setPostion }: Props) => {
  const date = new Date()
  const [searchMode, setSearchMode] = useState(false)
  const {
    weather: { consolidated_weather: weather, title }
  } = useWeatherContext()
  const today = weather && weather[0]

  const handleClose = (open: boolean) => {
    setSearchMode(open)
  }

  return (
    <div className="navbar-wrapper">
      {!today
        ? (
        <Loader />
          )
        : !searchMode
            ? (
        <div className="navbar-default-view">
          <div className="navbar-button">
            <Button variant="secondary" onClick={() => setSearchMode(true)}>
              Seach for places
            </Button>
          </div>
          <img
            src={`${imagesUrl}/${today.weather_state_abbr}.svg`}
            className="navbar-icon"
            alt="weather"
          />
          <div className="navbar-temperature">
            <p>{Math.round(today.the_temp)}</p>
            <IconContext.Provider value={{ size: '100px' }}>
              <WiCelsius />
            </IconContext.Provider>
          </div>
          <p className="navbar-weatherState">{today.weather_state_name}</p>
          <div className="navbar-date">
            <p>Today • {date.toDateString()}</p>
            <p className="navbar-location">
              <GoLocation />
              {title}
            </p>
          </div>
        </div>
              )
            : (
        <Search setPostion={setPostion} setSearchMode={handleClose} />
              )}
    </div>
  )
}

export default NavBar

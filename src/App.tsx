import NavBar from './components/NavBar'
import Main from './components/Main/Main'
import LocationContextProvider from 'utils/LocationContext'
import WeatherContextProvider, { useWeatherContext } from 'utils/WeatherContext'
import { useEffect, useState } from 'react'

function App () {
  const [position, setPosition] = useState({ latt: 0, long: 0 })

  function success (pos: any) {
    const {
      coords: { latitude, longitude }
    } = pos

    setPosition({ latt: latitude, long: longitude })
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success)
  }, [])

  return (
    <LocationContextProvider latt={position.latt} long={position.long}>
      <WeatherContextProvider>
        <div className="wrapper">
          <NavBar setPostion={setPosition}/>
          <Main />
        </div>
      </WeatherContextProvider>
    </LocationContextProvider>
  )
}

export default App

import {
  useContext,
  useEffect,
  useState,
  createContext,
  ReactNode
} from 'react'
import { API } from 'services/API'
import { useLocationContext } from 'utils/LocationContext'

type ContextProps = {
  weather: any;
};

export const WeatherContext = createContext<ContextProps>({
  weather: {}
})

type Props = {
  children: ReactNode;
};

const WeatherContextProvider = ({ children }: Props) => {
  const [data, setData] = useState({})
  const { woeid } = useLocationContext()

  useEffect(() => {
    API.getTodaysWeather(woeid || 44418)
      .then(data => setData(data))
  }, [woeid])

  return (
    <WeatherContext.Provider value={{ weather: data }}>
      {children}
    </WeatherContext.Provider>
  )
}

export default WeatherContextProvider

export const useWeatherContext = () => useContext(WeatherContext)

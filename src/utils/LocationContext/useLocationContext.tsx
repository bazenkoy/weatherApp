import {
  useContext,
  useEffect,
  useState,
  createContext,
  ReactNode
} from 'react'
import { API } from 'services/API'

type ContextProps = {
  woeid: number | null;
};

export const LocationContext = createContext<ContextProps>({
  woeid: null
})

type Props = {
  children: ReactNode;
  latt: number;
  long: number;
};

const LocationContextProvider = ({ children, latt, long }: Props) => {
  const [woeid, setWoeid] = useState(null)

  useEffect(() => {
    API.getLocation(latt, long)
      .then(data => setWoeid(data[0]?.woeid))
  }, [latt, long])

  return (
    <LocationContext.Provider value={{ woeid }}>
      {children}
    </LocationContext.Provider>
  )
}

export default LocationContextProvider

export const useLocationContext = () => useContext(LocationContext)

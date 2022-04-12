import { useState, ChangeEvent, Dispatch, SetStateAction } from 'react'
import Button from 'components/Button'
import { IconContext } from 'react-icons'
import { MdClose } from 'react-icons/md'

import './style.css'
import EmptySearch from 'components/EmptySearch/EmptySearch'
import Loader from 'components/Loader'
import { API } from 'services/API'

interface ICity {
  latt_long: string;
  location_type: string;
  title: string;
  woeid: number;
}

type Props = {
  setPostion: Dispatch<SetStateAction<{latt: number; long: number}>>;
  setSearchMode: (open: boolean) => void;
};

const Search = ({ setPostion, setSearchMode }: Props) => {
  const [cities, setCities] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [value, setValue] = useState('')

  const fetchData = async (location: string) => {
    try {
      setLoading(true)
      setError(null)
      const data = await API.getCitiesList(location)
      setLoading(false)
      return data.data
    } catch (error: any) {
      setError(error)
    }
    return null
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleSubmit = async () => {
    setCities(await fetchData(value))
  }

  const setCity = (el: ICity) => {
    const latlong = el.latt_long.split(',')
    setSearchMode(false)
    setPostion({ latt: +latlong[0], long: +latlong[1] })
  }

  console.log(cities)

  return (
    <div className="search-wrapper">
      <IconContext.Provider
        value={{ size: '40px', className: 'navbar-close-icon' }}
      >
        <MdClose onClick={() => setSearchMode(false)} />
      </IconContext.Provider>
      <div className="search-input-wrapper">
        <input
          value={value}
          onChange={onChange}
          placeholder="search location"
          className="search-input"
        />
        <Button variant="primary" onClick={handleSubmit} disabled={!value}>
          Search
        </Button>
      </div>
      {loading
        ? (
        <Loader />
          )
        : cities.length > 0
          ? (
        <div className='cities-list'>
          {cities.map((el: ICity) => (
            <div
              key={el.title}
              onClick={() => setCity(el)}
              className="cities-list-item"
            >
              {el.title}
            </div>
          ))}
        </div>
            )
          : (
        <EmptySearch />
            )}
    </div>
  )
}

export default Search

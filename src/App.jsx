import { useEffect, useState } from 'react';
import './App.css'
import axios from 'axios';
import WeatherCard from './components/WeatherCard';

function App() {

  const [coord, setCoord] = useState()
  const [weather, setWeather] = useState()
  const [temp, setTemp] = useState()
  const [isLoading, setIsLoading] = useState(true)


const success = position =>{

const obj = {
  lat: position.coords.latitude,
  lon: position.coords.longitude
}
setCoord(obj)
}

useEffect(() => {
  setIsLoading(true)
  navigator.geolocation.getCurrentPosition(success)

  },[])
  
  useEffect(() =>{
    if(coord){
    const APIKEY = '13fec5377e627faa2f978cafeaf73611';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coord?.lat}&lon=${coord?.lon}&appid=${APIKEY}`
 axios.get(url)
      .then(res => {
        const celsius = (res.data.main.temp  - 273.15).toFixed(1)
        const fahrenheit = (celsius * 9/4 + 32).toFixed(1)
        setTemp({celsius, fahrenheit})
        setWeather(res.data)})
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  }
  }, [coord])


  return (
    <div className='app'>
      {
        isLoading
        ?<h2 className='app_loader'>Now Loading</h2>
        :(
      <WeatherCard 
      weather={weather}
      temp={temp}
      />
        )
        
      } 
    </div>
  )
}

export default App
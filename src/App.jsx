import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import './App.css'
import Loading from './components/Loading'
import WeatherCard from './components/WeatherCard'

function App() {

  const [coords, setCoords] = useState()
  const [weather,setWeather] = useState()
  const [temperature,setTemperature] = useState()
  

  useEffect(() => {
    //Esta es la funcion que se ejecuta cuando llega la informacion de nuestra ubicacion
  const success = pos => {
    const obj = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
    }
    setCoords(obj);
  }
  navigator.geolocation.getCurrentPosition(success);
  }, [])

  //---------------Peticion del clima------------//

  useEffect(() => {
    if(coords){//en el primer renderizado como todavia no llega la info de los coords(asicronico), solo se hace cuando coords tenga info.
    const APIKEY = '5b0226ba0b129207146b4a7bc2d4d83a'
    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIKEY}`
    axios.get(URL)
      .then(res => {
        const celsius = (res.data.main.temp -273.15).toFixed(1)
        const farenheit = ((celsius*(9/5)) +32).toFixed(1)
        setTemperature({celsius,farenheit})
        setWeather(res.data)
      })
      .catch(err => console.log(err))
    }
  }, [coords])
  

  return (
    <div className="App">
      <video src="https://static.videezy.com/system/resources/previews/000/046/837/original/ocean-animation.mp4" autoplay="true" muted="true" loop="true"></video>
      {
        weather ?
        <WeatherCard weather={weather} temperature={temperature} />
        :
        <Loading />    
      }
    </div>
  )
}

export default App

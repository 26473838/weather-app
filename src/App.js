import axios from 'axios';
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './App.css';
import { w01, w02, w03, w04, w09, w10, w11, w13, w50 } from './images';

function App() {
  const [icon, setIcon] = useState()
  const [city, setCity] = useState("");
  const[weather, setWeather] = useState({cityName: "", temp:"", temp_max:"", temp_min:"", mainDescription: "", description: ""});
  function handleChange(event) {
    setCity(event.target.value);
  }
  async function handleSubmit(event) {
    event.preventDefault();
    const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e862cabd76c5dc70c786fc82e1ef11c0&units=metric`);
    const tempWeather = res.data;
    const mainWeather = tempWeather.weather[0];
    const icon1 = mainWeather.icon.substring(0,2);

    let curentWeather = {
      cityName: tempWeather.name,
      temp: tempWeather.main.temp,
      temp_max:tempWeather.main.temp_max,
      temp_min:tempWeather.main.temp_min,
      mainDescription: tempWeather.weather[0].main,
      description: tempWeather.weather[0].description,
    };

    setWeather({...weather, ...curentWeather});

    switch (icon1) {
      case '01': {
        setIcon(w01);
        break;
      }
      case '02': {
        setIcon(w02);
        break;
      }
      case '03': {
        setIcon(w03);
        break;
      }
      case '04': {
        setIcon(w04);
        break;
      }
      case '09': {
        setIcon(w09);
        break;
      }
      case '10': {
        setIcon(w10);
        break;
      }
      case '11': {
        setIcon(w11);
        break;
      }
      case '13': {
        setIcon(w13);
        break;
      }
      case '50': {
        setIcon(w50);
        break;
      }
      default: {
        setIcon(w01);
      }
    }
  }
  
  return (
    <div className="app">

        <form onSubmit={handleSubmit} className='search-container'>
          <input type="text" className='search-bar' value={city} onChange={handleChange} placeholder='Enter your city' />
          <button type='submit' onClick={handleSubmit} className='search-botton'><FiSearch /></button>
        </form>
      <div className='weather-container'>
          <div className='city'><h3 className={`city-name ${!weather.cityName && 'skeleten'}`}>{weather.cityName}</h3><p className={`description ${!weather.cityName && 'skeleten'}`}>{weather.description.toUpperCase()}</p></div>
          <div className={`weather-icon-container ${!weather.cityName && 'skeleten'}`}>
            <img src={icon} className='weather-icon' alt=''/>
            <div>{weather.mainDescription}</div>
          </div>
          <div className='weather-details'>
              <div className='min-weather'>
                <span className={`${!weather.cityName && 'skeleten'}`}>{weather.temp_min}°C</span>
                <span>Min</span>
              </div>
              <div className='avg-weather'>
                <span className={`${!weather.cityName && 'skeleten'}`}>{weather.temp}°C</span>
                <span>Temperature</span>
              </div>
              <div className='max-weather'>
                <span className={`${!weather.cityName && 'skeleten'}`}>{weather.temp_max}°C</span>
                <span>Max</span>
              </div>
          </div>
      </div>
    </div>
  );
}

export default App;

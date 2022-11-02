import { useState } from "react";
import './App.css';

function App() {
  const [value, setValue] = useState('');
  const [weather, setWeather] = useState([]);

  const onSubmit = (e) => {
    e.preventDefault();

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=75bc717d7d7b2c9d9a1373420a8125b3`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setValue('');
      });
  }

  const changeHandler = (e) => {
    setValue(e.target.value);
  }

  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();

  today = dd + '/' + mm + '/' + yyyy;
  console.log(weather);

  return (
    <div className="App">
      <main>
        <div className="search__box">
          <form id="time" onSubmit={onSubmit} >
            <input
              className="search__bar"
              type="text"
              name="name"
              placeholder="Search"
              value={value}
              onChange={changeHandler} />
            <button>Go</button>
          </form>
        </div>
        {typeof weather.main != 'undefined' ?
          <>
            <div className="location__box">
              <div className="location">{weather.name}</div>
              <div className="date">{today}</div>
            </div>

            <div className="weather__box">
              <div className="temp">{(Number(weather.main.temp) - 273.15).toFixed(0)}°C</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div></> : ''}
      </main>
    </div>
  );
}

export default App;

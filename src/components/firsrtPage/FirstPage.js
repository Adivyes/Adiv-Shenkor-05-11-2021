import ReactDOM from 'react-dom'
import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from "react-redux";
//actions
import { fetchFiveDays } from "../../actions/fetchFiveDays";

import { fetchWeather } from "../../actions/fetchWeather";

import { fetchCity } from "../../actions/fetchCity"; 


function FirstPage() {

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const [city, setCity] = useState("");

  const [cityKey, setCityKey] = useState("")

  const [fiveDays, setFiveDays] = useState([])

  const dataSelector = useSelector((state) => state);

  const dispatch = useDispatch();

  const getFiveDaysInfoAction = (cityKey) => dispatch(fetchFiveDays(cityKey))

  const getWeatherInfoAction = (cityKey) => dispatch(fetchWeather(cityKey))

  const getCityInfoAction = (city) => dispatch(fetchCity(city))

  const fiveDaysHandler = (date) =>{
    const date1 = new Date(date)
    const bla = date1.getDay()
   
  return days[bla];
  }


  const dateBuilder = (d) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }


   function submitRequest (evt){
    evt.preventDefault();
    getCityInfoAction(city)
    setCityKey(dataSelector.cityInfo?.Key)
    console.log(dataSelector.cityInfo);

}

    function updateWeatherInfo(){
    getFiveDaysInfoAction(cityKey)
    getWeatherInfoAction(cityKey)
    console.log(dataSelector.weatherInfo);
    console.log(dataSelector.fiveDaysInfo);
    // console.log(dataSelector.fiveDaysInfo.Temperature.Minimum.Value);
    setFiveDays(dataSelector.fiveDaysInfo)
}


useEffect(() => {
    if(cityKey){
        console.log(cityKey);
    updateWeatherInfo();
}
}, [cityKey])


  return (cityKey?
   
  
      <div className="app">
      <main>
      <div className="search-box">
      <form action="#" onSubmit={submitRequest}>
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
          onChange={e => setCity(e.target.value)}
          value={city}
          />
          </form>
        </div> 

    
     <div className="location-box">
            <div className="location">{dataSelector.cityInfo?.EnglishName}, {dataSelector.cityInfo?.Country.EnglishName}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
     
     <div className="weather-box">
            <div className="temp">
            {dataSelector.weatherInfo?.Temperature.Metric.Value}°c
            </div>
            <div className="tempIcon">
            
            <img src={`../images/${dataSelector.weatherInfo?.WeatherIcon}.svg`}></img>
            </div>
            <div className="weather">{dataSelector.weatherInfo?.WeatherText}</div>

          <div className="fiveDaysForecast">
                {fiveDays>0? fiveDays.map((day, index)=>(
                <div className = "oneDayForecast" key={index}>
                <h2>{fiveDaysHandler(day.Date)}</h2>
                <img src={`../images/${dataSelector.weatherInfo?.WeatherIcon}.svg`}></img>
                <h3>MAX: {day.Temperature.Maximum.Value} MIN: {day.Temperature.Minimum.Value}</h3>
                 </div>
                )): days.map((day, index)=>(
                    <div className = "oneDayForecast" key={index}>
       <h2>{day}</h2>
       <img src="images/4.svg" alt="WeatherText"/>
       <h3>MAX: 30°c MIN: 15°c</h3>
   </div>
                ))}
                </div>
          </div>
      
      </main>
      </div>
:

<div className="app">
<main>
<div className="search-box">
<form action="#" onSubmit={submitRequest}>
    <input 
      type="text"
      className="search-bar"
      placeholder="Search..."
    onChange={e => setCity(e.target.value)}
    value={city}
    />
    </form>
  </div> 


<div className="location-box">
      <div className="location">City Name</div>
      <div className="date">{dateBuilder(new Date())}</div>
    </div>

<div className="weather-box">
      <div className="temp">
       15°c
      </div>
      <div className="tempIcon">
      <img src="images/4.svg" alt="WeatherText"/>
            </div>
<div className="weather">Weather condition</div>

<div className="fiveDaysForecast">
    
   <div className = "oneDayForecast">
       <h2>Sunday</h2>
       <img src="images/4.svg" alt="WeatherText"/>
       <h3>MAX: 30°c MIN: 15°c</h3>
   </div>
   <div className = "oneDayForecast">
       <h2>Monday</h2>
       <img src="images/4.svg" alt="WeatherText"/>
       <h3>MAX: 30°c MIN: 15°c</h3>
   </div>
   <div className = "oneDayForecast">
       <h2>Tuesday</h2>
       <img src="images/4.svg" alt="WeatherText"/>
       <h3>MAX: 30°c MIN: 15°c</h3>
   </div>
   <div className = "oneDayForecast">
       <h2>Wednesday</h2>
       <img src="images/4.svg" alt="WeatherText"/>
       <h3>MAX: 30°c MIN: 15°c</h3>
   </div>
   <div className = "oneDayForecast">
       <h2>Thursday</h2>
       <img src="images/4.svg" alt="WeatherText"/>
       <h3>MAX: 30°c MIN: 15°c</h3>
   </div>
  
   
    </div>
    </div>

</main>
</div>
    )
}

export default FirstPage

//   const getWeatherInfo = evt => {
//     evt.preventDefault();
//     if(city === ""){
//       console.log("no city to search for");
//     }
//     else{
//       console.log(city);
//      getWeatherInfoAction(key);
//       getCityInfoAction(city)
//       getWeatherInfoAction(dataSelector.cityInfo?.Key)
      
//       setCityKey(dataSelector.cityInfo?.Key);
//       console.log(dataSelector.cityInfo);
//        console.log(dataSelector.weatherInfo);
      
//     }
//   }

 // if (!cityData || cityData.Key === 0){
    //     console.log("error");
    //     setError("No location found");

    //     return;
    // }
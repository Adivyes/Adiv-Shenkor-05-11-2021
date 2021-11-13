import ReactDOM from 'react-dom'
import React, { useState, useEffect } from 'react';

import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";


import { fetchFiveDays } from "../../actions/fetchFiveDays";
import { fetchWeather } from "../../actions/fetchWeather";
import { fetchCity } from "../../actions/fetchCity";


export default function WeatherPage() {

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const [city, setCity] = useState("");
    const [localStorData, setLocalStorData] = useState([])
    const [list, updateList] = useState([]);
    const navigate = useNavigate();
    const dataSelector = useSelector((state) => state);

    const dispatch = useDispatch();
    const getFiveDaysInfoAction = (cityKey) => dispatch(fetchFiveDays(cityKey))
    const getWeatherInfoAction = (cityKey) => dispatch(fetchWeather(cityKey))
    const getCityInfoAction = (city) => dispatch(fetchCity(city))

    const fiveDaysHandler = (date) => {
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

    const submitRequest = (evt) => {
        evt.preventDefault();
        getCityInfoAction(city)
        // console.log(dataSelector.cityInfo);

    }

    const updateWeatherInfo = () => {
        getFiveDaysInfoAction(dataSelector.cityInfo?.Key)
        getWeatherInfoAction(dataSelector.cityInfo?.Key)
                
    }

    const goToFavoritePage = () =>  {
        if (list.length == 0 && localStorData.length != 0 && localStorData.length > list.length) {
            localStorage.setItem("favorCities", JSON.stringify(localStorData))  
        }else if(list.length > 0){
            localStorage.setItem("favorCities", JSON.stringify(list)) 
        }
        navigate('favoritesPage', { state: { data:list }})
    }
        
    const favoriteCitiesHandler = () => {
        
        const newFavoriteCity = {
            cityName: dataSelector.cityInfo?.EnglishName, 
            temperature: dataSelector.weatherInfo?.Temperature.Metric.Value, 
            weatherCond: dataSelector.weatherInfo?.WeatherText 
        }

        //add one more condition to this function to decline same city name 
        updateList((oldState) => [...oldState, newFavoriteCity]);
        
        for (let i = 0; i < list.length; i++) {
            if(list[i].cityName === dataSelector.cityInfo?.EnglishName){
                list.splice(i, 1);
               
            }
        }
        if (list.length >= 5) {
            list.shift();
           
        }  
        localStorage.setItem("favorCities", JSON.stringify(list)) 
    }

    useEffect(() => {
        const dataInLocalStorage = localStorage.getItem("favorCities");
        setLocalStorData(JSON.parse(dataInLocalStorage));

        if (dataSelector.cityInfo?.Key) {
            updateWeatherInfo();
        }
    }, [dataSelector.cityInfo?.Key])

    


    return (dataSelector.cityInfo?.Key ?

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
                <div className="favoriteBtnsContainer">
                        <div className="singlFavoriteBtn" onClick={goToFavoritePage}>Go to favorite</div>
                        <div className="singlFavoriteBtn" onClick={favoriteCitiesHandler}>save to favorite</div>
                    </div>

                
                <div className="location-box">
                    <div className="location">{dataSelector.cityInfo?.EnglishName}, {dataSelector.cityInfo?.Country.EnglishName}</div>
                    <div className="date">{dateBuilder(new Date())}</div>
                </div>

                <div className="weather-box">
                    <div className="temp">{dataSelector.weatherInfo?.Temperature.Metric.Value}°c</div>

                    <div className="tempIcon">
                        <img src={`../images/${dataSelector.weatherInfo?.WeatherIcon}.svg`}></img>
                    </div>

                    <div className="weather">{dataSelector.weatherInfo?.WeatherText}</div>

                    <div className="fiveDaysForecast">
                        {dataSelector.fiveDaysInfo?.length > 0 ? dataSelector.fiveDaysInfo.map((day, index) => (
                            <div className="oneDayForecast" key={index}>
                                <h2>{fiveDaysHandler(day.Date)}</h2>
                                <img src={`../images/${dataSelector.fiveDaysInfo[index].Day.Icon}.svg`}></img>
                                <h3>MAX: {day.Temperature.Maximum.Value}°c MIN: {day.Temperature.Minimum.Value}°c</h3>
                            </div>
                        )) : days.map((day, index) => (
                            <div className="oneDayForecast" key={index}>
                                <h2>{day}</h2>
                                <img src="images/4.svg" alt="WeatherText" />
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

            </main>
        </div>
    )
}



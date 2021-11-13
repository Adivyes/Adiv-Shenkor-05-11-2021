import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";


export default function FavoritesPage() {
    
    // const [isArrayEmpty, setIsArrayEmpty] = useState(true)
    
    const navigate = useNavigate();
    // const citiesArry = useLocation();
    const [citiesToShow, setCitiesToShow] = useState([])
    
    const goToWeatherPage = () => {
        navigate("/");
    }
    
    const favorCitesToDisplay = () => {
       const dataInLocalStorage = localStorage.getItem("favorCities")
       console.log(JSON.parse(dataInLocalStorage));
       setCitiesToShow(JSON.parse(dataInLocalStorage))
    }

    

useEffect( () => {
    favorCitesToDisplay()
}, [])
console.log(citiesToShow);
    return (!citiesToShow.length === 0?

        <div className="app">
        <main>
           

                <div className="favoriteBtnsContainer">
                    <div className="singlFavoriteBtn" onClick={goToWeatherPage}>Weather</div>
                </div>

            <div className="weather-box">
                <div className="fiveFavoriteCities">
                    {citiesToShow.map((city, index) => (
                        <div className="oneFavoriteCity" key={index}>
                        <h2>{city.cityName}</h2>
                        <h2>{city.temperature}°c</h2>
                        <h3>{city.weatherCond}</h3>
                    </div>
                    ))}

                </div>
            </div>

        </main>
    </div>
    :
    <div className="app">
    <main>
       

            <div className="favoriteBtnsContainer">
                <div className="singlFavoriteBtn" onClick={goToWeatherPage}>Weather</div>
            </div>

        <div className="weather-box">
            <div className="fiveFavoriteCites">
               <h1>Select favorite cities to display</h1>
            </div>
        </div>

    </main>
</div>

    )
}

 


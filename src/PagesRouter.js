import React from 'react'
import { Route, BrowserRouter as Router, Routes} from "react-router-dom"
import WeatherPage from './components/weatherPage/WeatherPage';
import FavoritesPage from './components/favoritesPage/FavoritesPage';

export default function PagesRouter() {
    return (
        <Router>
        <div>
            <Routes>
                <Route exact path = "/" element={<WeatherPage/>}/>
                <Route path="/favoritesPage" element={<FavoritesPage/>}/>
            </Routes>
            
        </div>
        </Router>
    )
}


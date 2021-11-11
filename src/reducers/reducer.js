import {combineReducers} from "redux";
// import { cityInfo } from "./cityReducer";
// import { weatherInfo } from "./weatherReducer";
import { ListReducers } from "./allReducers";


//a function that supposed to combine the reducers
const reducers = combineReducers({
    dataFromListReducer: ListReducers
    // weatherInfo: weatherInfo,
    // cityInfo: cityInfo,
    
});

export default reducers;
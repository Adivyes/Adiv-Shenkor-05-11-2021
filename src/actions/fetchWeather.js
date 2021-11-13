


const apiKey = "EkhRH8zK5AMGaA7d5hS2at00T2igAOwW";

const getWeatherData = async (id) => {
    const cityApi = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const queryForWeather = `${id}?apikey=${apiKey}`;
    const response = await fetch (cityApi + queryForWeather)
    const data = await response.json();
    return data[0];
}




export function fetchWeather(dataKey){

    return async function(dispatch){
       await getWeatherData(dataKey)
        .then(data => { return data;})
        .then(jsonRes => {
          
            dispatch({type: "FETCH_WEATHER", payload:jsonRes});
            return jsonRes
        })  
        .catch(err => {
            console.log(err);
        })
    }
}


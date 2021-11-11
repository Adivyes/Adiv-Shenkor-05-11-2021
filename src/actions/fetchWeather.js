


const apiKey = "um45UACMOk3LIGk4PcZGV2hkjy9GtF9T";

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
        .then(data => {console.log(data); return data;})
        .then(jsonRes => {
          
            dispatch({type: "FETCH_WEATHER", payload:jsonRes});
            return jsonRes
        })  
        .catch(err => {
            console.log(err);
        })
    }
}


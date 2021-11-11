const apiKey = "um45UACMOk3LIGk4PcZGV2hkjy9GtF9T";

const getFiveDaysData = async (id) => {
    const cityApi = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/';
    const queryForWeather = `${id}?apikey=${apiKey}`;
    const response = await fetch (cityApi + queryForWeather)
    const data = await response.json();
    
    return data;
}





export function fetchFiveDays(dataKey){

    return async function(dispatch){
       await getFiveDaysData(dataKey)
        .then(data => {console.log(data); return data.DailyForecasts;})
        .then(jsonRes => {
          
            dispatch({type: "FETCH_FIVE_DAYS", payload:jsonRes});
            return jsonRes
        })  
        .catch(err => {
            console.log(err);
        })
    }
}

const apiKey = "um45UACMOk3LIGk4PcZGV2hkjy9GtF9T";

const getCityData = async (city) => {
    const baseApi = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const queryForCity = `?apikey=${apiKey}&q=${city}`;
    const response = await fetch(baseApi + queryForCity);
    const data = await response.json();
    return data[0];
}


export function fetchCity(city){

    return async function(dispatch){
        await getCityData(city)
        .then(data => {console.log(data); return data;})
        .then(jsonRes => {
            console.log(jsonRes);
            dispatch({type: "FETCH_CITY", payload:jsonRes});
            return jsonRes
        })  
        .catch(err => {
            console.log(err);
        })
    }
}

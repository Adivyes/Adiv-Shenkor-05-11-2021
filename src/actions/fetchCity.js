
const apiKey = "NvQYE49lFTKd5AcRJKnlkZunLqgGbHcH";

const getCityData = async (city) => {

        const baseApi = 'http://dataservice.accuweather.com/locations/v1/cities/search';
        const queryForCity = `?apikey=${apiKey}&q=${city}`;
        const response = await fetch(baseApi + queryForCity);
        const data = await response.json();
        return data[0];
  
}


export function fetchCity(city){

    return  function(dispatch){
         getCityData(city)
        .then(data => { return data;})
        .then(jsonRes => {
            
            dispatch({type: "FETCH_CITY", payload:jsonRes});
            return jsonRes
        })  
        .catch(err => {
            console.log(err);
        })
    }
}


const ListReducers = (state ={items: []}, action)=>{
    switch (action.type) {
        case "FETCH_CITY":
        return  state = {...state, cityInfo: action.payload};

        case "FETCH_WEATHER":  
        return state = {...state, weatherInfo: action.payload};

        case "FETCH_FIVE_DAYS":  
        return state = {...state, fiveDaysInfo: action.payload};

        default:
        return state;
        }
}
export default ListReducers
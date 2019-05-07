const initialState = {
    isAuthenicated: false,
    latitude: 0.0,
    longitude: 0.0
}

const reducer = (state = initialState, action) => {

    switch(action.type) {
        case 'ON_AUTHENTICATED':
        return {
            ...state,
            isAuthenticated: action.token != null ? true : false
        } 
       case 'LOCATION_LOADED': 
        return {
            ...state, 
            latitude: action.value.latitude, 
            longitude:  action.value.longitude
        }

       
    }

    return state
}

export default reducer
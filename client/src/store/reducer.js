const initialState = {
    isAuthenicated: false
}

const reducer = (state = initialState, action) => {

    switch(action.type) {
        case 'ON_AUTHENTICATED':
        return {
            ...state,
            isAuthenticated: action.token != null ? true : false
        }
    }

    return state
}

export default reducer
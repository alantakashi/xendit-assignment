const initialState = {
  uid: null,
  email: null,
  favorites: []
}

const userReducers = (state = initialState, { type, payload }) => {
  switch (type) {
  	case "USER_REGISTER":
      return {
        ...state,
        user: payload
      }

    case "USER_LOGIN":
      console.log('payload', payload)
      
      return {
        ...state,
        uid: payload.uid,
        email: payload.email,
        favorites: payload.favorites
      }

  	case 'USER_LOGOUT':
    	return {
        ...state,
        uid: null,
        email: null,
        favorites: []
      }

    case 'ADD_FAVOURITE':
      return {
        ...state,
        favorites: [payload]
      }

    case 'UPDATE_FAVOURITE':
      return {
        ...state,
        favorites: [payload]
      }

  	default:
    	return state
  }
}


export default userReducers
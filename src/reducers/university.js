const initialState = {
  universities: []
}

const universitiesReducers = (state = initialState, action) => {
  switch (action.type) {
    case "SEARCH_UNI":
      return {
        ...state,
        universities: action.payload
      }

    default:
      return state
  }
}

export default universitiesReducers
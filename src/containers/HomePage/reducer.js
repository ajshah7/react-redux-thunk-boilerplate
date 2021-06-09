import { GET_DATA, SET_DATA } from './constants'
import { API_CONSTANTS } from '../../constants'
const initialState = {
  data: {
    data: null,
    status: API_CONSTANTS.init,
  },
}

const HomePage = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_DATA: {
      return {
        ...state,
        data: {
          data: {},
          status: API_CONSTANTS.loading,
        },
      }
    }
    case SET_DATA: {
      return {
        ...state,
        data: {
          data: payload.data,
          status: payload.status,
        },
      }
    }

    default:
      return state
  }
}

export default HomePage

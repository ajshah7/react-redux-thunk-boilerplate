import { GET_NEWS, SET_NEWS } from './constants'
import { API_CONSTANTS } from '../../constants'
const initialState = {
  newsData: {
    data: null,
    status: API_CONSTANTS.init,
  },
}

const HomePage = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_NEWS: {
      return {
        ...state,
        newsData: {
          data: {},
          status: API_CONSTANTS.loading,
        },
      }
    }
    case SET_NEWS: {
      return {
        ...state,
        newsData: {
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

import { getNews, setNews } from './actions'
import { API_CONSTANTS } from '../../constants'
import axios from 'axios'

// get all news
export const getAllNews = () => async (dispatch) => {
  try {
    dispatch(getNews())
    const response = await axios.get('http://keralanow.herokuapp.com/api/news/')
    if (response.status === 200) {
      dispatch(
        setNews({
          status: API_CONSTANTS.success,
          data: response.data.news,
        })
      )
    } else {
      dispatch(
        setNews({
          status: API_CONSTANTS.failed,
          data: {},
        })
      )
    }
  } catch (error) {
    console.log('error', error)
    dispatch(
      setNews({
        status: API_CONSTANTS.failed,
        data: {},
      })
    )
  }
}

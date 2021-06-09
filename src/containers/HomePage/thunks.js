import { getData, setData } from './actions'
import { API_CONSTANTS } from '../../constants'
import axios from 'axios'

// get all news
export const getDataFromApi =
  ({ query, page }) =>
  async (dispatch) => {
    const config = {
      headers: {
        Authorization: `563492ad6f91700001000001b4777532babe422aa984e608b2487678`,
      },
    }
    try {
      dispatch(getData())
      const response = await axios.get(
        `https://api.pexels.com/v1/search?query=${query}&page=${page}&per_page=40`,
        config
      )
      if (response.status === 200) {
        dispatch(
          setData({
            status: API_CONSTANTS.success,
            data: response.data,
          })
        )
      } else {
        dispatch(
          setData({
            status: API_CONSTANTS.failed,
            data: {},
          })
        )
      }
    } catch (error) {
      console.log('error', error)
      dispatch(
        setData({
          status: API_CONSTANTS.failed,
          data: {},
        })
      )
    }
  }

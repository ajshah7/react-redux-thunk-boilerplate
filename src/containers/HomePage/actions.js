import { GET_NEWS, SET_NEWS } from './constants'

export const getNews = () => ({
  type: GET_NEWS,
})

export const setNews = (data) => ({
  type: SET_NEWS,
  payload: data,
})

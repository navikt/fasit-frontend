import { SUBMIT_FILTER_SEARCH, CHANGE_FILTER, SET_FILTER } from "../actionTypes"

export const fetchRestResourceOfType = (restType, filter = {}, prPage = 50) => {
  return { type: SUBMIT_FILTER_SEARCH, restType, filter, prPage }
}

export const changeFilter = (filterName, filterValue) => {
  return { type: CHANGE_FILTER, filterName, filterValue }
}

export const setFilter = (filter) => {
  return { type: SET_FILTER, filter }
}

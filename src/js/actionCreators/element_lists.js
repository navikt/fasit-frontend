import { SUBMIT_FILTER_SEARCH } from "../actionTypes"

export const fetchRestResourceOfType = (restType, filter = {}, prPage = 50) => {
  return { type: SUBMIT_FILTER_SEARCH, restType, filter, prPage }
}

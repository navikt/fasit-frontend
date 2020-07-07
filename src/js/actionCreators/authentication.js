import { DISPLAY_LOGIN, GET_USER, LOGIN, LOGOUT } from "../actionTypes/"

export const displayLogin = (value) => {
  return { type: DISPLAY_LOGIN, value }
}
export const getUser = () => {
  return { type: GET_USER }
}
export const logOut = () => {
  return { type: LOGOUT }
}
export const logIn = (auth) => {
  const form = Object.keys(auth)
    .map((key) => key + "=" + encodeURIComponent(auth[key]))
    .join("&")
  return { type: LOGIN, form }
}

import { takeEvery } from "redux-saga"
import { fork, put, select } from "redux-saga/effects"
import browserHistory from "../utils/browserHistory"
import {
  APPLICATION_FASIT_URL_REQUEST,
  APPLICATION_NAMES_REQUEST,
  DELETE_ELEMENT,
  NODE_FASIT_REQUEST,
  RESOURCE_FASIT_REQUEST,
  RESOURCE_FASIT_URL_REQUEST,
  REVISIONS_REQUEST,
  SHOW_NEW_APPLICATION_FORM,
  SHOW_NEW_NODE_FORM,
  SHOW_NEW_RESOURCE_FORM,
  SUBMIT_FORM,
  SUBMIT_FORM_FAILED,
  SUBMIT_FORM_SUCCESS,
} from "../actionTypes"
import { deleteUrl, postUrl, putUrl } from "../utils"

export function* submitForm(action) {
  const configuration = yield select((state) => state.configuration)
  let url = ""

  try {
    switch (action.component) {
      // New
      case "newApplication":
        url = `${configuration.fasit_applications}`
        const newApplication = yield postUrl(url, action.form, action.comment)
        yield put({ type: SHOW_NEW_APPLICATION_FORM, value: false })
        const newApplicationLocation = newApplication.headers.get("Location")
        yield put({
          type: APPLICATION_FASIT_URL_REQUEST,
          url: newApplicationLocation,
        })
        yield put({ type: APPLICATION_NAMES_REQUEST })
        break
      case "newResource":
        url = `${configuration.fasit_resources}`
        const newresource = yield postUrl(url, action.form, action.comment)
        yield put({ type: SHOW_NEW_RESOURCE_FORM, value: false })
        const newResourceLocation = newresource.headers.get("Location")
        yield put({
          type: RESOURCE_FASIT_URL_REQUEST,
          url: newResourceLocation,
        })
        break

      // / Update
      case "node":
        url = `${configuration.fasit_nodes}/${action.key}`
        yield putUrl(url, action.form, action.comment)
        yield put({ type: SHOW_NEW_NODE_FORM, value: false })
        yield browserHistory.push(`/nodes/${action.key}`)
        yield put({ type: NODE_FASIT_REQUEST, hostname: action.key })
        yield put({
          type: REVISIONS_REQUEST,
          component: "node",
          key: action.key,
        })
        break
      case "resource":
        url = `${configuration.fasit_resources}/${action.key}`
        yield putUrl(url, action.form, action.comment)
        yield put({ type: SHOW_NEW_RESOURCE_FORM, value: false })
        yield browserHistory.push(`/resources/${action.key}`)
        yield put({ type: RESOURCE_FASIT_REQUEST, id: action.key })
        yield put({
          type: REVISIONS_REQUEST,
          component: "resource",
          key: action.key,
        })
        break
      default:
        throw new Error(
          "Submit_form-saga: I don't know which component you're coming from"
        )
    }

    yield put({ type: SUBMIT_FORM_SUCCESS })
  } catch (err) {
    const value = err.message
    console.error("Error submitting form", err)
    yield put({ type: SUBMIT_FORM_FAILED, value })
  }
}

function* deleteElement(action) {
  const configuration = yield select((state) => state.configuration)
  try {
    let url = ""
    switch (action.elementType) {
      case "application":
        url = `${configuration.fasit_applications}/${action.id}`
        yield deleteUrl(url, action.comment)
        yield browserHistory.push("/applications")
        break
      case "node":
        url = `${configuration.fasit_nodes}/${action.id}`
        yield deleteUrl(url, action.comment)
        yield browserHistory.push("/nodes")
        break
      case "environment":
        url = `${configuration.fasit_environments}/${action.id}`
        yield deleteUrl(url, action.comment)
        yield browserHistory.push("/environments")
        break
      case "resource":
        url = `${configuration.fasit_resources}/${action.id}`
        yield deleteUrl(url, action.comment)
        yield browserHistory.push("/resources")
        break
    }
    yield put({ type: SUBMIT_FORM_SUCCESS })
  } catch (err) {
    const value = err.message
    console.error("Error submitting form", err)
    yield put({ type: SUBMIT_FORM_FAILED, value })
  }
}

export function* watchSubmitForm() {
  yield fork(takeEvery, SUBMIT_FORM, submitForm)
  yield fork(takeEvery, DELETE_ELEMENT, deleteElement)
}

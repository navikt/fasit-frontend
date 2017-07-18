import {takeEvery} from "redux-saga";
import {put, fork, select} from "redux-saga/effects";
import {browserHistory} from "react-router";
import {
    APPLICATION_NAMES_REQUEST,
    ENVIRONMENTS_REQUEST,
    SHOW_NEW_APPLICATION_FORM,
    SHOW_NEW_CLUSTER_FORM,
    SHOW_NEW_ENVIRONMENT_FORM,
    SHOW_NEW_NODE_FORM,
    SHOW_NEW_RESOURCE_FORM,
    SUBMIT_FORM,
    SUBMIT_FORM_SUCCESS,
    SUBMIT_FORM_FAILED,
    NODE_FASIT_REQUEST,
    ENVIRONMENT_FASIT_REQUEST,
    ENVIRONMENT_CLUSTER_FASIT_REQUEST,
    RESOURCE_FASIT_REQUEST,
    APPLICATION_FASIT_REQUEST,
    SUBMIT_FILTER_SEARCH
} from "../actionTypes";
import {putUrl, postUrl, deleteUrl} from "../utils";

export function* submitForm(action) {
    const configuration = yield select((state) => state.configuration)
    const filter = yield select((state) => state.filter)
    let url = ""
    try {
        switch (action.component) {

            // New
            case "newApplication":
                url = `${configuration.fasit_applications}`
                yield postUrl(url, action.form, action.comment)
                yield put({type: APPLICATION_NAMES_REQUEST})
                yield put({type: SHOW_NEW_APPLICATION_FORM, value: false})
                break
            case "newNode":
                url = `${configuration.fasit_nodes}`
                yield postUrl(url, action.form, action.comment)
                yield put({type: SHOW_NEW_NODE_FORM, value: false})
                break
            case "newEnvironment":
                url = `${configuration.fasit_environments}`
                yield postUrl(url, action.form, action.comment)
                yield put({type: ENVIRONMENTS_REQUEST})
                yield put({type: SHOW_NEW_ENVIRONMENT_FORM, value: false})
                break
            case "newCluster":
                url = `${configuration.fasit_environments}/${action.form.environment}/clusters`
                yield postUrl(url, action.form, action.comment)
                yield put({type: SHOW_NEW_CLUSTER_FORM, value: false})
                break
            case "newResource":
                url = `${configuration.fasit_resources}`
                yield postUrl(url, action.form, action.comment)
                yield put({type: SHOW_NEW_RESOURCE_FORM, value: false})
                break

            // Delete
            case "deleteApplication":
                url = `${configuration.fasit_applications}/${action.key}`
                yield deleteUrl(url, action.comment)
                yield put({type: SUBMIT_FILTER_SEARCH, location:"applications", prPage: 10, page:filter.activePage})
                yield browserHistory.push("/applications")
                break
            case "deleteNode":
                url = `${configuration.fasit_nodes}/${action.key}`
                yield deleteUrl(url, action.comment)
                yield put({type: SUBMIT_FILTER_SEARCH, location:"nodes", prPage: 10,page:filter.activePage})
                yield browserHistory.push("/nodes")
                break
            case "deleteEnvironment":
                url = `${configuration.fasit_environments}/${action.key}`
                yield deleteUrl(url, action.comment)
                yield put({type: SUBMIT_FILTER_SEARCH, location:"environments", prPage: 10, page:filter.activePage})
                yield browserHistory.push("/environments")
                break
            case "deleteCluster":
                url = `${configuration.fasit_environments}/${action.form.env}/clusters/${action.key}`
                // to current environment
                yield deleteUrl(url, action.comment)
                break
            case "deleteResource":
                url = `${configuration.fasit_resources}/${action.key}`
                yield deleteUrl(url, action.comment)
                yield put({type: SUBMIT_FILTER_SEARCH, location:"resources", prPage: 10, page:filter.activePage})
                yield browserHistory.push("/resources")
                break

            // / Update
            case "node":
                url = `${configuration.fasit_nodes}/${action.key}`
                yield putUrl(url, action.form, action.comment)
                yield put({type:NODE_FASIT_REQUEST, hostname:action.key})
                break
            case "application":
                url = `${configuration.fasit_applications}/${action.key}`
                yield putUrl(url, action.form, action.comment)
                yield put({type:APPLICATION_FASIT_REQUEST, name:action.key})
                break
            case "environment":
                url = `${configuration.fasit_environments}/${action.key}`
                yield putUrl(url, action.form, action.comment)
                yield put({type: SHOW_NEW_ENVIRONMENT_FORM, value: false})
                yield browserHistory.push(`/environments/${action.form.name}`)
                yield put({type:ENVIRONMENT_FASIT_REQUEST, id:action.key})
                break
            case "cluster":
                url = `${configuration.fasit_environments}/${action.form.environment}/clusters/${action.key}`
                yield putUrl(url, action.form, action.comment)
                yield put({type:ENVIRONMENT_CLUSTER_FASIT_REQUEST, cluster:action.key, environment:action.form.environment})
                break
            case "resource":
                url = `${configuration.fasit_resources}/${action.key}`
                yield putUrl(url, action.form, action.comment)
                yield put({type: RESOURCE_FASIT_REQUEST, id: action.key})
                break
            default:
                throw new Error("Submit_form-saga: I don't know which component you're coming from")
        }

        yield put({type: SUBMIT_FORM_SUCCESS})
    } catch (err) {
        const value = err.message
        console.error("Error submitting form", err)
        yield put({type: SUBMIT_FORM_FAILED, value})
    }

}

export function* watchSubmitForm() {
    yield fork(takeEvery, SUBMIT_FORM, submitForm)
}
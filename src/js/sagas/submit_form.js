import {takeEvery} from "redux-saga";
import {fork, put, select} from "redux-saga/effects";
import {browserHistory} from "react-router";
import {
    APPLICATION_FASIT_REQUEST,
    APPLICATION_NAMES_REQUEST,
    ENVIRONMENT_CLUSTER_FASIT_REQUEST,
    ENVIRONMENT_FASIT_REQUEST,
    ENVIRONMENTS_REQUEST,
    NODE_FASIT_REQUEST,
    RESOURCE_FASIT_REQUEST,
    REVISIONS_REQUEST,
    SHOW_NEW_APPLICATION_FORM,
    SHOW_NEW_CLUSTER_FORM,
    SHOW_NEW_ENVIRONMENT_FORM,
    SHOW_NEW_NODE_FORM,
    SHOW_NEW_RESOURCE_FORM,
    SUBMIT_FILTER_SEARCH,
    SUBMIT_FORM,
    SUBMIT_FORM_FAILED,
    SUBMIT_FORM_SUCCESS
} from "../actionTypes";
import {deleteUrl, postUrl, putUrl} from "../utils";

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
                yield browserHistory.push(`/environments/${action.form.env}`)
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
                yield put({type: SHOW_NEW_NODE_FORM, value: false})
                yield browserHistory.push(`/nodes/${action.key}`)
                yield put({type:NODE_FASIT_REQUEST, hostname:action.key})
                yield put({type: REVISIONS_REQUEST, component: "node", key: action.key})
                break
            case "application":
                url = `${configuration.fasit_applications}/${action.key}`
                yield putUrl(url, action.form, action.comment)
                yield put({type: SHOW_NEW_APPLICATION_FORM, value: false})
                yield browserHistory.push(`/applications/${action.form.name}`)
                yield put({type:APPLICATION_FASIT_REQUEST, name:action.key})
                yield put({type: REVISIONS_REQUEST, component: "application", key: action.key})
                break
            case "environment":
                url = `${configuration.fasit_environments}/${action.key}`
                yield putUrl(url, action.form, action.comment)
                yield put({type: SHOW_NEW_ENVIRONMENT_FORM, value: false})
                yield browserHistory.push(`/environments/${action.form.name}`)
                yield put({type:ENVIRONMENT_FASIT_REQUEST, id: action.form.name})
                yield put({type: REVISIONS_REQUEST, component: "environment", key: action.form.name})
                break
            case "cluster":
                url = `${configuration.fasit_environments}/${action.form.environment}/clusters/${action.key}`
                yield putUrl(url, action.form, action.comment)
                yield put({type:ENVIRONMENT_CLUSTER_FASIT_REQUEST, cluster:action.key, environment:action.form.environment})
                break
            case "resource":
                url = `${configuration.fasit_resources}/${action.key}`
                yield putUrl(url, action.form, action.comment)
                yield put({type: SHOW_NEW_RESOURCE_FORM, value: false})
                yield browserHistory.push(`/resources/${action.key}`)
                yield put({type: RESOURCE_FASIT_REQUEST, id: action.key})
                yield put({type: REVISIONS_REQUEST, component: "resource", key: action.key})
                break

            // Rescue
            case "rescue":
                action.key
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
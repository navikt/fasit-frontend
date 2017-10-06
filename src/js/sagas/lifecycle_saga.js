import { takeEvery } from "redux-saga";
import { fork, put, select } from "redux-saga/effects";
import {
    APPLICATION_FASIT_REQUEST,
    INSTANCE_FASIT_REQUEST,
    ENVIRONMENT_FASIT_REQUEST,
    NODE_FASIT_REQUEST,
    RESCUE_ELEMENT,
    RESOURCE_FASIT_REQUEST,
    REVISIONS_REQUEST
} from "../actionTypes";
import { putUrl } from "../utils";

export function* rescueElement(action) {
    const configuration = yield select((state) => state.configuration)

    try {
        const elementType = action.elementType
        const url = `${configuration.fasit_lifecycle}/${elementType}/${action.key}`
        const payload = {status: "rescued"}
        yield putUrl(url, payload, action.comment)

        let elementId;
        let actionType;
        let component;

        switch (action.elementType) {
            case "resource":
                elementId = action.key
                component = elementType
                yield put({type: RESOURCE_FASIT_REQUEST, id: action.key})
                break
            case "application":
                const currentApplication = yield select((state) => state.application_fasit)
                elementId = currentApplication.data.name
                yield put({type: APPLICATION_FASIT_REQUEST, name: elementId})
                actionType =
                    component = elementType
                break
            case "cluster":

                break
            case "environment":
                const currentEnvironment = yield select((state) => state.environment_fasit)
                elementId = currentEnvironment.data.name
                component = elementType
                yield put({type: ENVIRONMENT_FASIT_REQUEST, id: elementId})
                break
            case "applicationinstance":
                const currentApplicationInstance = yield select((state) => state.instance_fasit)
                elementId = currentApplicationInstance.data.id
                component = "instance"
                yield put({type: INSTANCE_FASIT_REQUEST, id: elementId})
                break
            case "node":
                const currentNode = yield select((state) => state.node_fasit)
                elementId = currentNode.data.hostname
                component = elementType
                yield put({type: NODE_FASIT_REQUEST, hostname: elementId})
                break
        }

        yield put({type: REVISIONS_REQUEST, component, key: elementId})

    }
    catch (err) {
        const value = err.message
        console.error("Error rescuing resource", err)
        // yield put({type: SUBMIT_FORM_FAILED, value})
    }

}

export function* watchRescueElement() {
    yield fork(takeEvery, RESCUE_ELEMENT, rescueElement)
}
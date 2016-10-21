// --------- APPLICATIONS ---------
// Applications - list
export const APPLICATIONS_LIST_REQUEST = 'APPLICATIONS_LIST_REQUEST'
export const APPLICATIONS_LIST_FETCHING = 'APPLICATIONS_LIST_FETCHING'
export const APPLICATIONS_LIST_RECEIVED = 'APPLICATIONS_LIST_RECEIVED'
export const APPLICATIONS_LIST_FAILED = 'APPLICATIONS_LIST_FAILED'

// --------- AUTHENTICATION ---------
export const GET_USER = 'GET_USER'
export const LOGIN = 'LOGIN'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const LOGIN_SUBMITTED = 'LOGIN_SUBMITTED'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGOUT = 'LOGOUT'

// --------- CONFIGURATION ---------
// - Henter inn alle web-endepunkter som benyttes fra /config
export const RECEIVE_CONFIGURATION = 'RECEIVE_CONFIGURATION'
export const RECEIVE_CONFIGURATION_FAILED = 'RECEIVE_CONFIGURATION_FAILED'
export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR'

// --------- ENVIRONMENTS ---------
// Environments - list
export const ENVIRONMENTS_LIST_REQUEST = 'ENVIRONMENTS_LIST_REQUEST'
export const ENVIRONMENTS_LIST_FETCHING = 'ENVIRONMENTS_LIST_FETCHING'
export const ENVIRONMENTS_LIST_RECEIVED = 'ENVIRONMENTS_LIST_RECEIVED'
export const ENVIRONMENTS_LIST_FAILED = 'ENVIRONMENTS_LIST_FAILED'

// Environment - names
export const ENVIRONMENT_NAMES_REQUEST = 'ENVIRONMENT_NAMES_REQUEST'
export const ENVIRONMENT_NAMES_RECEIVED = 'ENVIRONMENT_NAMES_RECEIVED'

// --------- FILTERS ---------
export const CHANGE_FILTER = 'CHANGE_FILTER'
export const SET_SEARCH_CONTEXT = 'SET_SEARCH_CONTEXT'
export const SET_SEARCH_STRING = 'SET_SEARCH_STRING'
export const SET_ENVIRONMENT_CLASS = 'SET_ENVIRONMENT_CLASS'
export const SET_ENVIRONMENT = 'SET_ENVIRONMENT'

// --------- INSTANCES ---------
// Instances - list
export const INSTANCES_LIST_REQUEST = 'INSTANCES_LIST_REQUEST'
export const INSTANCES_LIST_FETCHING = 'INSTANCES_LIST_FETCHING'
export const INSTANCES_LIST_RECEIVED = 'INSTANCES_LIST_RECEIVED'
export const INSTANCES_LIST_FAILED = 'INSTANCES_LIST_FAILED'

// --------- NODES ---------
// Nodes - list
export const NODES_LIST_REQUEST = 'NODES_LIST_REQUEST'
export const NODES_LIST_FETCHING = 'NODES_LIST_FETCHING'
export const NODES_LIST_RECEIVED = 'NODES_LIST_RECEIVED'
export const NODES_LIST_FAILED = 'NODES_LIST_FAILED'

// NodeTypes
export const NODE_TYPES_REQUEST = 'NODE_TYPES_REQUEST'
export const NODE_TYPES_RECEIVED = 'NODE_TYPES_RECEIVED'

// Node - Revisions
export const NODE_REVISIONS_REQUEST = 'NODE_REVISIONS_REQUEST'
export const NODE_REVISIONS_FETCHING = 'NODE_REVISIONS_FETCHING'
export const NODE_REVISIONS_RECEIVED = 'NODE_REVISIONS_RECEIVED'
export const NODE_REVISIONS_REQUEST_FAILED = 'NODE_REVISIONS_REQUEST_FAILED'
export const NODE_REVISION_REQUEST = 'NODE_REVISION_REQUEST'
export const NODE_REVISION_FETCHING = 'NODE_REVISION_FETCHING'
export const NODE_REVISION_RECEIVED = 'NODE_REVISION_RECEIVED'
export const NODE_REVISION_REQUEST_FAILED = 'NODE_REVISION_REQUEST_FAILED'
export const SHOW_ALL_NODE_REVISIONS = "SHOW_ALL_NODE_REVISIONS"

// Node - Events
export const NODE_EVENTS_REQUEST = 'NODE_EVENTS_REQUEST'
export const NODE_EVENTS_FETCHING = 'NODE_EVENTS_FETCHING'
export const NODE_EVENTS_RECEIVED = 'NODE_EVENTS_RECEIVED'
export const NODE_EVENTS_REQUEST_FAILED = 'NODE_EVENTS_REQUEST_FAILED'

// Node - SERA
export const NODE_SERA_REQUEST = 'NODE_SERA_REQUEST'
export const NODE_SERA_FETCHING = 'NODE_SERA_FETCHING'
export const NODE_SERA_RECEIVED = 'NODE_SERA_RECEIVED'
export const NODE_SERA_REQUEST_FAILED = 'NODE_SERA_REQUEST_FAILED'

// Node - Fasit data
export const CLEAR_NODE_PASSWORD = 'CLEAR_NODE_PASSWORD'
export const NODE_FASIT_FETCHING = 'NODE_FASIT_FETCHING'
export const NODE_FASIT_PASSWORD_RECEIVED = 'NODE_FASIT_PASSWORD_RECEIVED'
export const NODE_FASIT_PASSWORD_REQUEST = 'NODE_FASIT_PASSWORD_REQUEST'
export const NODE_FASIT_PASSWORD_REQUEST_FAILED = 'NODE_FASIT_PASSWORD_REQUEST_FAILED'
export const NODE_FASIT_RECEIVED = 'NODE_FASIT_RECEIVED'
export const NODE_FASIT_REQUEST = 'NODE_FASIT_REQUEST'
export const NODE_FASIT_REQUEST_FAILED = 'NODE_FASIT_REQUEST_FAILED'
export const SHOW_NODE_PASSWORD = 'SHOW_NODE_PASSWORD'

// Node - Edit Fasit node
export const CLEAR_EDIT_NODE_FORM = 'CLEAR_EDIT_NODE_FORM'
export const CLOSE_SUBMIT_EDIT_NODE_FORM_STATUS = 'CLOSE_SUBMIT_EDIT_NODE_FORM_STATUS'
export const REQUEST_EDIT_NODE_FORM_DATA = 'REQUEST_EDIT_NODE_FORM_DATA'
export const REQUEST_EDIT_NODE_FORM_DATA_FAILED = 'REQUEST_EDIT_NODE_FORM_DATA_FAILED'
export const RECEIVED_EDIT_NODE_FORM_DATA = 'RECEIVED_EDIT_NODE_FORM_DATA'
export const SET_EDIT_NODE_FORM_VALUES = 'SET_EDIT_NODE_FORM_VALUES'
export const SET_EDIT_NODE_FORM_HOSTNAME = 'SET_EDIT_NODE_FORM_HOSTNAME'
export const SET_EDIT_NODE_FORM_TYPE = 'SET_EDIT_NODE_FORM_TYPE'
export const SET_EDIT_NODE_FORM_USERNAME = 'SET_EDIT_NODE_FORM_USERNAME'
export const SET_EDIT_NODE_FORM_PASSWORD = 'SET_EDIT_NODE_FORM_PASSWORD'
export const SHOW_EDIT_NODE_FORM = 'SHOW_EDIT_NODE_FORM'
export const SHOW_SUBMIT_EDIT_NODE_FORM = 'SHOW_SUBMIT_EDIT_NODE_FORM'
export const SUBMIT_EDIT_NODE_FORM = 'SUBMIT_EDIT_NODE_FORM'
export const SUBMIT_EDIT_NODE_FORM_SUCCESS = 'SUBMIT_EDIT_NODE_FORM_SUCCESS'
export const SUBMIT_EDIT_NODE_FORM_FAILED = 'SUBMIT_EDIT_NODE_FORM_FAILED'
export const SUBMITTING_EDIT_NODE_FORM = 'SUBMITTING_EDIT_NODE_FORM'

// Node - Create new Fasit node
export const CLEAR_NEW_NODE_FORM = 'CLEAR_NEW_NODE_FORM'
export const CLOSE_SUBMIT_NEW_NODE_FORM_STATUS = 'CLOSE_SUBMIT_NEW_NODE_FORM_STATUS'
export const SET_NEW_NODE_FORM_HOSTNAME = 'SET_NEW_NODE_FORM_HOSTNAME'
export const SET_NEW_NODE_FORM_ENVIRONMENTCLASS = 'SET_NEW_NODE_FORM_ENVIRONMENTCLASS'
export const SET_NEW_NODE_FORM_ENVIRONMENT = 'SET_NEW_NODE_FORM_ENVIRONMENT'
export const SET_NEW_NODE_FORM_ZONE = 'SET_NEW_NODE_FORM_ZONE'
export const SET_NEW_NODE_FORM_TYPE = 'SET_NEW_NODE_FORM_TYPE'
export const SET_NEW_NODE_FORM_USERNAME = 'SET_NEW_NODE_FORM_USERNAME'
export const SET_NEW_NODE_FORM_PASSWORD = 'SET_NEW_NODE_FORM_PASSWORD'
export const SHOW_NEW_NODE_FORM = 'SHOW_NEW_NODE_FORM'
export const SUBMIT_NEW_NODE_FORM = 'SUBMIT_NEW_NODE_FORM'
export const SUBMIT_NEW_NODE_FORM_SUCCESS = 'SUBMIT_NEW_NODE_FORM_SUCCESS'
export const SUBMIT_NEW_NODE_FORM_FAILED = 'SUBMIT_NEW_NODE_FORM_FAILED'
export const SUBMITTING_NEW_NODE_FORM = 'SUBMITTING_NEW_NODE_FORM'

// Node - Delete fasit node
export const CLOSE_SUBMIT_DELETE_NODE_STATUS = 'CLOSE_SUBMIT_DELETE_NODE_STATUS'
export const SHOW_DELETE_NODE_FORM = 'SHOW_DELETE_NODE_FORM'
export const SUBMIT_DELETE_NODE = 'SUBMIT_DELETE_NODE'
export const SUBMIT_DELETE_NODE_SUCCESS = 'SUBMIT_DELETE_NODE_SUCCESS'
export const SUBMIT_DELETE_NODE_FAILED = 'SUBMIT_DELETE_NODE_FAILED'
export const SUBMITTING_DELETE_NODE = 'SUBMITTING_DELETE_NODE'


// --------- RESOURCES ---------
// Resources - list
export const RESOURCES_LIST_REQUEST = 'RESOURCES_LIST_REQUEST'
export const RESOURCES_LIST_FETCHING = 'RESOURCES_LIST_FETCHING'
export const RESOURCES_LIST_RECEIVED = 'RESOURCES_LIST_RECEIVED'
export const RESOURCES_LIST_FAILED = 'RESOURCES_LIST_FAILED'

// ResourceTypes
export const RESOURCE_TYPES_REQUEST = 'RESOURCE_TYPES_REQUEST'
export const RESOURCE_TYPES_RECEIVED = 'RESOURCE_TYPES_RECEIVED'


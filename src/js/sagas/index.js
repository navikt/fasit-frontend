import {call} from 'redux-saga/effects'
import {watchAuthentication} from './authentication'
import {watchElementsList} from './elements_list'

// Application

// Environments
import {watchEnvironmentNames} from './environment_names'

// Instances

//Nodes
import {watchNodeDelete} from './node_delete'
import {watchNodeEvents} from './node_events'
import {watchNodeEdit} from './node_edit'
import {watchNodeFasit} from './node_fasit'
import {watchNodeNew} from './node_new'
import {watchNodeRevisions} from './node_revisions'
import {watchNodeSera} from './node_sera'
import {watchNodeTypes} from './node_types'


// Resources
//import {watchResourcesList} from './resources_list'
import {watchResourceTypes} from './resource_types'


export default function*() {
    yield [
        // Common
        call(watchAuthentication),
        call(watchElementsList),

        // Applications

        // Environments
        call(watchEnvironmentNames),

        // Instances

        //Nodes
        call(watchNodeDelete),
        call(watchNodeEvents),
        call(watchNodeEdit),
        call(watchNodeFasit),
        call(watchNodeNew),
        call(watchNodeRevisions),
        call(watchNodeSera),
        call(watchNodeTypes),

        // Resources
        call(watchResourceTypes),
    ]
}
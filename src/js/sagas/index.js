import {call} from 'redux-saga/effects'
import {watchAuthentication} from './authentication'
import {watchElementsList} from './elements_list'

// Application
import {watchApplicationsList} from './applications_list'

// Environments
import {watchEnvironmentsList} from './environments_list'
import {watchEnvironmentNames} from './environment_names'

// Instances
import {watchInstancesList} from './instances_list'

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
        call(watchApplicationsList),
        
        // Environments
        call(watchEnvironmentsList),
        call(watchEnvironmentNames),

        // Instances
        call(watchInstancesList),

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
        //call(watchResourcesList),
        call(watchResourceTypes),
    ]
}
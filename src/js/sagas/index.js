import {call} from 'redux-saga/effects'
import {watchAuthentication} from './authentication'
import {watchElementsList} from './elements_list'

// Application
import {watchApplicationNames} from './application_names'
import {watchApplicationFasit} from './application_fasit'

// Environments
import {watchEnvironments} from './environments'

// Instances
import {watchInstanceFasit} from './instance_fasit'

//Nodes
import {watchNodeEvents} from './node_events'
import {watchNodeFasit} from './node_fasit'
import {watchNodeRevisions} from './node_revisions'
import {watchNodeSera} from './node_sera'
import {watchNodeTypes} from './node_types'


// Resources
import {watchResourceTypes} from './resource_types'
import {watchResourceFasit} from './resource_fasit'

//Forms
import {watchSubmitForm} from './submit_form'


export default function*() {
    yield [
        // Common
        call(watchAuthentication),
        call(watchElementsList),
        call(watchSubmitForm),

        // Applications
        call(watchApplicationNames),
        call(watchApplicationFasit),

        // Environments
        call(watchEnvironments),

        // Instances
        call(watchInstanceFasit),

        //Nodes
        call(watchNodeEvents),
        call(watchNodeFasit),
        call(watchNodeRevisions),
        call(watchNodeSera),
        call(watchNodeTypes),

        // Resources
        call(watchResourceTypes),
        call(watchResourceFasit)
    ]
}
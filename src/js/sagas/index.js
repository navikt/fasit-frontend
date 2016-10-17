import {call} from 'redux-saga/effects'
import {watchNodeEvents} from './node_events'
import {watchNodeEdit} from './node_edit'
import {watchNodeFasit} from './node_fasit'
import {watchNodeNew} from './node_new'
import {watchNodeRevisions} from './node_revisions'
import {watchNodeSera} from './node_sera'
import {watchNodeDelete} from './node_delete'
import {watchNodesList} from './nodes_list'


export default function*() {
        yield [
        call(watchNodeEvents),
        call(watchNodeEdit),
        call(watchNodeFasit),
        call(watchNodeNew),
        call(watchNodeRevisions),
        call(watchNodeSera),
        call(watchNodeDelete),
        call(watchNodesList)
    ]
}
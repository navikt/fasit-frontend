import {call} from "redux-saga/effects";
import {watchAuthentication} from "./authentication";
import {watchElementsList} from "./elements_list";
import {watchNavSearchQueries} from "./nav_search";
import {watchSearchQueries} from "./search";
// Application
import {watchApplicationNames} from "./application_names";
import {watchApplicationFasit} from "./application_fasit";
// Environments
import {watchEnvironments} from "./environments";
import {watchEnvironmentFasit} from "./environment_fasit";
// Instances
import {watchInstanceFasit} from "./instance_fasit";
//Nodes
import {watchNodeEvents} from "./node_events";
import {watchNodeFasit} from "./node_fasit";
import {watchNodeTypes} from "./node_types";
// Resources
import {watchResourceTypes} from "./resource_types";
import {watchResourceFasit} from "./resource_fasit";
//Forms
import {watchSubmitForm} from "./submit_form";
import {watchRevisions} from "./revisions";


export default function*() {
    yield [
        // Common
        call(watchAuthentication),
        call(watchElementsList),
        call(watchSubmitForm),
        call(watchRevisions),
        call(watchNavSearchQueries),
        call(watchSearchQueries),

        // Applications
        call(watchApplicationNames),
        call(watchApplicationFasit),

        // Environments
        call(watchEnvironments),
        call(watchEnvironmentFasit),

        // Instances
        call(watchInstanceFasit),

        //Nodes
        call(watchNodeEvents),
        call(watchNodeFasit),
        call(watchNodeTypes),

        // Resources
        call(watchResourceTypes),
        call(watchResourceFasit)
    ]
}
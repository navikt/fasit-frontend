export default {
    viewModes: {
        sidebarMinimized: false
    },
    applications: {
        isFetching: false,
        data: [],
        active: 0
    },
    instances: {
        isFetching: false,
        data: [],
        active: 0
    },
    resources: {
        isFetching: false,
        data: [],
        active: 0
    },

    environments: {
        zones: ['fss', 'sbs'],
        environmentClasses: ['u','t','q','p'],
        isFetching: false,
        data: [],
        active: 0
    },

    search: {
        environmentNames: [],
        resourceTypes: [],
        nodeTypes: [],
        context: '',
        searchString: '',
        filters: {
            environment: '',
            environmentclass: '',
            type: '',
            resourcetype: '',
            hostname: '',
            cluster: '',
            unit: '',
            application: '',
            alias: '',
            zone: ''
        }
    }
}
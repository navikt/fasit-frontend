

export const APPCONFIG = "appconfig"
export const APPLICATION = "application"
export const CLUSTER = "cluster"
export const ENVIRONMENT = "environment"
export const INSTANCE = "instance"
export const NODE = "node"
export const RESOURCE = "resource"

export function destinationUrl(searchResult) {
    switch (searchResult.type) {
        case NODE:
            return `/nodes/${searchResult.name}`
        case APPLICATION:
            return `/applications/${searchResult.name}`
        case ENVIRONMENT:
            return `/environments/${searchResult.name}`
        case RESOURCE:
            return `/resources/${searchResult.id}`
        case APPCONFIG:
        case INSTANCE:
            return `/instances/${searchResult.id}`
        case CLUSTER:
            return `/environments/${searchResult.info.split(" |")[0]}/clusters/${searchResult.name}`
        default:
            return "/"

    }
}
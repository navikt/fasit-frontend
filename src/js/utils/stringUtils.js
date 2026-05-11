export function isEmptyObject(obj) {
    return !obj || Object.keys(obj).length === 0
}

export function capitalize(label) {
    if (!label) {
        return ""
    }
    return "" + label.charAt(0).toUpperCase() + label.slice(1)
}

export function sortBy(property) {
    return function (a, b) {
        if (a[property] === b[property]) {
            return 0
        }
        return a[property] < b[property] ? -1 : 1
    }
}

export function sortSearchResults(results) {
    return results.sort((a, b) => {
        if (a.type < b.type) {
            return -1
        }
        if (a.type > b.type) {
            return 1
        }
        return 0
    })
}

function splitCharactersAndNumbers(name) {
    return name.split(/(\d+)/)
}

// sort environments naturally, first by envclass, then by name and number. Ex p, q1, q2, q10, u1, u2, a12
export function sortEnvironmentsNaturally(first, second) {
    const firstEnvClass = first.environmentclass.toLowerCase()
    const secondEnvClass = second.environmentclass.toLowerCase()
    // environment name can either be in field environment or name depending on payload
    const firstEnv = first.environment || first.name
    const secondEnv = second.environment || second.name
    const firstEnvName = splitCharactersAndNumbers(firstEnv.toLowerCase())
    const secondEnvName = splitCharactersAndNumbers(secondEnv.toLowerCase())

    if (firstEnvClass !== secondEnvClass) {
        return firstEnvClass > secondEnvClass ? 1 : -1
    }

    for (let idx = 0; idx < firstEnvName.length; idx++) {
        if (firstEnvName[idx] !== secondEnvName[idx]) {
            if (!isNaN(firstEnvName[idx]) && !isNaN(secondEnvName[idx])) {
                return parseInt(firstEnvName[idx]) > parseInt(secondEnvName[idx]) ? 1 : -1
            }
            return firstEnvName[idx] > secondEnvName[idx] ? 1 : -1
        }
    }
    return 0
}

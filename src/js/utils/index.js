import fetch from "isomorphic-fetch";

export const validAuthorization = (user, accesscontrol) => {
    let group = true, role = false

    if (user.authenticated && typeof accesscontrol !== "undefined") {
        if (accesscontrol.adgroups.length > 0) {
            group = hasGroup(user, accesscontrol.adgroups)
        }
        switch (accesscontrol.environmentclass) {
            case "p":
                role = hasRole(user, ['ROLE_PROD_OPERATIONS'])
                break
            case "q":
            case "t":
                role = hasRole(user, ['ROLE_PROD_OPERATIONS', 'ROLE_OPERATIONS'])
                break
            case "u":
                role = hasRole(user, ['ROLE_USER', 'ROLE_CI', 'ROLE_PROD_OPERATIONS', 'ROLE_OPERATIONS'])
                break
            default:
                role = false
                break
        }
    }
    return (group && role)
}

const hasGroup = (user, groups) => {
    if (user.roles.indexOf("ROLE_SUPERUSER" > -1)) return true
    for (let i = 0; i < user.groups.length; i++) {
        if (groups.indexOf(user.groups[i]) !== -1) return true
    }
}
const hasRole = (user, roles) => {
    for (let i = 0; i < user.roles.length; i++) {
        if (roles.indexOf(user.roles[i]) !== -1) return true
    }
}

export const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0
}

export function capitalize(label) {
    if(!label) {
        return ""
    }
    return "" + label.charAt(0).toUpperCase() + label.slice(1)
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

export const fetchUrl = (url, noCredentials) => {
    let headers = {}
    if (!noCredentials) headers = {
        credentials: 'include',
        mode: 'cors'
    }
    return fetch(url, headers)
        .then(res => {
            const contentType = res.headers.get("content-type")
            if (res.status >= 400) {
                const errorMessage = `${res.status}:${res.statusText}`
                throw new Error(errorMessage)
            }
            if (contentType && contentType.indexOf("application/json") !== -1) {
                return res.json()
            }
            return res.text()

        })
}

export const fetchPage = (url) => {
    return fetch(url)
        .then(res => {
            if (res.status >= 400) {
                const errorMessage = `${res.status}:${res.statusText}`
                throw new Error(errorMessage)
            }
            const headers = {}
            for (let header of res.headers.entries()) {
                headers[header[0]] = header[1]
            }

            return res.json().then((data) => {
                return ({
                    data,
                    headers
                })
            })
        })
}

export const putUrl = (url, content, comment) => {
    let headers = {"Content-Type": "application/json"}
    if (comment && comment.length > 0) {
        headers = Object.assign({}, headers, {"X-Comment": comment})
    }
    return fetch(url, {
        headers,
        credentials: 'include',
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify(content)
    })
        .then(res => {
            let text = res.text()
            if (res.status >= 400) {
                return text.then(err => {
                    const errorMessage = `${res.status}:${res.statusText}\n${err}`
                    throw new Error(errorMessage)
                })
            }
            return text
        })
}

export const postUrl = (url, form, comment) => {
    let headers = {"Content-Type": "application/json"}
    if (comment && comment.length > 0) {
        headers = Object.assign({}, headers, {"X-Comment": comment})
    }
    return fetch(url, {
        headers,
        credentials: 'include',
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(form)
    })
        .then(res => {
            let text = res.text()
            if (res.status >= 400) {
                return text.then(err => {
                    const errorMessage = `${res.status}:${res.statusText}\n${err}`
                    throw new Error(errorMessage)

                })
            }
            return res
        })
}

export const sortBy = (property) => {
    return function (a, b) {
        if (a[property] === b[property]) {
            return 0
        }
        return a[property] < b[property] ? -1 : 1
    }
}

export const postForm = (url, body) => {
    return fetch(url, {
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        credentials: 'include',
        method: 'POST',
        body
    })
        .then(res => {
            if (res.status >= 400) {
                const errorMessage = `${res.status}:${res.statusText}`
                throw new Error(errorMessage)
            }
            return res.text()
        })
}
export const deleteUrl = (url, comment) => {
    let headers = {"Content-Type": "application/json"}
    if (comment && comment.length > 0) {
        headers = Object.assign({}, headers, {"X-Comment": comment})
    }
    return fetch(url, {
        headers,
        credentials: 'include',
        method: 'DELETE'
    })
        .then(res => {
            let text = res.text()
            if (res.status >= 400) {
                return text.then(err => {
                    const errorMessage = `${res.status}:${res.statusText}\n${err}`
                    throw new Error(errorMessage)

                })
            }
            return text
        })
}
export const sortSearchResults = (results) => {
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

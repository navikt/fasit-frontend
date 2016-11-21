import fetch from 'isomorphic-fetch'

export const checkAuthentication = (user, accesscontrol) => {
    if (user.authenticated && accesscontrol) {
        switch (accesscontrol.environmentclass) {
            case "p":
                return hasRole(user, ['ROLE_PROD_OPERATIONS', 'ROLE_SELFSERVICE_PROD'])
            case "q":
            case "t":
                return hasRole(user, ['ROLE_PROD_OPERATIONS', 'ROLE_SELFSERVICE_PROD', 'ROLE_OPERATIONS', 'ROLE_SELFSERVICE'])
            case "u":
                return hasRole(user, ['ROLE_USER', 'ROLE_CI', 'ROLE_PROD_OPERATIONS', 'ROLE_SELFSERVICE_PROD', 'ROLE_OPERATIONS', 'ROLE_SELFSERVICE'])
            default:
                console.log("missing environmentclass")
                return false
        }
    }
    return false
}
const hasRole = (user, roles) => {
    for (let i = 0; i < user.roles.length; i++) {
        if (roles.indexOf(user.roles[i]) !== -1) return true
    }
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

            return res.json().then((data)=>{
                return ({
                    data,
                    headers
                })

            })

        })
}

export const putUrl = (url, content) => {
    return fetch(url, {
        headers: {"Content-Type": "application/json"},
        credentials: 'include',
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify(content)
    })
        .then(res => {
            if (res.status >= 400) {
                const errorMessage = `${res.status}:${res.statusText}`
                throw new Error(errorMessage)
            }
            return res.json()
        })
}

export const postUrl = (url, form) => {
    return fetch(url, {
        headers: {"Content-Type": "application/json"},
        credentials: 'include',
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(form)
    })
        .then(res => {
            if (res.status >= 400) {
                const errorMessage = `${res.status}:${res.statusText}`
                throw new Error(errorMessage)
            }
            return res.text()
        })
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
export const deleteUrl = (url) => {
    return fetch(url, {
        headers: {"Content-Type": "application/json"},
        credentials: 'include',
        method: 'DELETE'
    })
        .then(res => {
            if (res.status >= 400) {
                const errorMessage = `${res.status}:${res.statusText}`
                throw new Error(errorMessage)
            }
            return res.text()
        })
}
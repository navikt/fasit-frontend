import fetch from 'isomorphic-fetch'

export const checkAuthentication = (user, accesscontrol) => {
    if (user.authenticated)
        return true
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

export const putUrl = (url, content) => {
    return fetch(url, {
        headers: {"Content-Type": "application/json"},
        credentials: 'include',
        method: 'PUT',
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

export const postUrl = (url, body) => {
    return fetch(url, {
        headers: {"Content-Type": "application/json"},
        credentials: 'include',
        method: 'POST',
        body
        //body: JSON.stringify(form)
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

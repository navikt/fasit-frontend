import fetch from 'isomorphic-fetch'

export const checkAuthentication = (user, accesscontrol) => {
    if (user.authenticated)
        return true
}
export const fetchUrl = (url) => {
    return fetch(url, {
        credentials: 'include',
        mode: 'cors'
    })
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
        credentials: 'same-origin',
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
        credentials: 'same-origin',
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
        //credentials: 'include',
        //mode: 'cors',
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
        credentials: 'same-origin',
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
export const oldSchool = (url, form) => {
    console.log("form", form)
    var req = new XMLHttpRequest();

    req.onreadystatechange = function () {
        console.log(this.responseText)
    }
    req.open("POST", url, true);
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    req.send(form);
}
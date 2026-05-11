export function validAuthorization(user, accesscontrol) {
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

function hasGroup(user, groups) {
    if (user.roles.indexOf("ROLE_SUPERUSER" > -1)) return true
    for (let i = 0; i < user.groups.length; i++) {
        if (groups.indexOf(user.groups[i]) !== -1) return true
    }
}

function hasRole(user, roles) {
    for (let i = 0; i < user.roles.length; i++) {
        if (roles.indexOf(user.roles[i]) !== -1) return true
    }
}

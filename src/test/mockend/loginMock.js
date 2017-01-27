module.exports = {
    getLogin: () => {
        user = {
            "identity": "mockUser",
            "roles": [
                "ROLE_PROD_OPERATIONS",
                "ROLE_SUPERUSER",
                "ROLE_SELFSERVICE",
                "ROLE_USER"
            ],
            "authenticated": true,
            "displayname": "Mock User",
            "groups": [
                "Group1",
                "Group2",
                "Group3"
            ]
        }
        return "Mock user logged in"

    },
    getLogout: () => {
        user = {authenticated:false}
        return "Mock user logged out"

    },
    getUser: () => user
}
let user = {authenticated:false}
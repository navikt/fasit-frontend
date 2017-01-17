export const truncate = (string, maxLength)  => {
    const truncated = string.slice(0, maxLength)
    return string.length !== truncated.length ? truncated + "..." : string
}

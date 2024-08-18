export const load = (key) => {
    return JSON.parse(localStorage.getItem(key))
}

export const dump = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}
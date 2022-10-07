const makeOptions = (method, body) => {
    const opts = {
        method: method,
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        }
    }
    if (body) {
        opts.body = JSON.stringify(body)
    }
    return opts
}

const handleHttpErrors = (res) => {
    if (!res.ok) {
        return Promise.reject({
            status: res.status,
            fullError: res.json()
        })
    }
    return res.json()
}
const getAllZipCodes = () => {
    return fetch("https://cphcn332.dk/ca1_application/api/cityinfo")
        .then(handleHttpErrors)
}

const addressFacade = {
    getAllZipCodes
}

export default addressFacade
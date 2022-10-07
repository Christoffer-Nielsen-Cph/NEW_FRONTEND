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
const getAllHobbies = () => {
    return fetch("https://cphcn332.dk/ca1_application/api/hobby")
        .then(handleHttpErrors)
}
const getAmountFromSpecificHobby = (hobbyName) => {
    return fetch ("https://cphcn332.dk/ca1_application/api/hobby/amount/{description}")
        .then(handleHttpErrors)

}

const hobbyFacade = {
    getAllHobbies,
    getAmountFromSpecificHobby
}

export default hobbyFacade
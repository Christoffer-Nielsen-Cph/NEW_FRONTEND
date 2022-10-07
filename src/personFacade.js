import {SERVER_URL} from '../constants'
const errorMessageFindAllPersons = document.getElementById("errorMsgFindAllPersons")

const getAllPersons = () => {
    return fetch(SERVER_URL+"/all")
        .then(handleHttpErrors)
        .then(persons => {
            const arr = persons.map(row =>
                `<tr> 
            <td>${row.id}</td>
            <td>${row.email}</td>
            <td>${row.firstName}</td>
            <td>${row.lastName}</td>
            <td>${row.phones.map(phone => {
                    return phone.number
                })}</td> 
            <td>${row.hobbies.map(hobby => {
                    return hobby.description
                })}</td>
          </tr>`).join("")
            document.getElementById("tableBody").innerHTML = arr
        })
        .catch(err => {
            if (err.status) {
                err.fullError.then(e => errorMessageFindAllPersons.innerText = e.msg)
            } else {
                errorMessageFindAllPersons.innerText = "Network error"
            }
        })
}

const addPerson = () => {
    const AddPersonSuccess = document.getElementById("AddPersonSuccess")
    const inputNewPersonEmail = document.getElementById("addEmail")
    const inputNewPersonFName = document.getElementById("addFirstName")
    const inputNewPersonLName = document.getElementById("addLastName")

    const jsonPerson = {
        email: inputNewPersonEmail.value,
        firstName: inputNewPersonFName.value,
        lastName: inputNewPersonLName.value

    }
    const options = makeOptions("POST",jsonPerson)
    fetch(SERVER_URL+"/addperson", options)
        .then((response) => response.json())
        .then((data) => (AddPersonSuccess.innerHTML = "You've successfully added a person!"))
        .then(getAllPersons);
}


const deletePerson = () => {
    const DeletePersonSuccess = document.getElementById("DeletePersonSuccess")
    const options = makeOptions("DELETE")
    const deletePersonInput = document.getElementById("deletePersonId")
    fetch(SERVER_URL+"/"+deletePersonInput.value,options)
        .then((response) => response.json())
        .then((data) => (DeletePersonSuccess.innerHTML = "You've successfully deleted a person!"))
        .then(getAllPersons);
}


function makeOptions(method, body) {
    var opts =  {
        method: method,
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        }
    }
    if(body){
        opts.body = JSON.stringify(body);
    }
    return opts;
}

function handleHttpErrors(res){
    if(!res.ok){
        return Promise.reject({status: res.status, fullError: res.json() })
    }
    return res.json();
}

const personFacade = {
    getAllPersons,
    deletePerson,
    addPerson,
};

export default personFacade;
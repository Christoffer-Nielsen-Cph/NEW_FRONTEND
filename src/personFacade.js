import {SERVER_URL} from '../constants'

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

const getAllPersons = () => {
    return fetch(SERVER_URL+"/all")
        .then(handleHttpErrors)
}

function getPersonById(id){
    return fetch(SERVER_URL+"/"+id)
        .then(handleHttpErrors);
};

function getPersonByPhoneNumber(phoneNumber){
    return fetch(SERVER_URL+"/byPhoneNumber/"+phoneNumber)
        .then(handleHttpErrors);
};

function getPersonsByZip(zip){
    return fetch(SERVER_URL+"/byZip/"+zip)
        .then(handleHttpErrors);
};

function countPersonsWithHobby(hobby){
    return fetch(SERVER_URL+"/hobbyCount/"+hobby)
        .then(handleHttpErrors);
};

const addPerson = () => {
    const addForm = document.getElementById("AddPersonForm")
    var url = "http://localhost:8080/ca1_application_war_exploded/api/person/addperson"
    const AddPersonSuccess = document.getElementById("AddPersonSuccess")
    const inputNewPersonEmail = document.getElementById("addEmail")
    const inputNewPersonFName = document.getElementById("addFirstName")
    const inputNewPersonLName = document.getElementById("addLastName")

    const jsonPerson = {
        email: inputNewPersonEmail.value,
        firstName: inputNewPersonFName.value,
        lastName: inputNewPersonLName.value

    }
    console.log(JSON.stringify(jsonPerson))
    const options = makeOptions("POST",jsonPerson)
    fetch(url, options)
        .then((response) => response.json())
        .then((data) => (AddPersonSuccess.innerHTML = "You've successfully added a person!"));
}


function handleHttpErrors(res){
    if(!res.ok){
        return Promise.reject({status: res.status, fullError: res.json() })
    }
    return res.json();
}




const personFacade = {
    getAllPersons,
    getPersonById,
    getPersonByPhoneNumber,
    getPersonsByZip,
    countPersonsWithHobby,
    addPerson,
};

export default personFacade;
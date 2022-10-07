import "./style.css"
import "bootstrap/dist/css/bootstrap.css"
import * as bootstrap from 'bootstrap';
import '@popperjs/core';
import personFacade from "./personFacade";
import hobbyFacade from "./hobbyFacade";
import addressFacade from "./addressFacade";
import {SERVER_URL} from "../constants";

document.getElementById("all-content").style.display = "block"

const errorMessageFindAllHobbies = document.getElementById("errorMsgFindAllHobbies")
const addPersonButton = document.getElementById("addPersonButton")
const deletePersonButton = document.getElementById("deletePersonButton")



/* 
  Add your JavaScript for all exercises Below or in separate js-files, which you must the import above
*/

/* JS For Person below */

deletePersonButton.addEventListener("click",personFacade.deletePerson)
addPersonButton.addEventListener("click", personFacade.addPerson);

/* JS For Hobbies below */
const getAllHobbies = () => {
    hobbyFacade.getAllHobbies()
        .then(hobbies => {
            const arr = hobbies.map(row =>
            `<tr> 
            <td>${row.id}</td>
            <td>${row.description}</td>
            <td>${row.people.map(person => {
                return person.firstName +" "+ person.lastName 
            })}</td>
          </tr>`).join("")
            document.getElementById("hobbyTableBody").innerHTML = arr
        })
        .catch(err => {
            if (err.status) {
                err.fullError.then(e => errorMessageFindAllHobbies.innerText = e.msg)
            } else {
                errorMessageFindAllHobbies.innerText = "Network error"
            }
        })
}
getAllHobbies();
personFacade.getAllPersons();

/* JS For Addresses below */


/* 
Do NOT focus on the code below, UNLESS you want to use this code for something different than
the Period2-week2-day3 Exercises
*/

function hideAllShowOne(idToShow)
{
  document.getElementById("about_html").style = "display:none"
  document.getElementById("ex1_html").style = "display:none"
  document.getElementById("ex2_html").style = "display:none"
  document.getElementById("ex3_html").style = "display:none"
  document.getElementById(idToShow).style = "display:block"
}

function menuItemClicked(evt)
{
    const id = evt.target.id;
    switch (id)
    {
        case "ex1":

            hideAllShowOne("ex1_html");
            break

        case "ex2":

            hideAllShowOne("ex2_html");
        break

        case "ex3":
            hideAllShowOne("ex3_html");
            break
        default: hideAllShowOne("about_html"); break
    }
    evt.preventDefault();
}
document.getElementById("menu").onclick = menuItemClicked;
hideAllShowOne("about_html");



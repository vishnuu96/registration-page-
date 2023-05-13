const form = document.querySelector("#my-form")
let editInd = document.querySelector("#editInd").value
const parentElem = document.querySelector("#listOfitems")
const childElem = document.createElement("li")
form.addEventListener("submit", (e) => {
    e.preventDefault()
    const name = e.target.name.value
    const email = e.target.email.value
    const number = e.target.phone.value

    if (editInd === '') {
        const person = {
            name: name,
            email: email,
            number: number,

        }

        axios.post("https://crudcrud.com/api/7bb8b55dd1aa45d0a27a8091aaa1c4e0/appointmentData", person)
            .then((response) => {
                showOnscreen(response.data)
                console.log(response)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    else {
        const person1 = {
            name: name,
            email: email,
            number: number,

        }

        axios.put(`https://crudcrud.com/api/7bb8b55dd1aa45d0a27a8091aaa1c4e0/appointmentData/${editInd}`, person1)
            .then(() => {
                axios.get(`https://crudcrud.com/api/7bb8b55dd1aa45d0a27a8091aaa1c4e0/appointmentData/${editInd}`, person1)
                    .then((response) => {
                     showOnscreen(response.data)
                    })
            })
    }

})
function showOnscreen(person) {
    const parentElem = document.querySelector("#listOfitems")
    const childElem = document.createElement("li")

    childElem.textContent = "id:" + person._id + "name: " + person.name + " email: " + person.email + " number:  " + person.number

    const deletebtn = document.createElement("input")
    deletebtn.type = "button"
    deletebtn.value = "delete"


    const editbtn = document.createElement("input")
    editbtn.type = "button"
    editbtn.value = "edit"

    childElem.appendChild(deletebtn)
    childElem.appendChild(editbtn)

    parentElem.appendChild(childElem)


    deletebtn.onclick = () => {
        axios.delete(`https://crudcrud.com/api/7bb8b55dd1aa45d0a27a8091aaa1c4e0/appointmentData/${person._id}`)
            .then((response) => {
                parentElem.removeChild(childElem)

            })
            .catch((err) => {
                console.log(err)
            })
    }
    editbtn.onclick = () => {
        axios.get(`https://crudcrud.com/api/7bb8b55dd1aa45d0a27a8091aaa1c4e0/appointmentData/${person._id}`)
            .then((response) => {
                editInd = response.data._id
                document.querySelector('#name').value = response.data.name;
                document.querySelector('#email').value = response.data.email
                document.querySelector('#phone').value = response.data.number
                parentElem.removeChild(childElem)
            })
    }
}
window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/7bb8b55dd1aa45d0a27a8091aaa1c4e0/appointmentData")
        .then((response) => {
            for (let i = 0; i < response.data.length; i++) {
                showOnscreen(response.data[i])
            }
        })
        .catch((err) => {
            console.log(err)
        })
})




const form = document.querySelector("#my-form")
form.addEventListener("submit", (e) => {
    e.preventDefault()
    const name = e.target.name.value
    const email = e.target.email.value
    const number = e.target.phone.value
    const person = {
        name: name,
        email: email,
        number: number,
        
    }
    axios.post("https://crudcrud.com/api/8a8f567954894612add8108fe1ac785a/appointmentData", person)
        .then((response) => {
            showOnscreen(response.data)
            console.log(response)
        })
        .catch((err) => {
            console.log(err)
        })

})
async function showOnscreen(person) {
    const parentElem = document.querySelector("#listOfitems")
    const childElem = document.createElement("li")

    childElem.textContent ="id:"+person._id + "name: " + person.name + " email: " + person.email + " number:  " + person.number

    const deletebtn = document.createElement("input")
    deletebtn.type = "button"
    deletebtn.value = "delete"
    

    const editbtn = document.createElement("input")
    editbtn.type = "button"
    editbtn.value = "edit"

    childElem.appendChild(deletebtn)
    childElem.appendChild(editbtn)

    parentElem.appendChild(childElem)
  

    deletebtn.onclick =()=>{
         axios.delete(`https://crudcrud.com/api/8a8f567954894612add8108fe1ac785a/appointmentData/${person._id}`)
        .then((response)=>{
        parentElem.removeChild(childElem)
        
        })
        .catch((err)=>{
            console.log(err)
        })
}

    editbtn.onclick = () => {
        localStorage.removeItem(person.name)
        parentElem.removeChild(childElem)
        document.querySelector('#name').value = person.name;
        document.querySelector('#email').value = person.email
        document.querySelector('#phone').value = person.number
    }
}
window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/8a8f567954894612add8108fe1ac785a/appointmentData")
        .then((response) => {
            for (let i = 0; i < response.data.length; i++) {
                showOnscreen(response.data[i])
            }
        })
        .catch((err) => {
            console.log(err)
        })
})



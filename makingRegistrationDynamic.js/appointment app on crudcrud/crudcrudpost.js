const form=document.querySelector("#my-form")
form.addEventListener("submit",(e)=>{
    e.preventDefault()
    const name=e.target.name.value
    const email=e.target.email.value
    const number=e.target.phone.value
    const person={
        name:name,
        email:email,
        number:number
    }
    axios.post("https://crudcrud.com/api/9d9d17d908884f7aa113b1e00d39482a/appointmentData",person)
    .then((response)=>{
        showOnscreen(response.data)
        console.log(response)
    })
    .catch((err)=>{
        console.log(err)
    })
    // localStorage.setItem(person.name,JSON.stringify(person))
    // showOnscreen(person)

})
function showOnscreen(person){
    const parentElem=document.querySelector("#listOfitems")
    const childElem=document.createElement("li")
    // childElem.innerHTML=childElem.innerHTML+person.name+" "+person.email+" "+person.number
    childElem.textContent="name: "+person.name+" email: "+person.email+ " number:  "+person.number
   

    const deletebtn=document.createElement("input")
    deletebtn.type="button"
    deletebtn.value="delete"

    const editbtn=document.createElement("input")
    editbtn.type="button"
    editbtn.value="edit"

    childElem.appendChild(deletebtn)
    childElem.appendChild(editbtn)

    parentElem.appendChild(childElem)

    deletebtn.onclick=()=>{
       localStorage.removeItem(person.name)
       parentElem.removeChild(childElem)
    }

    editbtn.onclick=()=>{
        localStorage.removeItem(person.name)
       parentElem.removeChild(childElem)
       document.querySelector('#name').value=person.name;
       document.querySelector('#email').value=person.email
       document.querySelector('#phone').value=person.number
    }


}
window.addEventListener("DOMContentLoaded",()=>{
    const userDetails=localStorage
    const userDetailsKey=Object.keys(userDetails)
    for(let i=0;i<userDetailsKey.length;i++){
        const id=userDetailsKey[i]
        const user=userDetails[id]
        const userObj=JSON.parse(user)
        showOnscreen(userObj)
    }
})



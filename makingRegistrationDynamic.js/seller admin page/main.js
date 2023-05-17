const form = document.querySelector("#my-form")
// let editInd = document.querySelector("#editInd").value
const parentElem = document.querySelector("#listOfitems")
const childElem = document.createElement("li")
form.addEventListener("submit", (e) => {
    e.preventDefault()
    const price = e.target.selling.value
    const name = e.target.name.value
    const category = e.target.category.value


    const product = {
        price: price,
        name: name,
        category: category,

    }

    axios.post("https://crudcrud.com/api/61536dab679646c381ac4eada11f76aa/products", product)
        .then((response) => {
            showOnscreen(response.data)
            console.log(response)
        })
        .catch((err) => {
            console.log(err)
        })
})
function showOnscreen(product) {
    const parentElem = document.querySelector("#listOfitems")
    const childElem = document.createElement("li")

    childElem.textContent =  product.price + "-" + product.name + "-"+ product.category

    const deletebtn = document.createElement("input")
    deletebtn.type = "button"
    deletebtn.value = "delete"

   childElem.appendChild(deletebtn)
parentElem.appendChild(childElem)

const headingCategory = document.getElementById(product.category);
headingCategory.insertAdjacentElement('afterend', childElem);

    deletebtn.onclick = () => {
        axios.delete(`https://crudcrud.com/api/61536dab679646c381ac4eada11f76aa/products/${product._id}`)
            .then((response) => {
                // parentElem.removeChild(childElem)
                childElem.remove()

            })
            .catch((err) => {
                console.log(err)
            })
    }
}
window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/61536dab679646c381ac4eada11f76aa/products")
        .then((response) => {
            for (let i = 0; i < response.data.length; i++) {
                showOnscreen(response.data[i])
            }
        })
        .catch((err) => {
            console.log(err)
        })
})




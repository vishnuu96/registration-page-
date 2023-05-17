const form = document.querySelector("#my-form")
const parentElement = document.getElementById('listOfCandies')
const childElem = document.createElement('li')
// adding eventlistener on submit
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const description = event.target.description.value;
    const price = event.target.price.value;
    const qty = event.target.quantity.value;

    const object = {
        name: name,
        description: description,
        price: price,
        qty: qty
    }
//  to post the data to crudcrud
    axios.post("https://crudcrud.com/api/3e8e073252b542bdbe1c30d7140760cb/candies", object)
        .then((response) => {
            showCandyOnScreen(response.data);
            console.log(response.data);
        })
        .catch((err) => {
            console.log(err)
        })
})

// showing candies on screen
function showCandyOnScreen(obj) {
    const parentElement = document.getElementById('listOfCandies')
    const childElem = document.createElement('li')
    childElem.textContent = obj.name + '-' + obj.description + '-' + obj.price + '-' + obj.qty

    // creating buy one button one and functionality to update the quantity value in crudcrud
    const buyOne = document.createElement('input')
    buyOne.type = 'button'
    buyOne.value = 'buy One'
    buyOne.onclick = () => {
        obj.qty -= 1;
        var temp = {
            name: obj.name,
            price: obj.price,
            description: obj.description,
            qty: `${obj.qty}`
        }
        axios.put(`https://crudcrud.com/api/3e8e073252b542bdbe1c30d7140760cb/candies/${obj._id}`, temp)
            .then(() => {
                childElem.textContent = temp.name + '-' + temp.description + '-' + temp.price + '-' + temp.qty
                childElem.appendChild(buyOne)
                childElem.appendChild(buyTwo)
                childElem.appendChild(buyThree)
                parentElement.appendChild(childElem)
            })
    }

 // creating buy two button  and functionality to update the quantity value in crudcrud
    const buyTwo = document.createElement('input')
    buyTwo.type = 'button'
    buyTwo.value = 'buy Two'
    buyTwo.onclick = () => {
        obj.qty -= 2;
        var temp = {
            name: obj.name,
            price: obj.price,
            description: obj.description,
            qty: `${obj.qty}`
        }
        axios.put(`https://crudcrud.com/api/3e8e073252b542bdbe1c30d7140760cb/candies/${obj._id}`, temp)
        .then(()=>{
        childElem.textContent = temp.name + '-' + temp.description + '-' + temp.price + '-' + temp.qty;
        childElem.appendChild(buyOne)
        childElem.appendChild(buyTwo)
        childElem.appendChild(buyThree)
        parentElement.appendChild(childElem)
    })
    }

    // creating buy two button  and functionality to update the quantity value in crudcrud
    const buyThree = document.createElement('input')
    buyThree.type = 'button'
    buyThree.value = 'buy Three'
    buyThree.onclick = () => {
        obj.qty -= 3;
        var temp = {
            name: obj.name,
            price: obj.price,
            description: obj.description,
            qty: `${obj.qty}`
        }
        axios.put(`https://crudcrud.com/api/3e8e073252b542bdbe1c30d7140760cb/candies/${obj._id}`, temp)
        .then(()=>{
        childElem.textContent = temp.name + '-' + temp.description + '-' + temp.price + '-' + temp.qty;
        childElem.appendChild(buyOne)
        childElem.appendChild(buyTwo)
        childElem.appendChild(buyThree)
        parentElement.appendChild(childElem)
    })
    }

    childElem.appendChild(buyOne)
    childElem.appendChild(buyTwo)
    childElem.appendChild(buyThree)
    parentElement.appendChild(childElem)
}
// to show the candies on reloading
window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/3e8e073252b542bdbe1c30d7140760cb/candies")
        .then((response) => {
            console.log(response.data);

            for (var i = 0; i < response.data.length; i++) {
                showCandyOnScreen(response.data[i]);
            }
        })
        .catch((err) => {
            console.log(err);
        })

})





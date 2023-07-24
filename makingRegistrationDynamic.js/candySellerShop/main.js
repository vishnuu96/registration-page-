const form = document.querySelector("#my-form")
const parentElement = document.getElementById('listOfCandies')
// adding eventlistener on submit
form.addEventListener("submit", async (event) => {
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
try {
    const response = await axios.post("https://crudcrud.com/api/77bca05a84ea4d70ab43ad21c6868ad3/candies", object);
    showCandyOnScreen(response.data);
    console.log(response.data);
} catch (err) {
    console.log(err);
}
});

// showing candies on screen
  function showCandyOnScreen(obj) {
    const parentElement = document.getElementById('listOfCandies')
    // creating table row element
    let row = document.createElement('tr')
    // creating table cells
    let nameCell = document.createElement('td')
    let priceCell = document.createElement('td')
    let descriptionCell = document.createElement('td')
    let quantityCell = document.createElement('td')
    let buyOneCell = document.createElement('td')
    let buyTwoCell = document.createElement('td')
    let buyThreeCell = document.createElement('td')
    
    nameCell.textContent = obj.name;
    descriptionCell.textContent = obj.description;
    priceCell.textContent = obj.price;
    quantityCell.textContent = obj.qty;
    // creating buy one button one and functionality to update the quantity value in crudcrud
    const buyOne = document.createElement('input')
    buyOne.type = 'button'
    buyOne.value = 'Buy One'
    buyOne.className="btn btn-success"
    buyOne.onclick =async () => {
        obj.qty = obj.qty-1;
        let temp = {
            name: obj.name,
            price: obj.price,
            description: obj.description,
            qty: `${obj.qty}`
        }

        try{
            await axios.put(`https://crudcrud.com/api/77bca05a84ea4d70ab43ad21c6868ad3/candies/${obj._id}`, temp)
            quantityCell.textContent = temp.qty;
        }
        catch (err){
            console.log(err)
        }
        
            
    }

 // creating buy two button  and functionality to update the quantity value in crudcrud
    const buyTwo = document.createElement('input')
    buyTwo.type = 'button'
    buyTwo.value = 'Buy Two'
    buyTwo.className="btn btn-success"
    buyTwo.onclick = async () => {
        obj.qty = obj.qty - 2;
        let temp = {
            name: obj.name,
            price: obj.price,
            description: obj.description,
            qty: `${obj.qty}`
        }

        try{
            await  axios.put(`https://crudcrud.com/api/77bca05a84ea4d70ab43ad21c6868ad3/candies/${obj._id}`, temp)
            quantityCell.textContent = temp.qty;
        }
       catch(err){
        console.log(err)
       }
    }

    // creating buy two button  and functionality to update the quantity value in crudcrud
    const buyThree = document.createElement('input')
    buyThree.type = 'button'
    buyThree.value = 'Buy Three'
    buyThree.className="btn btn-success"
    buyThree.onclick = async () => {
        obj.qty = obj.qty-3;
        let temp = {
            name: obj.name,
            price: obj.price,
            description: obj.description,
            qty: `${obj.qty}`
        }

        try{
            await axios.put(`https://crudcrud.com/api/77bca05a84ea4d70ab43ad21c6868ad3/candies/${obj._id}`, temp)
            quantityCell.textContent = temp.qty;
        }
        catch(err){
            console.log(err)
        }
    }

    buyOneCell.appendChild(buyOne)
    buyTwoCell.appendChild(buyTwo)
    buyThreeCell.appendChild(buyThree)

    row.appendChild(nameCell);
    row.appendChild(descriptionCell);
    row.appendChild(priceCell);
    row.appendChild(quantityCell);
    row.appendChild(buyOneCell);
    row.appendChild(buyTwoCell);
    row.appendChild(buyThreeCell);
 
    parentElement.appendChild(row);
    
}
// to show the candies on reloading
window.addEventListener("DOMContentLoaded", async () => {
    try{
       const response= await axios.get("https://crudcrud.com/api/77bca05a84ea4d70ab43ad21c6868ad3/candies")
    
       for (var i = 0; i < response.data.length; i++) {
        showCandyOnScreen(response.data[i]);
       }
    }
    catch{(err) => {
            console.log(err);
        }}

})





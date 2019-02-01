const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
let toyId
document.addEventListener("DOMContentLoaded", () =>{

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

function fetchToys(){
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(toys => toys.forEach(displayToys))
}

function displayToys(toy){
  toyCollection  = document.getElementById("toy-collection")
  let toyCard = document.createElement('div')
  toyCollection.append(toyCard)
  toyCard.innerHTML =  `<div id=${toy.id} class="card">
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes}</p>
    <button class="like-btn">Like <3</button>
    <button class="delete-btn">Delete <3</button>
  </div>`

toyCard.addEventListener('click', updateToy)
}

let form = document.getElementById('toy-form')
console.log(form)
let butn = form.querySelector('.submit')
console.log(butn)

butn.addEventListener('click', createToys)

function createToys(e){
e.preventDefault()

console.log('in creation')

let nameInput = e.target.parentElement[0].value
let imageUrl = e.target.parentElement[1].value

fetch('http://localhost:3000/toys', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({name: nameInput, image: imageUrl, likes: 0})
      })
.then(res => res.json())
.then(toy => displayToys(toy))
}

function updateToy(e){
  if(e.target.className === "like-btn")
  increaseLikes(e)
  else if (e.target.className === "delete-btn")
  deleteToy(e)
}

function deleteToy(e){
  e.target.parentElement.remove()
  toyId = e.target.parentElement.id
  fetch(`http://localhost:3000/toys/${toyId}`, {
          method: "DELETE",
    })
  .then(res => res.json())
}

function increaseLikes(e){
e.target.previousElementSibling.innerText++
toyId = e.target.parentElement.id
fetch(`http://localhost:3000/toys/${toyId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({likes: e.target.previousElementSibling.innerText})
      })
.then(res => res.json())
.then(console.log('liked'))
}


fetchToys()
})


// OR HERE!

const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

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


// OR HERE!
function getToys(){
  return fetch('http://localhost:3000/toys')
  .then(res => res.json())
}

function toyIterator(allToysArray, toyCollection){
  toyCollection.innerHTML = allToysArray.map(addToysHTML).join('')
}


function addToysHTML(toy){
  return (`
    <div class="card" data-toy-id="${toy.id}">
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p >${toy.likes}</p>
      <button class="like-btn">Like <3</button>
    </div>
    `)
}

function addLikeEvent(toyCollection){
  toyCollection.addEventListener('click', likeBtnClicked)
}

function likeBtnClicked(){
  if (event.target.classList.contains("like-btn")) {
   let currentLikesLocation = event.target.parentNode.querySelector('p')
   let currentLikes = parseInt(currentLikesLocation.innerText)
   let currentToyId = event.target.parentNode.dataset.toyId
   currentLikes++

   toyInfo = {
     id: currentToyId,
     likes: currentLikes
   }

   incrementToyLikes(toyInfo, currentLikesLocation)
  }
}

function incrementToyLikes(toyInfo, currentLikesLocation){
  fetch(`http://localhost:3000/toys/${toyInfo.id}`,{
    method: "PATCH",
    body: JSON.stringify(toyInfo),
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  }).then(res => res.json()).then(data => addLikesToDom(toyInfo, currentLikesLocation))

}

function addLikesToDom(toyInfo, currentLikesLocation){
  currentLikesLocation.innerText = toyInfo.likes
}


function newToy(toyCollection){
  addToyForm = document.querySelector(".add-toy-form")
  // debugger
  addToyForm.addEventListener("submit", (event) => {
    // if (event.target.classList.contains("add-toy-form")) {
    event.preventDefault()
    postNewToy(addNewToy(), toyCollection)
    // }
  })
   // console.log(addToyBtn)
}

function addNewToy(){
  nameField = document.getElementById("nameField").value
  imageField = document.getElementById("imageField").value
  newToyInfo = {
    name: nameField,
    image: imageField,
    likes: 0
  }
  return newToyInfo
  // console.log(nameField)
  // console.log(imageField)
}

function postNewToy(newToyInfo,toyCollection){
  fetch("http://localhost:3000/toys",{
    method: "POST",
    body: JSON.stringify(newToyInfo),
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  }).then(res => res.json()).then(data => addNewToyToDom(data,toyCollection))
}

function addNewToyToDom(data, toyCollection){
  toyCollection.innerHTML += addToysHTML(data)
}


document.addEventListener('DOMContentLoaded', async() =>{
  const toyCollection = document.getElementById("toy-collection")
  const allToysArray = await getToys();

  // console.log(allToysArray)
  toyIterator(allToysArray, toyCollection);
  addLikeEvent(toyCollection)
  newToy(toyCollection)

})

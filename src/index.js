// document.addEventListener("DOMContentLoaded", (event) => {
//   console.log("working")
// })

const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let toyURL =  "http://localhost:3000/toys"
let toyCollection = document.querySelector("#toy-collection")
let submitToy = document.querySelector("#submit-toy")
let likeButton = document.querySelector(".like-btn")



let addToy = false

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

fetch(toyURL)
.then(res => res.json())
// .then(console.log)
.then(toys => toys.forEach(displayToy))

function displayToy(toy) {
  // console.log(toy)
  toyCollection.innerHTML +=
  `
  <div class="card">
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar" />
    <p id="like-${toy.id}">${toy.likes}</p>
    <button data-id="${toy.id}" class="like-btn">like</button>
  </div>`

}

document.addEventListener("click", (e) => {
  e.preventDefault()
  // console.log("hey")
  if(e.target.id === "submit-toy"){
    // console.log("submit")
    createToy(e)
  }
  else if(e.target.className === "like-btn"){
    // console.log("liked")
    likeToy(e)
  }

})


function createToy(e) {
  let nameInput = document.querySelector("#name-input").value
  let imageInput = document.querySelector("#image-input").value
  fetch(toyURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify ({
      name: nameInput,
      image: imageInput,
      likes: 0
    })
  })
  .then(res => res.json())
  .then(displayToy)
}

function likeToy(e) {
  // console.log(e.target.dataset.id)
  let id = e.target.dataset.id
  // console.log(id)
  // let likeCount = document.querySelector(`p#like-${id}`)
  let likes = parseInt(document.querySelector(`p#like-${id}`).innerText)
  likes = likes + 1
  // likeCount.innerText = likes
  // document.querySelector(`p#like-${id}`).innerText = likes
  // console.log(likes)
  fetch(`${toyURL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      likes: likes
    })
  })
  .then(res => res.json())
  .then(toy => {
  document.querySelector(`p#like-${id}`).innerText = toy.likes
  })

}

// document.addEventListener("DOMContentLoaded", () => {
//   console.log("yep")
// })

const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')

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


const toysURL = `http://localhost:3000/toys`
let toyCollection = document.querySelector("#toy-collection")


fetch(toysURL)
.then(res => res.json())
// .then(console.log)
.then(toys => {
  toys.forEach(displayToy)
})

function displayToy(toy) {
  // console.log(toy)
  toyCollection.innerHTML += `
    <div id="card-${toy.id}" class="card">
      <h2>${toy.name}</h2>
      <img src="${toy.image}" class="toy-avatar" />
      <p data-id=${toy.id}>${toy.likes} likes</p>
      <button data-id=${toy.id} id="toy-likes" class="like-btn">Like <3</button>
    </div>
    `
}

document.addEventListener("click", (e) => {
  e.preventDefault()
  // console.log(e.target.id)
  // console.log(e.target)
  if (e.target.id === "create-toy-btn"){
    // console.log("hi")
    createToy(e)
  }
  else if(e.target.className === "like-btn")
  // console.log("hi")
    updateLike(e)
})

function createToy(e) {
  // console.log(e.target)
  let nameInput = document.querySelector("#name-input").value
  // console.log(nameInput.value)
  let imageInput = document.querySelector("#image-input").value
  // console.log(imageInput.value)
  // console.log(nameInput)
  // console.log(imageInput)

  fetch(toysURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: nameInput,
      image: imageInput,
      likes: 0
    })
  })
  .then(res => res.json())
  .then(displayToy)
}

function updateLike(e) {
  let id = (e.target.dataset.id)
  // console.log(id)
  let p = document.querySelector(`div #card-${id} p`)
  let likeNumber = p.innerText
  // console.log(likeNumber)
  let updatedNumber = parseInt(likeNumber) + 1
  // console.log(updatedNumber)
  likeNumber = updatedNumber
  // console.log(likeNumber)

  // p.innerText = `${likeNumber} likes`


  fetch(`${toysURL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      likes: likeNumber
    })
  })
  .then(res => res.json())
  .then(p.innerText = `${likeNumber} likes`)





}

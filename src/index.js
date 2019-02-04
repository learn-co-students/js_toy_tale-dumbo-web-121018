const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyFormForm = document.querySelector('.toy-form')
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


// STEP 2: GET Request to fetch all of toy objects


function fetchToys(){
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(toys => toys.forEach(displayToys))
}
fetchToys()


function displayToys(toy){
  toyCollection  = document.getElementById("toy-collection")
  let toyCard = document.createElement('div')
  toyCollection.append(toyCard)
  toyCard.innerHTML =  `<div class="card">
    <h2>"${toy.name}"</h2>
    <img src="${toy.image}" class="toy-avatar" />
    <p>"${toy.likes} Likes" </p>
    <button class="like-btn">Like <3</button>
  </div>`
  // console.log(toy)
}

toyForm.addEventListener("submit", () => {
  event.preventDefault()
  // console.log(event.target.name.value)
  let name = event.target.name.value
  // console.log(event.target.image.value)
  let image = event.target.image.value

  function resetForm() {
    toyFormForm.reset()
  }
  resetForm()

// })
//
fetch("http://localhost:3000/toys", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify({
    name,
    image
  })
})


.then(res => res.json())
.then(toy => displayToys(toy))
})




// console.log(toy)
// console.log(name)
// console.log(image)


// OR HERE!

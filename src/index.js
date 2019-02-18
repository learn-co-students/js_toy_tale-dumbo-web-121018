const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const form = toyForm.children[0]
const toyCollection = document.querySelector('#toy-collection')
const toysURL = 'http://localhost:3000/toys'
let addToy = false

// YOUR CODE HERE
function slapToysOnDom (toys) {
  toys.forEach(toy => {
    let div = document.createElement('div')
    div.className = 'card'
    div.dataset.id = toy.id
    div.innerHTML =
      `<h2>${toy.name}</h2>
      <img src="${toy.image}" class="toy-avatar" />
      <p>${toy.likes} Likes </p>
      <button class="like-btn">Like <3</button>`
    toyCollection.append(div)
  })
}

fetch(toysURL)
  .then(res => res.json())
  .then(slapToysOnDom)

form.addEventListener('submit', e => {
  e.preventDefault()
  const name = form.name.value
  const image = form.image.value
  const likes = 0
  fetch(toysURL, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name,
      image,
      likes
    })
  })
    .then(res => res.json())
    .then(toy => {
      toyCollection.innerHTML +=
        `<div class="card" data-id="${toy.id}">
          <h2>${toy.name}</h2>
          <img src="${toy.image}" class="toy-avatar" />
          <p>${toy.likes} Likes</p>
          <button class="like-btn">Like <3</button>
        </div>`
    })
  form.name.value = ''
  form.image.value = ''
})

toyCollection.addEventListener('click', e => {
  if (e.target.className === 'like-btn') {
    let toyLikes = e.target.parentNode.children[2].innerText.split(' ')[0]
    e.target.parentNode.children[2].innerText = `${parseInt(toyLikes) + 1} Likes`
    const toyId = e.target.parentNode.dataset.id
    fetch(toysURL + `/${toyId}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        likes: parseInt(toyLikes) + 1
      })
    })
  }
})

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

const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.getElementById("toy-collection")
let addToy = false

const formCallback = event => {
  event.preventDefault();
  let name = toyForm.querySelector("input[name='name']")
  let image = toyForm.querySelector("input[name='image']")

  fetch("http://localhost:3000/toys", {
    method: "POST",
    body: JSON.stringify({name: name.value, image: image.value, likes: 0}),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.json())
  .then(data => {
    name.value = ""
    image.value = ""
    addOneToyCard(data)
  })
}

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    toyForm.addEventListener("submit", formCallback)
  } else {
    toyForm.style.display = 'none'
  }
})

const addOneToyCard = toy => {
  string = `<div class="card">
  <h2>${toy.name}</h2>
  <img src="${toy.image}" class="toy-avatar" />
  <p><span data-id="${toy.id}">${toy.likes}</span> Likes </p>
  <button class="like-btn" data-id="${toy.id}">Like <3</button>
</div>`
  toyCollection.innerHTML += string
}

const populateToyCollection = data => {
  data.forEach(addOneToyCard)
}

const fetchToys = () => {
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(data => populateToyCollection(data))
}

const runFetchPatchForLikes = (toyId, newLikesAmount) => {
  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: "PATCH",
    body: JSON.stringify({likes: newLikesAmount}),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.json())
  .then(data => {
    let likesSpan = document.querySelector(`span[data-id="${toyId}"]`)
    likesSpan.innerText = data.likes
  })
}

toyCollection.addEventListener("click", event => {
  if (event.target.classList.contains("like-btn")) {
    let amountOfLikes = event.target.parentNode.querySelector("span").innerText
    amountOfLikes = parseInt(amountOfLikes) + 1
    runFetchPatchForLikes(event.target.dataset.id, amountOfLikes)
  }
})

fetchToys();

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

const toyUrl = "http://localhost:3000/toys"
// -------------------------- YOUR CODE HERE --------------------------


// Variables ----------------------------------------------------------
let toyCollection = document.querySelector("#toy-collection")
const newToyBtn = document.querySelector('#new-toy-btn')
// --------------------------------------------------------------------


// GET ALL TOYS ON DOM ---------------------------------------------
fetch(toyUrl)
  .then(res => res.json())
  .then(toys => toys.forEach(getToyOnDom))

function getToyOnDom(toy) {
  let toyDiv = document.createElement('div')
  toyDiv.setAttribute('class','card')
  toyDiv.innerHTML = `<h2>${toy.name}</h2>
  <img src=${toy.image} class="toy-avatar" />
  <p class="likes">${toy.likes} Likes </p>
  <button class="like-btn" data-id="${toy.id}">Like <3</button>`

  toyCollection.prepend(toyDiv)
}

// CREATE NEW TOY ---------------------------------------------
toyForm.addEventListener('submit', createNewToy)

function createNewToy(event) {
  event.preventDefault();
  let name = event.target.name.value
  let image = event.target.image.value

  let newToy = {
  "name": name,
  "image": image,
  "likes": 0
  }

// optimistic rendering first
  getToyOnDom(newToy);

  fetch(toyUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(newToy)
  })
  // would have saved to the database first (need to refresh to see new toy)
    // .then(res => res.json())
    // .then(toy => getToysOnDom)
// -----------------------------------------------------------------------------
}


// INCREASE LIKES --------------------------------------------------------------
toyCollection.addEventListener('click', increaseLikes)

function increaseLikes(event) {
  if (event.target.classList.contains('like-btn')) {
    // optimistic rendering (right now, only updates in browser)
    const id = event.target.dataset.id;
    // likes => <p> tag with toy's number of likes
    let likes = event.target.parentElement.querySelector('.likes');
    let newLikeCount = parseInt(likes.innerText) + 1
    likes.innerText = `${newLikeCount} Likes`
    // console.log(event.target.previousElementSibling);

    // make PERSISTENT
    return fetch(`${toyUrl}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": newLikeCount
      })
    })
      // .then(res => res.json())
      // .then(toy => {
      //   likes.innerText = `${likeCount + 1} Likes`
      // })
  }
}

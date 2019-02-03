const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.getElementById('toy-collection')
const toyURL = "http://localhost:3000/toys"

let addToy = false

function increaseLikes(toy) {
  console.log("increaseLikes run")
  fetch(`${toyURL}/${toy.id}`, {
    method: 'PATCH',
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      likes: toy.likes + 1
    })
  })
  .then(res => res.json())
  .then(data => getStarted())
}

function displayToys(data) {
  toyCollection.innerHTML = "";
  data.forEach(datum => {
    const toyDiv = document.createElement("div");
    toyDiv.className = "card";

    const toyName = document.createElement("h2");
    toyName.innerText = datum.name

    const toyImg = document.createElement("img");
    toyImg.src = datum.image
    toyImg.className = "toy-avatar"

    const toyP = document.createElement("p");
    toyP.innerText = `${datum.likes} likes`

    const toyBtn = document.createElement("button");
    toyBtn.className = "like-btn"
    toyBtn.innerText = "Like <3"
    toyBtn.addEventListener("click", () => increaseLikes(datum))

    toyDiv.appendChild(toyName)
    toyDiv.appendChild(toyImg)
    toyDiv.appendChild(toyP)
    toyDiv.appendChild(toyBtn)
    toyCollection.appendChild(toyDiv)
  })
}

function getToys() {
  fetch(toyURL)
  .then(res => res.json())
  .then(data => displayToys(data))
}

function createToy(e) {
  e.preventDefault()
  const inputFields = document.getElementsByClassName("input-text")
  const newName = inputFields[0].value;
  const newImgURL = inputFields[1].value;
  fetch(toyURL, {
    method: 'post',
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      name: newName,
      image: newImgURL,
      likes: 0
    })
  }).then(res => res.json())
  .then(data => getToys())
}



function getStarted() {
  getToys()
  toyForm.addEventListener("submit", e => createToy(e))
}

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




document.addEventListener("DOMContentLoaded", getStarted)

document.addEventListener("DOMContentLoaded", () => {
// console.log("loaded")

  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const toyURL = `http://localhost:3000/toys`
  let toyCollection = document.querySelector("#toy-collection")

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
  .then(toys => toys.forEach(displayToy))

  function displayToy(toy) {
    toyCollection.innerHTML +=`
    <div class="card" data-id="${toy.id}">
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p data-id=${toy.id}> ${toy.likes} Likes</p>
      <button data-id=${toy.id} class="like-btn">Like <3</button>
    </div>
    `
  }


  document.addEventListener("click", (e) => {
    e.preventDefault()
    // console.log(e.target.id)
    if (e.target.id === "create-toy-btn"){
      // console.log("✌🏼")
      let nameInput = document.querySelector("#name-input").value
      let imageInput = document.querySelector("#image-input").value
      // console.log(nameInput)
      // console.log(imageInput)
      fetch(toyURL, {
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
  })
  document.addEventListener("click", (e) => {
    e.preventDefault()
    // console.log(e.target.className)
    if (e.target.className === "like-btn")
      // console.log("hey")
      likeToy(e)

  })

  function likeToy(e) {
    // console.log(e.target.dataset.id)
    // // let id = e.target.dataset.id
    // console.log(e.target.parentElement.dataset.id)

  //   fetch(`${toyURL}/${id}`, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json"
  //     },
  //     body: JSON.stringify({likes: })
  //   }
  // .then(res => res.json())
  // .then(console.log)
}
})










function increaseLike(e) {
  // console.log(e.target)
  let id = e.target.dataset.id
  // console.log(id)
  // console.log(document.querySelector(`div #card-${id}`))
  // console.log(document.querySelector(`div #card-${id} p`))
  let p = document.querySelector(`div #card-${id} p`)
  let number = parseInt(p.innerText)
  // console.log(number)
  let newNumber = number + 1
  // console.log(newNumber)
  p.innerText = `${newNumber} likes`

  fetch(`${toysURL}/${id}`,{
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({likes: newNumber})
  })

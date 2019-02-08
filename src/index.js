
// YOUR CODE HERE

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const toyCollection = document.querySelector("#toy-collection")
  const addToyForm = document.querySelector(".add-toy-form")

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
  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(data => {
    data.forEach(makeAndAppendToyCard);
    createToy();
    likes();
  })

  const makeAndAppendToyCard = toy => {
    toyCollection.innerHTML += `
    <div class="card" data-id="${toy.id}">
      <h2 class="name">${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p class="likes">${toy.likes} </p>
      <button class="like-btn">Like <3</button>
    </div>
    `
  }

  const createToy = () => {
    addToyForm.addEventListener("submit", event => {
      event.preventDefault()
      let name = event.target.name.value
      let image = event.target.image.value
      let likes = 0;

      fetch(`http://localhost:3000/toys`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          name,
          image,
          likes
        })
      })
      .then(res => res.json())
      .then(makeAndAppendToyCard)
    })
  }

  const likes = () => {
    toyCollection.addEventListener("click", event => {
      if(event.target.classList.contains("like-btn")) {
        const toyID = event.target.parentNode.dataset.id;
        let likes = parseInt(event.target.parentNode.querySelector(".likes").innerText);
        fetch(`http://localhost:3000/toys/${toyID}`, {
          method: "PATCH",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            likes: ++likes
          })
        })
        .then(res => res.json())
        .then(toy => {
          event.target.parentNode.querySelector(".likes").innerText = toy.likes
        })
      }
    })
  }
})

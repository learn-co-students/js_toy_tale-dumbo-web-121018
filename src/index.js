const toyUrl= "http://localhost:3000/toys"
const toyCollection = document.querySelector("#toy-collection")
const addBtn = document.querySelector('#new-toy-btn')
const frt = document.querySelector('.container')
const addForm = document.querySelector(".add-toy-form")

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

getToys()
function getToys(){
  fetch(toyUrl)
  .then(res => res.json())
  .then(toys =>{
    toys.forEach(toy =>{
      makeToy(toy)
    })
  })
}

// let toyDiv = document.createElement("div")
// toyDiv.className = "card"
//or you can do this
// toyCollection.innerHTML += `<div class="card"> <h2>${toy.name}</h2>
//     <img src=${toy.image} class="toy-avatar" />
//     <p>${toy.likes} </p>
//     <button class="like-btn">Like <3</button> </div>`
//
// or do it this waaaaaaay
// }



function makeToy(toy){
let toyDiv = document.createElement("div")
toyDiv.className = "card"
toyDiv.innerHTML = `<h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} </p>
    <button data-id="${toy.id}"class="like-btn">Like <3</button>`
    toyCollection.prepend(toyDiv)

}

toyCollection.addEventListener("click",addLike)

function addLike(e){
  if(e.target.className === 'like-btn'){
    e.target.dataset.id
const likeTarget= e.target.previousElementSibling
const parseDaLikes = parseInt(likeTarget.innerText)+ 1
// likeTarget.innerText = parseDaLikes

    fetch(toyUrl + `/${e.target.dataset.id}`,{
      method: 'PATCH',

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body:JSON.stringify({
        likes: parseDaLikes

      })

    }).then(resp =>resp.json()).then(data =>{likeTarget.innerText=data.likes})

  }

}


// toyForm.addEventListener("submit", createToy)

function createToy(e){
  e.preventDefault()
  let nameField= e.target[0].value
  let imageField= e.target[1].value
  fetch(toyUrl,{
    method:"POST",
    headers: {
  "Content-Type": "application/json",
  Accept: "application/json"
},
body: JSON.stringify({
  name:nameField,
  image:imageField,
  likes: 0
})
}).then(res => res.json())
  .then(newToy => {
  makeToy(newToy)
})
}

// OR HERE!

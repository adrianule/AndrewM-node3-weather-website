//*********************THIS IS THE CLIENT SIDE OF THE APP *************/
console.log('Client side javascript file is loaded!')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//   response.json().then((data) => {
//       console.log(data)
//   })  
// })



const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-One')
const messageTwo = document.querySelector('#message-Two')

//Example
//messageOne.textContent = 'from java'

//e stands for event-random name
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchElement.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = '' 
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
                 //"data" a variable name
                if (data.error) {
                    // console.log(data.error)
                    messageOne.textContent = data.error
                } else {
                    // console.log (data.location)
                    messageOne.textContent = data.location
                    // console.log(data.forecast)
                    messageTwo.textContent = data.forecast
                }
        })
    })

    console.log(location)
})

const path = require('path')
const express = require ('express')
const hbs =require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// //folder path manipulations
// console.log(__filename)
// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()

//Serving the directory we need.
//Customize our server

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
//Change the standard path of hbs directory. Change from "views" to "template/VIEWS"
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//Setup handle bars view engine and paths
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Adrian'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Adrian'
    })
})



app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Adrian',
        helpText: 'Keep on going'
    })
})

app.get('/weather', (req, res) =>{
    if (!req.query.address) {
         return res.send({
            error: 'You must provide and address'
        })
    }    
         
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
                    return res.send ({error: error})
        } 

         forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                    return res.send ({ error: error })
            }  
            
            res.send({ 
              forecast: forecastData,
              location: location,
              Address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You need to provide a location'
        }) 
    }
    console.log(req.query)
    res.send({
        products:[]
    })
})
app.get('/help/*',(req, res) => {
   res.render('404', {
       title: '404',
       errorMessage:'HELP ARTICLE not fond.',
       name: 'Adrian'})

})
app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage:'Page not found.',
    name: 'Adrian'
  })
})   

app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
})







//get methode

// //this will not run because we have the STATIC Run
// app.get('', (req, res) => {
//     res.send('<h1><center>Hello express module</center></h1>')
// })
///GOAL////
        //this is not necesary because pf SERVING THE FOLDER with "Path.Join"
        // app.get('/help', (req, res) => {
        //     res.send([{name: adrian,
               //location: usa}])
        // })
        // app.get('/about', (reg, res) => {c
        //     res.send('<h1>About</h1>')
        // })


//app.com
//app.com/help
//app.com/about
//app.com/weather

// We need to start the server


//GOAL//
// 1.Setup an about route and render a page title
// 2.Setup a weather rout and render a page title
// 3.Test your work by visiting in the brouser

//GOAL//
// 1. Setup about route to render a title in HTML
// 2. Setup the weather rout to send back JSON
//     -Object with forecast and location string
//3. Test your work


//GOAL//
// 1. Create a html page for about with "ABOUT" title
// 2. Create a html page for help page with "HELP"  title
// 3. Remove the old route handler for both
// 4. Visti both pages in broweser to test your work

//Goal//
//Create a footer

//GOAL///

///GOAL
//Create 404 page . one for multiple error types

//GOAL
//add a req conditional logic if we have or not an address
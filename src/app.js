const path = require('path')

const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

const app = express()

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')


//setup handlebars engine and views location
app.set("view engine", "hbs")
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))
app.get('', (req, res) => {

    res.render("index", {
        title: 'Weather App',
        name: 'Elie Muhiya'

    })


})


app.get('/about', (req, res) => {

    res.render("about", {
        title: "About",
        name: 'Elie Muhiya'

    })

})


app.get('/help', (req, res) => {

    res.render('help', {

        title: "Help",
        name: 'Elie Muhiya'

    })

})

app.get('/help/*', (req, res) => {

    res.render('404', {
        title: '404',
        name: "Elie Muhiya",
        errorMessage: "Help article Not Found "

    })

})

//app.get('', (req, res) => {

//res.render('404', {
//  title: '404',
//name: "Elie Muhiya",
//errorMessage: "Page Not Found "

//})
//S})

app.get('/weather', (req, res) => {


    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, data) => {
        /* if (req.query.adress == {}) {
             return res.send({

                 error
             })
         }*/
        if (error) {
            return res.send({

                error
            })

        }


        weather(data.location, (error, dataforcast) => {
            if (error) {
                return res.send({

                    error
                })

            }

            res.send({
                weather: dataforcast.location,
                weather: dataforcast.temperature,
                address: req.query.address
            })

        })
    })




})


/*app.get('/products', (req, res) => {

  if (!req.query.search) {
    res.send({
      error: 'you must provide a search term'
})

 }
 console.log(req.query.search)
res.send({

  products: []
})
})*/

app.listen(7000, () => {

    console.log("server is running on port 7000")
})
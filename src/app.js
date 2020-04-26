const path = require('path')
const express= require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res)=>{
    res.render('index',{
        title: 'This is my index page'
    })
})

app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error: "you must provide an address"
        })
    }
    geocode(req.query.address,(error,{longitude,latitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(longitude,latitude,(forecastData)=>{
            res.send({
                forecast: forecastData.forecastResponse,
                location: location,
                address:req.query.address
            })
        })

    })

})

app.get('',(req, res)=>{
    res.send('Hello express!!')
})

app.get('/help', (req,res)=>{
    res.render('help',{
        message: 'This is the help page hello friend',
        title:'Help Page',
        footer: 'hello im footer data'
    })
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title: 'About Page',
        footer: 'hello im footer data'
    })
})

app.get('/help/*', (req,res)=>{
    res.render('404',{
        title:'Error  Page',
        message: 'Help article not found'
    })
})


app.get('*',(req,res)=>{
    res.render('404',{
        title:'Error  Page',
        message: 'My 404 page'
    })
})

app.listen(3000, ()=>{
    console.log('server is up on port 3000.')
})
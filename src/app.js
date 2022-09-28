const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();
const port = process.env.PORT || 3000;

//Define Paths for express config
const publicDirectoryPath = (path.join(__dirname, '../public'));
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to server
app.use(express.static(publicDirectoryPath));

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help',
        msg: 'The little msg',
        name: 'Rajesh'
    });
});


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Rajesh'
    });
    // setTimeout(2000);
});



app.get('/about', (req, res) => {
    
    res.render('about', {
        title: 'About me',
        name: 'Rajesh'
    });
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send( {
            error: 'Bro!, enter address query in the url'
        });
    }
    // res.send({
    //     address: req.query.address,
    //     forecast: "It is working"
    // });

    geocode(req.query.address, (error, {latitude, longitude, location, country} ={}) => {
        if(error) {
            return res.send({ error }); 
        }
        forecast(latitude, longitude, (error, forecastData) => {
            // console.log(data);
            if(error) {
                return res.send({ error });
            }
            res.send ({
                address: req.query.address,
                location,
                country,
                forecast: forecastData
            })
        });
    });
});

app.get('/products', (req, res) => {

    if(!req.query.search) {
        res.render('error', {
            title: 'Error',
            errorMsg: 'Search info not provided',
            name: 'Rajesh'
        });

        // res.send({
        //     error: 'You must provide a search term'
        // })
    } else {
        console.log(req.query.search)
        res.send({
            products: []
        });
    }
    
});

app.get('/help/*', (req,res) => {
    res.render('error', {
        title: '404 error',
        name: 'Rajesh',
        errorMsg: 'Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('error', {
        title : '404 error',
        name: 'Rajesh',
        errorMsg: 'Page not found!'
    });
});



app.listen(port, () => {
    console.log('Server is up on port' + port);
});

// console.log(__dirname)
// console.log(__filename)
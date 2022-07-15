const express = require('express');
const path = require('path')
const data = []
const bodyParser = require('body-parser')
const fs = require('fs')

let rawdata = fs.readFileSync('student.json');
let student = JSON.parse(rawdata);

const app = express()
const port = 3000

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.get('/', (req, res) => {
    res.render('list', { rows: data })
})

app.get('/add', (req, res) => {
    res.render('add')
})

app.post('/add', (req, res) => {
    data.push({
        String: req.body.String,
        Integer: req.body.Integer,
        Float: req.body.Float,
        Date: req.body.Date,
        Boolean: req.body.Boolean
    })
    console.log(data)
    res.redirect('/')
})

app.listen(port, () => {
    console.log(`example listening on ${port}`)
})
const express = require('express');
const path = require('path')
const bodyParser = require('body-parser')
const fs = require('fs')

let rawdata = JSON.parse(fs.readFileSync("table.json", "utf8"));

const app = express()
const port = 3000

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.get('/', (req, res) => {
    res.render('list', { rows: rawdata })
})

app.get('/add', (req, res) => {
    res.render('add')
})

app.post('/add', (req, res) => {
    rawdata.push({
        "String": req.body.String,
        "Integer": req.body.Integer,
        "Float": req.body.Float,
        "Date": req.body.Date,
        "Boolean": req.body.Boolean,
    })

    fs.writeFileSync("table.json", JSON.stringify(rawdata, null, 4))
    console.log(rawdata)

    res.redirect('/')
})

app.get('/edit/:id', (req, res) => {
    res.render('/edit',{item : rawdata[req.params.id]})
})

app.get('/delete/:id', (req, res) => {
    const index = req.params.id
    rawdata.splice(index, 1)
    res.redirect('/')
})

app.listen(port, () => {
    console.log(`example listening on ${port}`)
})
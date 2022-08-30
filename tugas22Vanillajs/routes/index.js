const { ObjectID } = require('bson');
var express = require('express');
var router = express.Router();
var moment = require('moment')

module.exports = function (db) {
  const collection = db.collection('tugas');
  router.get('/', async function (req, res, next) {

    // search

    const url = req.url == '/' ? '/?page=1&sortBy=id&sortMode=asc' : req.url

    const page = req.query.page || 1
    const limit = 2
    const offset = (page - 1) * limit
    const value = {}
    let sortBy = {}


    if(req.query.sortBy == 'string'){
      if(req.query.sortMode == 'asc'){
        sortBy = {}
        sortBy['string'] = 1
      } 
      else {
        sortBy = {}
        sortBy['string'] = -1
      }
    }

    if (req.query.string && req.query.strng == 'on') {
      value['string'] = new RegExp(`${req.query.string}`, 'i');
    }

    if(req.query.sortBy == 'integer'){
      if(req.query.sortMode == 'asc'){
        sortBy = {}
        sortBy['integer'] = 1
      } 
      else {
        sortBy = {}
        sortBy['integer'] = -1
      }
    }

    if (req.query.integer && req.query.int == 'on') {
      value['integer'] = parseInt(req.query.integer)
      // console.log(value, typeof value.integer)
    }

    if(req.query.sortBy == 'float'){
      if(req.query.sortMode == 'asc'){
        sortBy = {}
        sortBy['float'] = 1
      } 
      else {
        sortBy = {}
        sortBy['float'] = -1
      }
    }

    if (req.query.float && req.query.flo == 'on') {
      value['float'] = parseFloat(req.query.float)
    }

    if(req.query.sortBy == 'date'){
      if(req.query.sortMode == 'asc'){
        sortBy = {}
        sortBy['date'] = 1
      } 
      else {
        sortBy = {}
        sortBy['date'] = -1
      }
    }

    if (req.query.date == 'on') {
      if (req.query.Start_Dates && req.query.End_Dates) {
        value['date'] = {
          $gte: new Date(req.query.Start_Dates),
          $lt: new Date(req.query.End_Dates)
        }
      }
    }

    if (req.query.boolean && req.query.blo == 'on') {
      value['boolean'] = JSON.parse(req.query.boolean)
    }


    

    try {
      const pageResult = await collection.countDocuments(value);
      console.log(pageResult)
      const pages = Math.ceil(pageResult / limit)
      // res.status(200).json(findResult)
      const findResult = await collection.find(value).collation({ locale: "en" }).sort(sortBy).limit(limit).skip(offset).toArray();
      res.render('index', { title: 'Express', findResult, req, page, pages, url, offset, moment });
    } catch (e) {
      console.log(e)
      res.json(e)
    }
  });




  //add
  router.get('/add', (req, res) => {
    res.render('add')
  })

  router.post('/add', async function (req, res) {
    try {
      collection.insertOne(
        {
          string: req.body.string,
          integer: parseInt(req.body.integer),
          float: parseFloat(req.body.float),
          date: new Date(req.body.date),
          boolean: JSON.parse(req.body.boolean)
        }
      )
      res.redirect('/')
    } catch (e) {
      res.json(e)
    }
  });

  router.get('/delete/:id', async function (req, res) {
    try {
      const deleteResult = await collection.deleteMany({ _id: new ObjectID(`${req.params.id}`) });
      console.log('Deleted documents =>', deleteResult);
      res.redirect('/')
    } catch (e) {
      res.json(e)
      console.log(e)
    }
  });

  router.get('/edit/:id', async function (req, res) {
    try {
      // res.status(200).json(findResult)
      const findResult = await collection.find({ _id: new ObjectID(`${req.params.id}`) }).toArray()
      res.render('edit', { title: 'Express', findResult, moment })
    } catch (e) {
      console.log(e)
      res.json(e)
    }
  })

  router.post('/edit/:id', async function (req, res) {
    try {
      console.log(req.body)
      const updateResult = await collection.updateOne({ _id: new ObjectID(`${req.params.id}`) }, {
        $set: { string: req.body.string, integer: req.body.integer, float: req.body.float, date: req.body.date, boolean: req.body.boolean }
      });
      console.log('Updated documents =>', updateResult);
      res.redirect('/')
    } catch (e) {
      console.log(e)
      res.json(e)
    }
  });

  return router;
}
//


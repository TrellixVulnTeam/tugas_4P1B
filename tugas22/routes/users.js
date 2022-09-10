const { ObjectID } = require('bson');
var express = require('express');
var router = express.Router();
var moment = require('moment')

module.exports = function (db) {
  const collection = db.collection('users');
  router.get('/', async function (req, res, next) {

    // search

    // console.log(req.query)

    const url = req.url == '/' ? '/?page=1&sortBy=id&sortMode=asc' : req.url

    const page = req.query.page || 1
    const limit = 3
    const offset = (page - 1) * limit
    let sortBy = {}


    if (req.query.sortBy == 'string') {
      if (req.query.sortMode == 'asc') {
        sortBy = {}
        sortBy['string'] = 1
      }
      else {
        sortBy = {}
        sortBy['string'] = -1
      }
    }


    if (req.query.sortBy == 'integer') {
      if (req.query.sortMode == 'asc') {
        sortBy = {}
        sortBy['integer'] = 1
      }
      else {
        sortBy = {}
        sortBy['integer'] = -1
      }
    }

    if (req.query.sortBy == 'float') {
      if (req.query.sortMode == 'asc') {
        sortBy = {}
        sortBy['float'] = 1
      }
      else {
        sortBy = {}
        sortBy['float'] = -1
      }
    }


    if (req.query.sortBy == 'date') {
      if (req.query.sortMode == 'asc') {
        sortBy = {}
        sortBy['date'] = 1
      }
      else {
        sortBy = {}
        sortBy['date'] = -1
      }
    }

    const {string, integer, float, startDate, endDate, boolean} = req.query
    const params = {}


    if (string) {
      params['string'] = new RegExp(`${string}`, 'i');
    }

    if (integer) {
      params['integer'] = parseInt(integer)
    }

    if (float) {
      params['float'] = parseFloat(float)
    }

    if (startDate && endDate) {
      params['date'] = {
        $gte: (startDate),
        $lt: (endDate)
      }
    } else if (startDate) {
      params['date'] = {
        $gte: (startDate)
      }
    } else if(endDate) {
      params['date'] = {
        $lt: (endDate)
      }
    }

    if (boolean) {
      params['boolean'] = JSON.parse(boolean)
    }


    // console.log(params)

    try {
      const pageResult = await collection.countDocuments(params);
      // console.log(pageResult)
      const pages = Math.ceil(pageResult / limit)
      const findResult = await collection.find(params).sort(sortBy).limit(limit).skip(offset).toArray();
      res.status(200).json({ findResult,page: parseInt(page), pages: pages, offset })
    } catch (e) {
      // console.log(e)
      res.status(500).json({ message: "error ambil data", err })
    }
  });

  router.post('/', async function (req, res) {
    try {
      // console.log(req.body)
      const collection = await db.collection('users')
      const document = await collection.insertOne(
        {
          string: req.body.string,
          integer: parseInt(req.body.integer),
          float: parseFloat(req.body.float),
          date: (req.body.date),
          boolean: (req.body.boolean)
        }
      )
      const user = await collection.findOne({ _id: document.insertedId })
      res.status(200).json(user)
    } catch (e) {
      // console.log(e)
      res.status(500).json({ message: "error ambil data", err })
    }
  });



  router.delete('/:id', async function (req, res) {
    try {
      const collection = db.collection('users')
      const user = await collection.findOne({ _id: new ObjectID(`${req.params.id}`) })
      await collection.deleteMany({ _id: new ObjectID(`${req.params.id}`) });
      // console.log('Deleted documents =>', deleteResult);
      res.status(200).json(user)
    } catch (e) {
      res.status(500).json({ message: "error delete data" })
      // console.log(e)
    }
  });


  router.get('/:id', async function (req, res, next) {
    try {
      const collection = db.collection('users');
      const user = await collection.findOne({ _id: new ObjectID(`${req.params.id}`) })
      res.status(200).json(user)
    } catch (err) {
      // console.log(err)
      res.status(500).json({ message: "error update data" })
    }
  });


  router.put('/:id', async function (req, res) {
    try {
      // console.log(req.body)
      const updateResult = await collection.updateOne({ _id: new ObjectID(`${req.params.id}`) }, {
        $set: {
          string: req.body.string,
          integer: parseInt(req.body.integer),
          float: parseFloat(req.body.float),
          date: (req.body.date),
          boolean: (req.body.boolean)
        }
      });
      // console.log('Updated documents =>', updateResult);
      res.status(200).json(updateResult)
    } catch (e) {
      // console.log(e)
      res.status(500).json({ message: "error ambil data", err })
    }
  });

  return router;
}
//


const { ObjectID } = require('bson');
var express = require('express');
var router = express.Router();

module.exports = function (db) {
  const collection = db.collection('tugas');
  router.get('/', async function (req, res, next) {

    // search
    const sortBy = req.query.sortBy || 'id'
    const sortMode = req.query.sortMode || 'asc'
    // console.log('test',req.query.sortMode)

    const url = req.url == '/' ? '/?page=1&sortBy=id&sortMode=asc' : req.url

    const page = req.query.page || 1
    const limit = 2
    const offset = (page - 1) * limit
    const wheres = []
    const value = []
    let count = 1


    if (req.query.id && req.query.ids == 'on') {
      wheres.push(`id = $${count}`)
      count++
      value.push(req.query.id)
    }

    if (req.query.string && req.query.strng == 'on') {
      wheres.push(`string ILIKE '%' || $${count} || '%'`)
      count++
      value.push(req.query.string)
    }

    if (req.query.integer && req.query.int == 'on') {
      wheres.push(`integer = $${count}`)
      count++
      value.push(req.query.integer)
    }

    if (req.query.float && req.query.flo == 'on') {
      wheres.push(`float = $${count}`)
      count++
      value.push(req.query.float)
    }

    if (req.query.date == 'on') {
      if (req.query.Start_Dates && req.query.End_Dates) {
        wheres.push(`date between $${count} and $${count + 1}`)
        count++
        count++
        value.push(req.query.Start_Dates)
        value.push(req.query.End_Dates)
      }
    }
    if (req.query.boolean && req.query.blo == 'on') {
      wheres.push(`boolean = $${count}`)
      count++
      value.push(req.query.boolean)
    }




    try {
      // res.status(200).json(findResult)
      const findResult = await collection.find({}).toArray();
      res.render('index', { title: 'Express', findResult, req });
    } catch (e) {
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
        { string: req.body.string, integer: req.body.integer, float: req.body.float, date: req.body.date, boolean: req.body.boolean }
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
      res.render('edit', { title: 'Express', findResult })
    } catch (e) {
      res.json(e)
    }
  })

  router.post('/edit/:id', async function (req, res) {
    try {
      console.log(req.body)
      const updateResult = await collection.updateOne({ _id: new ObjectID(`${req.params.id}`) }, {
        $set: { integer: req.body.integer, float: req.body.float, date: req.body.date, boolean: req.body.boolean }
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


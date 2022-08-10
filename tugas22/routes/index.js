const { ObjectID } = require('bson');
var express = require('express');
var router = express.Router();

module.exports = function (db) {
  const collection = db.collection('tugas');
  router.get('/', async function (req, res, next) {

    try {
      // res.status(200).json(findResult)
      const findResult = await collection.find({}).toArray();
      res.render('index', { title: 'Express', findResult });
    } catch (e) {
      res.json(e)
    }
  });

  // router.get('/:id', async function (req, res, next) {

  //   try {
  //     // res.status(200).json(findResult)
  //     const updateResult = await collection.updateOne({ _id: req.params.id }, { $set: { string: req.body.string, integer: req.body.integer, float: req.body.float, date: req.body.date, boolean: req.body.boolean } });
  //     res.render('index', { title: 'Express', updateResult });
  //   } catch (e) {
  //     res.json(e)
  //   }
  // });


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

  return router;
}
//


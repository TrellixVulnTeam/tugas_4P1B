var express = require('express');
const moment = require('moment');
var router = express.Router();

module.exports = function(db){
  

router.get('/', (req, res) => {

  // const {StringC} = req.query

  const url = req.url == '/' ? '/?page=1' : req.url
  console.log(url)

  const page = req.query.page || 1
  const limit = 2
  const offset = (page - 1) * limit
  const wheres = []
  const value = []
  let count = 1


  if (req.query.ID && req.query.ids == 'on') {
      wheres.push(`id = $${count}`)
      count++
      value.push(req.query.ID)
  }

  if (req.query.String  && req.query.strng == 'on') {
      wheres.push(`string ILIKE $${count} `)
      count++
      value.push(req.query.String)
  }

  if (req.query.Integers && req.query.int == 'on') {
      wheres.push(`integer = $${count}`)
      count++
      value.push(req.query.Integers)
  }

  if (req.query.Floats && req.query.flo == 'on') {
      wheres.push(`float = $${count}`)
      count++
      value.push(req.query.Floats)
  }

  if (req.query.dt == 'on') {
      if (req.query.Start_Dates && req.query.End_Dates) {
          wheres.push(`date between $${count} and $${count+1}`)
          count++
          count++
          value.push(req.query.Start_Dates)
          value.push(req.query.End_Dates)
      }
  }
  if (req.query.Booleans  && req.query.blo == 'on') {
      wheres.push(`boolean = $${count}`)
      count++
      value.push(req.query.Booleans)
      console.log(req.query.Booleans)
  }



  let sql = 'SELECT COUNT(*) AS total FROM challange'
  if (wheres.length > 0) {
      sql += ` WHERE ${wheres.join(' and ')}`
  }
  console.log('ssql count ', sql)

  db.query(sql, value, (err, data) => {
      const pages = Math.ceil(data.rows[0].total / limit)

      sql = 'SELECT * FROM challange'
      if (wheres.length > 0) {
          sql += ` WHERE ${wheres.join(' and ')}`
      }

      sql += ` LIMIT $${count} OFFSET $${count+1}`

      console.log('sql get', sql)

      db.query(sql, [...value, limit, offset], (err, data) => {
        console.log(data)
          if (err) {
              return console.log('ini error', err)
          }
          res.render('list', { rows: data.rows, pages, page, url, req, moment })

      })
  })
})

router.get('/add', (req, res) => {
  res.render('add')
})

router.post('/add', (req, res) => {
  // console.log('ini add',req.body)
  db.query('insert into challange(string, integer, float, date, boolean) values ($2, $3, $4, $5, $6)', [req.body.String, req.body.Integers, req.body.Floats, req.body.Dates, req.body.Booleans], (err) => {
      if (err) {
          console.log('ini error', err)
      }
      res.redirect('/')
  })
})

router.get('/edit/:id', (req, res) => {
  db.query('select * from challange where id = $1', [req.params.id], (err, rows) => {
      if (err) {
          console.log('ini error', err)
      }
      res.render('edit', { rows: rows.rows })
  })
})

router.post('/edit/:id', (req, res) => {
  db.query('update challange set string = $2, integer = $3, float = $4, date = $5, boolean = $6 Where id = $1', [req.body.String, req.body.Integers, req.body.Floats, req.body.Dates, req.body.Booleans, req.body.ID], (err) => {
      if (err) {
          console.log('ini error', err)
      }
      res.redirect('/')
  })

})

router.get('/delete/:id', (req, res) => {
  db.query('DELETE FROM challange WHERE id = $1', [req.params.id], (err) => {
      if (err) {
          console.log('ini error', err)
      }
      res.redirect('/')
  })
})

return router;

}
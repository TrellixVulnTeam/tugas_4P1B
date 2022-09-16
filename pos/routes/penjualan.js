var express = require('express');
var router = express.Router();
const { currencyFormatter } = require('../helper/util')
const moment = require('moment')

module.exports = function (db) {
    router.get('/', async function (req, res, next) {
        try{
            const { rows } = await db.query('SELECT * FROM penjualan');
            res.render('penjualan/list', {
                currentPage: 'penjualan',
                rows,
                currencyFormatter,
                moment
            });
        } 
        catch (e) {
            res.send(e)
        }
    });

    return router;
}

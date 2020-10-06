const express = require('express');
const db = require('../db');

const router = express.Router();

//Ruta para todos :)
router.get('/', async (req, res, next)=>{
    //Imprime datos de pruebas :)
    //res.json({ test: 'test' });
    try {
        let results = await db.all();
        res.json(results);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});


router.get('/:id', async (req, res, next)=>{
    try {
        let results = await db.one(req.params.id);
        res.json(results);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/', async (req, res, next)=>{

    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }

    let pago = {
        event: req.body.event,
        data: req.body.data,
        sent_at: req.body.sent_at
    };

    try {
        let results = await db.create(pago);
        res.json(results);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = router;
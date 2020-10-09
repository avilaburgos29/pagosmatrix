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
    
    //`Logrec` VARCHAR(200) NOT NULL COMMENT 'Referencia completa de pago' AFTER `Logref`;
    let Logrec = req.body.data.transaction.reference;
    //`Logref` varchar(200) NOT NULL COMMENT 'Referencia relacionada del mesnaje (id en citas)',
    let Logref = req.body.data.transaction.reference;
    //`Logidm` varchar(80) NOT NULL COMMENT 'Id del mensaje en wompi',
    const Logidm = req.body.data.transaction.id;
    //`Logres` varchar(80) NOT NULL COMMENT 'Respuesta de estado de la solicitud',   
    const Logres = req.body.data.transaction.status;
    //`Logmsg` text NOT NULL COMMENT 'Mensaje complero recibido',
    const Logmsg = JSON.stringify(req.body.data);
    //`Logevt` varchar(100) NOT NULL COMMENT 'Tipo de evento recibido',
    const Logevt = req.body.event;
    //`Logema` varchar(80) NOT NULL COMMENT 'Email relacionado',
    const Logema = req.body.data.transaction.customer_email;
    //`Logval` varchar(80) NOT NULL COMMENT 'Valor recibido',
    const Logval = (req.body.data.transaction.amount_in_cents/100); 
    //`Logfec` DATETIME NOT NULL COMMENT 'Fecha de recepcion',
    const Logfec = req.body.sent_at
    

    //Validacion de tabla y campo enviado en la referencia :)
    let empresa = '';
    let tabla = '';
    let Medico = '';
    let Seguridad = '';
    const config = Logref.split('-');
    if (typeof config[0] !== 'undefined') {
        empresa = config[0]
    }else{
        empresa = '05'
    }
    if (typeof config[1] !== 'undefined') {
        tabla = config[1]
        tabla = tabla.toLowerCase()
        Medico = tabla.toLowerCase()
        Seguridad = tabla.toLowerCase()
    }else{
        tabla = 'citaslc'
        Medico = 'citaslc'
        Seguridad = 'C-citaslc'
    }
    if (typeof config[2] !== 'undefined') {
        Logref = config[2]
    }
    
    

    let pago = {
        Medico: Medico,        
        Logref: Logref,
        Logrec: Logrec,
        Logidm: Logidm,
        Logres: Logres,
        Logmsg: Logmsg,
        Logevt: Logevt,
        Logema: Logema,
        Logval: Logval,
        Logfec: Logfec,
        Seguridad: Seguridad
    };

    try {
        //let results = await db.create(pago);
        let results = await db.create(pago, tabla);
        //res.json(results);
        res.status(200).send({
            message: "Content received!"
        });
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = router;
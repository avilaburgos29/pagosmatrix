const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10
    ,password: '1063163660@Emma.'    
    ,user: 'u427476340_admin'    
    ,database: 'u427476340_api'
    ,host: '31.170.161.85'
    //,port: ''
});

let pagosdb = {};

pagosdb.all = () => {
    return new Promise((resolve, reject) =>{
        pool.query(`SELECT * FROM citaslc_000037`, (err, results) =>{
            if(err){ return reject(err); }
            return resolve(results);
        });
    });

};

pagosdb.one = (id) => {
    return new Promise((resolve, reject) =>{
        pool.query(`SELECT * FROM citaslc_000037 WHERE id = ?`, [id], (err, results) =>{
            if(err){ return reject(err); }
            return resolve(results[0]);
        });
    });

};

/*pagosdb.create = (pago) => {
    return new Promise((resolve, reject) =>{
        pool.query(`INSERT INTO pagos SET ?`, [pago], (err, results) =>{
            if(err){ return reject(err); }
            return resolve(results);
        });
    });

};*/

pagosdb.create = (pago, tabla) => {
    return new Promise((resolve, reject) =>{
        pool.query(`INSERT INTO ${tabla}_000037 SET ?`, [pago], (err, results) =>{
            if(err){ return reject(err); }
            return resolve(results);
        });
    });

};

module.exports = pagosdb;
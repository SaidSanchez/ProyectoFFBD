const express = require('express');
const router = express.Router();
const mysqlConnection  = require('../database.js');


router.get('/', (req, res) =>
{
    let getAllQuery = 'select * from manufacturador';

    mysqlConnection.query(getAllQuery, (err, rows) =>
    {
        if (!err) { res.json(rows); } else { console.log(err); }
    });
});


router.get('/:id', (req, res) =>
{
    let {id} = req.params;
    let getQuery = 'select * from manufacturador where mnufacturador_id = ?';

    mysqlConnection.query(getQuery, [id], (err, rows) =>
    {
        if (!err) { res.json(rows[0]); } else { console.log(err); }
    });
});


router.post('/', (req, res) =>
{
    let
    {
        manufacturadorId,
        manufacturadorNombre,
        manufacturadorDetalles,
    
    } = req.body;

    let fields =
    [
        manufacturadorId,
        manufacturadorNombre,
        manufacturadorDetalles,
    
    ]

    let insertQuery = `
    insert into addresses (manufacturador_id,
                           manufacturador_Nombre,
                           manufacturador_Detalles,
                            )
    values (?, ?, ?);
    `;

    mysqlConnection.query(insertQuery, fields, (err, rows) =>
    {
        if (!err) { res.json( {status: 'manufacturador Saved'} ); } else { console.log(err); }
    });
});


router.post('/update/:id', (req, res) =>
{
    let
    {
        manufacturadorId,
        manufacturadorNombre,
        manufacturadorDetalles,
    
    } = req.body;

    let updateQuery = `
    update manufacturador
        set manufacturador_id = ?,
            manufacturador_Nombre= ?,
            manufacturador_Detalles= ?
            
    `;

    let fields =
    [
        manufacturadorId,
        manufacturadorNombre,
        manufacturadorDetalles,
    ]

    mysqlConnection.query(updateQuery, fields, (err, rows) =>
    {
        if (!err) { res.json( {status: 'manufacturador updated'} ); } else { console.log(err); }
    });
});

router.delete('/:id', (req, res) => {

    let {id} = req.params;
    let deleteQuery = 'delete from manufacturador where manufacturador_id = ?';

    mysqlConnection.query(deleteQuery, [id], (err) =>
    {
        if (!err) { res.json( {status: 'manufacturador Deleted'} ); } else { console.log(err); }
    });
});

module.exports = router;
const express = require('express');
const router = express.Router();
const mysqlConnection  = require('../database.js');


router.get('/', (req, res) =>
{
    let getAllQuery = 'select * from reservacion';

    mysqlConnection.query(getAllQuery, (err, rows) =>
    {
        if (!err) { res.json(rows); } else { console.log(err); }
    });
});


router.get('/:id', (req, res) =>
{
    let {id} = req.params;
    let getQuery = 'select * from reservacion where reservacion_id = ?';

    mysqlConnection.query(getQuery, [id], (err, rows) =>
    {
        if (!err) { res.json(rows[0]); } else { console.log(err); }
    });
});

router.post('/', (req, res) =>
{
    let
    {
        reservacionId,
        fechaInicio,
        fechaEntrega,
        mensajeConfirmacion,
        pagoRecibido
        
    } = req.body;

    let fields =
    [
        reservacionId,
        fechaInicio,
        fechaEntrega,
        mensajeConfirmacion,
        pagoRecibido
    ]

    let insertQuery = `
    insert into addresses (reservacion_id,
                            fecha_inicio,
                            fecha_entrega,
                            mensaje_confirmacion,
                            pago_recibido)
    values (?, ?, ?, ?, ?);
    `;

    mysqlConnection.query(insertQuery, fields, (err, rows) =>
    {
        if (!err) { res.json( {status: 'resesrvacion Saved'} ); } else { console.log(err); }
    });
});

router.post('/update/:id', (req, res) =>
{
    let
    {
        reservacionId,
        fechaInicio,
        fechaEntrega,
        mensajeConfirmacion,
        pagoRecibido
    } = req.body;

    let updateQuery = `
    update reservacion
        set reservacion_id=?,
        fecha_inicio=?,
        fecha_entrega=?,
        mensaje_confirmacion=?,
        pago_recibido=?
    `;

    let fields =
    [
        reservacionId,
        fechaInicio,
        fechaEntrega,
        mensajeConfirmacion,
        pagoRecibido
    ]

    mysqlConnection.query(updateQuery, fields, (err, rows) =>
    {
        if (!err) { res.json( {status: 'reservacion updated'} ); } else { console.log(err); }
    });
});

router.delete('/:id', (req, res) => {

    let {id} = req.params;
    let deleteQuery = 'delete from reservacion where reservacion_id = ?';

    mysqlConnection.query(deleteQuery, [id], (err) =>
    {
        if (!err) { res.json( {status: 'reservacion Deleted'} ); } else { console.log(err); }
    });
});

module.exports = router;
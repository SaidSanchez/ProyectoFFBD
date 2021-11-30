const express = require('express');
const router = express.Router();
const mysqlConnection  = require('../database.js');


router.get('/', (req, res) =>
{
    let getAllQuery = 'select * from Estado_de_la_reservacion';

    mysqlConnection.query(getAllQuery, (err, rows) =>
    {
        if (!err) { res.json(rows); } else { console.log(err); }
    });
});


router.get('/:id', (req, res) =>
{
    let {id} = req.params;
    let getQuery = 'select * from Estado_de_la_reservacion where Estado_reservacion_codigo = ?';

    mysqlConnection.query(getQuery, [id], (err, rows) =>
    {
        if (!err) { res.json(rows[0]); } else { console.log(err); }
    });
});

router.post('/', (req, res) =>
{
    let
    {
        EstadoReservacionCodigo,
        EstadoReservacionDescripcion
        
        
    } = req.body;

    let fields =
    [
        EstadoReservacionCodigo,
        EstadoReservacionDescripcion
    ]

    let insertQuery = `
    insert into addresses (Estado_reservacion_codigo,
                            Estado_reservacion_descripcion)
    values (?, ?);
    `;

    mysqlConnection.query(insertQuery, fields, (err, rows) =>
    {
        if (!err) { res.json( {status: 'Estado_de_la_reservacion Saved'} ); } else { console.log(err); }
    });
});

router.post('/update/:id', (req, res) =>
{
    let
    {
        EstadoReservacionCodigo,
        EstadoReservacionDescripcion
    } = req.body;

    let updateQuery = `
    update reservacion
        set Categoria_vehiculo_iD=?,
        Categoria_vehiculo_descripcion=?,
        
    `;

    let fields =
    [
        EstadoReservacionCodigo,
        EstadoReservacionDescripcion
    ]

    mysqlConnection.query(updateQuery, fields, (err, rows) =>
    {
        if (!err) { res.json( {status: 'Estado_de_la_reservacion updated'} ); } else { console.log(err); }
    });
});

router.delete('/:id', (req, res) => {

    let {id} = req.params;
    let deleteQuery = 'delete from Estado_de_la_reservacion where Estado_reservacion_codigo ?';

    mysqlConnection.query(deleteQuery, [id], (err) =>
    {
        if (!err) { res.json( {status: 'Estado_de_la_reservacion Deleted'} ); } else { console.log(err); }
    });
});

module.exports = router;        
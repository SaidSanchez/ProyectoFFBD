const express = require('express');
const router = express.Router();
const mysqlConnection  = require('../database.js');


router.get('/', (req, res) =>
{
    let getAllQuery = 'select * from Vehiculo';

    mysqlConnection.query(getAllQuery, (err, rows) =>
    {
        if (!err) { res.json(rows); } else { console.log(err); }
    });
});


router.get('/:id', (req, res) =>
{
    let {id} = req.params;
    let getQuery = 'select * from vehiculo where numero_maricula = ?';

    mysqlConnection.query(getQuery, [id], (err, rows) =>
    {
        if (!err) { res.json(rows[0]); } else { console.log(err); }
    });
});

router.post('/', (req, res) =>
{
    let
    {
        numeroMatricula,
        kilometraje,
        tipoMotor,
        color,
        vehiculoDescripcion
        
    } = req.body;

    let fields =
    [
        numeroMatricula,
        kilometraje,
        tipoMotor,
        color,
        vehiculoDescripcion
    ]

    let insertQuery = `
    insert into addresses (numero_matricula,
                            kilometraje,
                            tipo_motor,
                            color,
                            vehiculo_descripcion)
    values (?, ?, ?, ?, ?);
    `;

    mysqlConnection.query(insertQuery, fields, (err, rows) =>
    {
        if (!err) { res.json( {status: 'vehiculo Saved'} ); } else { console.log(err); }
    });
});

router.post('/update/:id', (req, res) =>
{
    let
    {
        numeroMatricula,
        kilometraje,
        tipoMotor,
        color,
        vehiculoDescripcion
    } = req.body;

    let updateQuery = `
    update reservacion
        set numero_matricula=?,
        kilometraje=?,
        tipo_motror=?,
        color=?,
        vehiculo_descripcion=?
    `;

    let fields =
    [
        numeroMatricula,
        kilometraje,
        tipoMotor,
        color,
        vehiculoDescripcion
    ]

    mysqlConnection.query(updateQuery, fields, (err, rows) =>
    {
        if (!err) { res.json( {status: 'vehiculo updated'} ); } else { console.log(err); }
    });
});

router.delete('/:id', (req, res) => {

    let {id} = req.params;
    let deleteQuery = 'delete from vehiculo where numero_matricula ?';

    mysqlConnection.query(deleteQuery, [id], (err) =>
    {
        if (!err) { res.json( {status: 'vehiculo Deleted'} ); } else { console.log(err); }
    });
});

module.exports = router;
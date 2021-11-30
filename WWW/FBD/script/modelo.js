const express = require('express');
const router = express.Router();
const mysqlConnection  = require('../database.js');


router.get('/', (req, res) =>
{
    let getAllQuery = 'select * from Modelo';

    mysqlConnection.query(getAllQuery, (err, rows) =>
    {
        if (!err) { res.json(rows); } else { console.log(err); }
    });
});


router.get('/:id', (req, res) =>
{
    let {id} = req.params;
    let getQuery = 'select * from Modelo where modelo_id = ?';

    mysqlConnection.query(getQuery, [id], (err, rows) =>
    {
        if (!err) { res.json(rows[0]); } else { console.log(err); }
    });
});

router.post('/', (req, res) =>
{
    let
    {
        modeloId,
        cantidadContratacionesDiarias,
        modeloNombre
        
        
    } = req.body;

    let fields =
    [
        modeloId,
        cantidadContratacionesDiarias,
        modeloNombre
    ]

    let insertQuery = `
    insert into addresses (modelo_id,
                            cantidad_contrataciones_diarias,
                            modelo_nombre)
    values (?, ?,?);
    `;

    mysqlConnection.query(insertQuery, fields, (err, rows) =>
    {
        if (!err) { res.json( {status: 'Modelo Saved'} ); } else { console.log(err); }
    });
});

router.post('/update/:id', (req, res) =>
{
    let
    {
        modeloId,
        cantidadContratacionesDiarias,
        modeloNombre
    } = req.body;

    let updateQuery = `
    update reservacion
        set modelo=?,
        cantidad_contrataciones_diarias=?,
        modelo_nombre=?
        
    `;

    let fields =
    [
        modeloId,
        cantidadContratacionesDiarias,
        modeloNombre
    ]

    mysqlConnection.query(updateQuery, fields, (err, rows) =>
    {
        if (!err) { res.json( {status: 'modelo updated'} ); } else { console.log(err); }
    });
});

router.delete('/:id', (req, res) => {

    let {id} = req.params;
    let deleteQuery = 'delete from modelo where modelo_id ?';

    mysqlConnection.query(deleteQuery, [id], (err) =>
    {
        if (!err) { res.json( {status: 'modelo Deleted'} ); } else { console.log(err); }
    });
});

module.exports = router;        
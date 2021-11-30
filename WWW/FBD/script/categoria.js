const express = require('express');
const router = express.Router();
const mysqlConnection  = require('../database.js');


router.get('/', (req, res) =>
{
    let getAllQuery = 'select * from Categoria_del_vehiculo';

    mysqlConnection.query(getAllQuery, (err, rows) =>
    {
        if (!err) { res.json(rows); } else { console.log(err); }
    });
});


router.get('/:id', (req, res) =>
{
    let {id} = req.params;
    let getQuery = 'select * from Categoria_del_vehiculo where Categoria_vehiculo_id = ?';

    mysqlConnection.query(getQuery, [id], (err, rows) =>
    {
        if (!err) { res.json(rows[0]); } else { console.log(err); }
    });
});

router.post('/', (req, res) =>
{
    let
    {
        CategoriaVehiculoID,
        CategoriaVehiculoDescripcion
        
        
    } = req.body;

    let fields =
    [
        CategoriaVehiculoID,
        CategoriaVehiculoDescripcion
    ]

    let insertQuery = `
    insert into addresses (Categoria_vehiculo_id,
                            Categoria_vehiculo_descripcion)
    values (?, ?);
    `;

    mysqlConnection.query(insertQuery, fields, (err, rows) =>
    {
        if (!err) { res.json( {status: 'Categoria_del_vehiculo Saved'} ); } else { console.log(err); }
    });
});

router.post('/update/:id', (req, res) =>
{
    let
    {
        CategoriaVehiculoID,
        CategoriaVehiculoDescripcion
    } = req.body;

    let updateQuery = `
    update reservacion
        set Categoria_vehiculo_iD=?,
        Categoria_vehiculo_descripcion=?,
        
    `;

    let fields =
    [
        CategoriaVehiculoID,
        CategoriaVehiculoDescripcion
    ]

    mysqlConnection.query(updateQuery, fields, (err, rows) =>
    {
        if (!err) { res.json( {status: 'Categoria_del_vehiculo updated'} ); } else { console.log(err); }
    });
});

router.delete('/:id', (req, res) => {

    let {id} = req.params;
    let deleteQuery = 'delete from Categoria_del_vehiculo where Categoria_vehiculo_id ?';

    mysqlConnection.query(deleteQuery, [id], (err) =>
    {
        if (!err) { res.json( {status: 'Categoria_del_vehiculo Deleted'} ); } else { console.log(err); }
    });
});

module.exports = router;
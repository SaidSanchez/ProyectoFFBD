const express = require('express');
const router = express.Router();
const mysqlConnection  = require('../database.js');

/**
 * Obtener clientes
 */
router.get('/', (req, res) =>
{
    let getAllQuery = 'select * from clientes';

    mysqlConnection.query(getAllQuery, (err, rows) =>
    {
        if (!err) { res.json(rows); } else { console.log(err); }
    });
});

/**
 * obtener un cliente
 */
router.get('/:id', (req, res) =>
{
    let {id} = req.params;
    let getQuery = 'select * from clientes where cliente_id = ?';

    mysqlConnection.query(getQuery, [id], (err, rows) =>
    {
        if (!err) { res.json(rows[0]); } else { console.log(err); }
    });
});

/**
 * Inertar a cliente
 */
router.post('/', (req, res) =>
{
    let
    {
        cienteId,
        clienteNombre,
        clienteDetalles,
        clienteGenero,
        clienteEmail,
        clienteTelefono,
        clienteDomicilio,
        ciudad,
        estado,
        pais

    } = req.body;

    let fields =
    [
      cienteId,
      clienteNombre,
      clienteDetalles,
      clienteGenero,
      clienteEmail,
      clienteTelefono,
      clienteDomicilio,
      ciudad,
      estado,
      pais
    ]

    let insertQuery = `
    insert into addresses (cliente_id,
                           cliente_Nombre,
                           cliente_Detalles,
                            cliente_Genero,
                            cliente_Email,
                            cliente_Telefono,
                            cliente_Domicilio,
                            ciudad,
                            estado,
                            pais)
    values (?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    mysqlConnection.query(insertQuery, fields, (err, rows) =>
    {
        if (!err) { res.json( {status: 'cliente Saved'} ); } else { console.log(err); }
    });
});

/**
 * UPDATE a cliente
 */

router.post('/update/:id', (req, res) =>
{
    let
    {
      cienteId,
      clienteNombre,
      clienteDetalles,
      clienteGenero,
      clienteEmail,
      clienteTelefono,
      clienteDomicilio,
      ciudad,
      estado,
      pais
    } = req.body;

    let updateQuery = `
    update clientes
        set cliente_id = ?,
            cliente_Nombre= ?,
            cliente_Detalles= ?,
            cliente_Genero= ?,
            cliente_Email= ?,
            cliente_Telefono= ?,
            cliente_Domicilio= ?,
            ciudad= ?,
            estado= ?,
            pais= ?
    `;

    let fields =
    [
      cienteId,
      clienteNombre,
      clienteDetalles,
      clienteGenero,
      clienteEmail,
      clienteTelefono,
      clienteDomicilio,
      ciudad,
      estado,
      pais
    ]

    mysqlConnection.query(updateQuery, fields, (err, rows) =>
    {
        if (!err) { res.json( {status: 'cliente updated'} ); } else { console.log(err); }
    });
});

/**
 * DELETE a cliente
 */
router.delete('/:id', (req, res) => {

    let {id} = req.params;
    let deleteQuery = 'delete from clientes where cliente_id = ?';

    mysqlConnection.query(deleteQuery, [id], (err) =>
    {
        if (!err) { res.json( {status: 'cliente Deleted'} ); } else { console.log(err); }
    });
});

module.exports = router;

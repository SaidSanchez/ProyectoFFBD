const express = require('express');
const app = express();

/**
 * Describe the routes for customers, orders and employees
 */
const clientes = require('./routes/clientes');
const vehiculo = require('./routes/vehiculo');
const modelo = require('./routes/modelo');
const categoria  = require('./routes/categoria');
const reservacion    = require('./routes/reservacion');
const manufactura  = require('./routes/manufactura');
const edoreservacion    = require('./routes/edoreservacion');

/**
 * Settings
 */
app.set('port', process.env.PORT || 3000);

/**
 * Middlewares
 */
app.use(express.json());

/**
 * Routes
 */
app.use('/api/clientes', customers);
app.use('/api/vehiculo', vehiculo);
app.use('/api/modelo', modelo);
app.use('/api/categoria', categoria);
app.use('/api/reservacion', reservacion);
app.use('/api/manufactura', manufactura);
app.use('/api/edoreservacion', edoreservacion);
/**
 * Starting the server
 */
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});

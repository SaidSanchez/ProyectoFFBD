const mysql = require('mysql');

/**
 * Instance a connection
 */
const mysqlConnection = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'bddstore',
    multipleStatements: true
  });

/**
 * Make a connection
 */
mysqlConnection.connect(function (err)
{
  if (err)
  {
    console.error(err);
    return;
  }
  else
  {
    console.log('Database is connected');
  }
});

module.exports = mysqlConnection;

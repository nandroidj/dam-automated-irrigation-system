var mysql = require('mysql');

var pool = mysql.createPool({
 
  connectionLimit: 10,
  host     : 'mysql-server',
  port     : '3306',
  user     : 'root',
  password : 'userpass',
  database : 'DAM'

});


// Testeo de la conexión + tratamiento de errores
pool.getConnection((err, connection) => {
 
    if (err) {

        console.log(
          err.code === 'PROTOCOL_CONNECTION_LOST' ? 'PROTOCOL_CONNECTION_LOST' :
          err.code === 'ER_CON_COUNT_ERROR' ? 'ER_CON_COUNT_ERROR' :
          err.code === 'ECONNREFUSED' ? 'ECONNREFUSED' :
          'API funcionando'
        )

        if (connection) connection.release();

        return;
    }
});

module.exports = pool;


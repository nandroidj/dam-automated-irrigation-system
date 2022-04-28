
var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 10,
    host     : 'mysql-server',
    port     : '3306',
    user     : 'root',
    password : 'userpass',
    database : 'DAM'
});

// Conexión de prueba
pool.getConnection((err, connection) => {
    if (err) {
        switch (err.code) {
            case 'PROTOCOL_CONNECTION_LOST':
                console.error('La conexion a la DB se cerró.');
                break;
            case 'ER_CON_COUNT_ERROR':
                console.error('La base de datos tiene muchas conexiones');
                break;
            case 'ECONNREFUSED':
                console.error('La conexion fue rechazada');
        }

        if (connection) {
            connection.release();
        }

        return;
    }
});

module.exports = pool;

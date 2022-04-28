const db = require("../mysql-connector");

/*
* Lista de mediciones del dispositivo segun el Id
*
* @returns retorna una Promise<List<Medicion>>, siendo Medicion :
*      {
*          medicionId: 1,
*          fecha: "2020-11-26 21:19:41",
*          valor: "60",
*          dispositivoId: 1
*      }
*/

exports.getMedicionesDispositivoId = (id) => new Promise((resolve, reject) => {
    db.query(
        "SELECT * from Mediciones WHERE dispositivoId=?",
        [id],
        function (error, rows) {
            if (error)
                reject(error);
            else {
                if (rows.length == 0)
                    resolve([])
                else
                    resolve(rows);
            }
        }
    )
  })


/*
* Ultima medición del dispositivo segun el Id
*
* @returns retorna una Promise<Dispositivo> 
*/

exports.getUltimaMedicionDispositivoId = (id) => new Promise((resolve, reject) => {
    db.query(
        "SELECT * from Mediciones WHERE dispositivoId=? ORDER BY fecha DESC LIMIT 1",
        [id],
        function (error, rows) {
            if (error)
                reject(error);
            else {
                if (rows.length == 0)
                    resolve({})
                else
                    resolve(rows[0]);
            }
        }
    )
  })



/*
* Nueva medición en la tabla Mediciones
*
* @param {object} data objeto que contiene el id del dispositivo a modificar y el nuevo valor. Por ejemplo:
* 
*      {
*          "id": 1,
*          "valor": "50"
*      }
*
* @returns retorna una Promise<void> 
*/

exports.newMedicien = (data) => new Promise((resolve, reject) => {
    db.query(
        "INSERT INTO Mediciones (fecha, valor, dispositivoId) VALUES (?, ?, ?)",
        [
            new Date().toISOString().
                replace(/T/, ' ').       // replace T with a space
                replace(/\..+/, ''),     // delete the dot and everything after,
            data.valor,
            data.id
        ],
        function (error, _) {
          error ? reject(error) : resolve();
        }
    )
  })










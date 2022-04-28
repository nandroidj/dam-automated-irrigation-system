const db = require("../mysql-connector");

/*
* Lista de log de riego segund el Id de la valvula
*
* @returns retorna una Promise<List<Log_Riego>>, siendo Log_Riego:
*      {
*          logRiegoId: 1,
*          apertura: "2020-11-26 21:19:41",
*          fecha: "60",
*          electrovalvulaId: 1
*      }
*/

exports.getLogRiego = (idValvula) => new Promise((resolve, reject) => {
    db.query(
        "SELECT * from Log_Riegos WHERE electrovalvulaId=?",
        [idValvula],
        function (error, rows) {
          error ? reject(error) :
          rows.length == 0 ?  resolve([]) :
          resolve(rows);
        }
    )
  })


/*
* Log de riego mas reciente segun Id de la vvalvula
*
* @returns retorna una Promise<Log_Riego> 
* 
*/

exports.getUltimoLogRiego = (idValvula) => Promise((resolve, reject) => {
    db.query(
        "SELECT * from Log_Riegos WHERE electrovalvulaId=? ORDER BY fecha DESC LIMIT 1",
        [idValvula],
        function (error, rows) {
          error ? reject(error) :
          rows.length == 0 ? resolve({}) :
          resolve(rows[0]);
            }
    )
  })


/*
* Agrega nuevo log de riego segun el Id de la electroválvula
*
 * @param {object} data objeto que contiene el id de la electrovávula a modificar y el si es una apertura o no. Por ejemplo:
 * 
 *      {
 *          "id": 1,
 *          "apertura": 1
 *      }
* @returns retorna una Promise<void>
*/

exports.newRiego = (data) => Promise((resolve, reject) => {
    db.query(
        "INSERT INTO Log_Riegos (apertura, fecha, electrovalvulaId) VALUES (?, ?, ?)",
        [
            data.apertura,
            new Date().toISOString().
                replace(/T/, ' ').       // replace T with a space
                replace(/\..+/, ''),     // delete the dot and everything after,
            data.id
        ],
        function (error, rows) {
          error ? reject(error) : resolve();
        }
    )
  })












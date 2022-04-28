
const db = require("../mysql-connector");

/**
 * Lista de dispositivos
 *
 * @returns retorna una Promise<List<Dispositivo>>, siendo Dispositivo el objeto:
 *      {
 *          dispositivoId: 1,
 *          nombre: "Dispositivo 1",
 *          ubicacion: "Patio",
 *          electrovalvulaId: 1
 *      }
 */

exports.getAllDevices = () => 
  new Promise((resolve, reject) => {
    db.query(
        "SELECT * from Dispositivos",
        function (error, rows) {
            if (error)
                reject(error);
            else {
                resolve(rows);
            }
        }
    )
  })


/*
* Dispositivo segun Id
*
* @returns retorna un Promise<Dispositivo> 
*      {
*          dispositivoId: 1,
*          nombre: "Dispositivo 1",
*          ubicacion: "Patio",
*          electrovalvulaId: 1
*      }
*/

exports.getDispositivo = (id) => 
  new Promise((resolve, reject) => {
    db.query(
        "SELECT * from Dispositivos WHERE dispositivoId=?",
        [id],
        function (error, rows) {
            if (error || rows.length == 0)
                reject(error);
            else {
                resolve(rows[0]);
            }
        }
    )
  })

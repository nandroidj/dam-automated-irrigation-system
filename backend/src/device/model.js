const db = require("../mysql-connector");


/*
 * Funcion que encapsula la consulta a la base de datos 
 * lista de dispositivos: () => Promise<List<Dispositivos>>
 * siendo el tipo Dispositivo,
 *    {
 *          dispositivoId: 1,
 *          nombre: "Dispositivo 1",
 *          ubicacion: "Patio",
 *          electrovalvulaId: 1
 *      }
 *      
*/

exports.getAllDevices = () => new Promise(

  (resolve, reject) => {
      
    db.query(
        "SELECT * from Dispositivos",
        function (error, rows) {
            error ? reject(error) : resolve(rows)
    })
  })


/*
 * Funcion que encapsula la consulta a la base de datos 
 * dispositivos a partir de un Id: () => Promise<Dispositivo>>
 * siendo el tipo Dispositivo,
 *    {
 *          dispositivoId: 1,
 *          nombre: "Dispositivo 1",
 *          ubicacion: "Patio",
 *          electrovalvulaId: 1
 *      }
 *      
*/

exports.getDeviceById = (id) => new Promise(
  (resolve, reject) => {
        
    db.query(
      "SELECT * from Dispositivos WHERE dispositivoId=?",
      [id],
      function (error, rows) {
          error || rows.length == 0 ? reject(error) : resolve(rows[0])
    })
  })


const db = require("../mysql-connector");

/*
* Funcion que encapsula la consulta a la base de datos 
* lista de logs de riego: () => Promise<List<Log_Riego>>
* siendo el tipo Dispositivo,
*      {
*          logRiegoId: 1,
*          apertura: timestamp,
*          fecha: numeric,
*          electrovalvulaId: 1
*      }
*/
exports.getIrrigationLogByElectrovalve = (idValvula) => new Promise(
  (resolve, reject) => {
    db.query(
      "SELECT * from Log_Riegos WHERE electrovalvulaId=?",
      [idValvula],
      function (error, rows) {
         error ? reject(error) : 
          rows.length == 0 ? resolve([]) :
            resolve(rows)
    })
  })


/*
* Funcion que encapsula la consulta a la base de datos 
* log de riego mas reciente a partir del Id de una electrovalvula: (electrovalvulaId) => Promise<Log_Riego>
*/
exports.getLastIrrigationLogByElectrovalve = (idValvula) => new Promise(
  (resolve, reject) => {
        
    db.query(
      "SELECT * from Log_Riegos WHERE electrovalvulaId=? ORDER BY fecha DESC LIMIT 1",
        [idValvula],
        function (error, rows) {
            error ? reject(error) : 
              rows.length == 0 ? resolve({}) :
                resolve(rows[0])
      })
    })


/* Funcion que encapsula la mutacion en la base de datos
* insercion de un nuevo log de riego: (log_riego: Log_Riego) => Promise<Unit>
* siendo Log_Riego: 
*        {
*          "id": gen_random_uuid(),
*          "apertura": numeric
*        }
*
*/
exports.newIrrigationLog = (data) => new Promise(

  (resolve, reject) => {
  
    db.query(
      "INSERT INTO Log_Riegos (apertura, fecha, electrovalvulaId) VALUES (?, ?, ?)",
      [
        data.apertura,
        new Date()
              .toISOString()
              .replace(/T/, ' ')       // replace T with a space
              .replace(/\..+/, ''),     // delete the dot and everything after,
        data.id
      ],
      function (error, rows) {
        error ? reject(error) : resolve()
      })
  })

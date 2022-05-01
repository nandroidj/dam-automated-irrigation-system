const db = require("../mysql-connector");

/*
* Funcion que encapsula la consulta a la base de datos 
* lista de mediciones: () => Promise<List<Medicion>>
* siendo el tipo Medicion,
*     {
*          medicionId: 1,
*          fecha: timestamp,
*          valor: numeric,
*          dispositivoId: 1
*      }
*/

exports.getMeasurmentListByDeviceId = (id) => new Promise(
  (resolve, reject) => {
      db.query(
          "SELECT * from Mediciones WHERE dispositivoId=?",
          [id],
          function (error, rows) {
              error ? reject(error) :
                rows.length === 0 ? resolve([]) :
                  resolve(rows);
    })
  })


/*
* Funcion que encapsula la consulta a la base de datos 
* medicion mas reciente a partir del Id de un dispositivo: (dispositivoId) => Promise<Log_Riego>
*/ 

exports.getLastMeasurementByDeviceId = (id) => new Promise(

  (resolve, reject) => {
    db.query(
        "SELECT * from Mediciones WHERE dispositivoId=? ORDER BY fecha DESC LIMIT 1",
        [id],
        function (error, rows) {
            error ? reject(error) :
              rows.length == 0 ? resolve({}) :
                resolve(rows[0]);
        })
    })


/* Funcion que encapsula la mutacion en la base de datos
* insercion de una nueva medición: (medición: Medicion) => Promise<Unit>
* siendo Medicion: 
*        {
*          "id": gen_random_uuid(),
*          "valor": numeric
*        }
*
*/

exports.newMedicion = (data) => new Promise(

  (resolve, reject) => {
    db.query(
      "INSERT INTO Mediciones (fecha, valor, dispositivoId) VALUES (?, ?, ?)",
      [
          new Date().toISOString().
              replace(/T/, ' ').       // replace T with a space
              replace(/\..+/, ''),     // delete the dot and everything after,
          data.valor,
          data.id
      ],
      function (error, rows) {
          error ? reject(error) : resolve();
    })
  })










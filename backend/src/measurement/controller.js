const MeasurementModel = require("./model");


// Getter lista de mediciones: (deviceId) => Promise<List<Measurment>>
exports.getMeasurementByDeviceId = async (req, res) => {
  
  try {
      
      let devices = await MeasurementModel.getMeasurmentListByDeviceId(req.params.id);
      
      res
        .status(200)
        .send(devices);
  
  } catch (error) {

      res
        .status(400)
        .send({errores: ["Id incorrecto"]});
  }
}


// Getter ultima medición a partir del Id de un dispositivo: (Id) => Promise<Measurment>
exports.getLastMeasurementByDeviceId = async (req, res) => {

  try {
      let devices = await MeasurementModel.getLastMeasurementByDeviceId(req.params.id);
      res
        .status(200)
        .send(devices);
  
  } catch (error) {
      res.status(400).send({errores: ["Id incorrecto"]});
  }
}


// Setter de una nueva medición correspondiente al Id de un dispositivo
exports.newMeasurement = async (req, res) => {
 
  try {
    await MeasurementModel.newMedicion(req.body);
      
    res
      .status(200)
      .send();
  
  } catch (error) {
      res
        .status(400)
        .send({errores: ["Id incorrecto"]});
  }
}



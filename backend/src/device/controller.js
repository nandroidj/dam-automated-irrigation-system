
const DeviceModel = require("./model");


// Getter lista de dispositivos: () => Promise<List<Dispositivos>>
exports.getAllDevices = async (req, res) => {
  try {

      let devices = await DeviceModel.getAllDevices();
      
      res
        .status(200)
        .send(devices);

  } catch (error) {
     
      res
        .status(500)
        .send();
  }
}


// Getter dispositivo a partir de un Id: (Id: any) => Promise<Dispositivo>
exports.getDeviceById = async (req, res) => {
  try {

      let devices = await DeviceModel.getDeviceById(req.params.id);
      res
        .status(200)
        .send(devices);

  } catch (error) {
     
      res
        .status(400)
        .send({errores: ["Id incorrecto"]});
  }
}


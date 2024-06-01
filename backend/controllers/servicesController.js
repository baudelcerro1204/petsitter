const servicesController = {
    getWalks: (req, res) => {
      res.status(200).send("Lista de servicios de paseos");
    },
    getTraining: (req, res) => {
      res.status(200).send("Lista de servicios de entrenamiento");
    },
    getCare: (req, res) => {
      res.status(200).send("Lista de servicios de cuidado");
    },
    getWalkById: (req, res) => {
      res.status(200).send(`Detalles del servicio de paseo con ID ${req.params.id}`);
    },
    getTrainingById: (req, res) => {
      res.status(200).send(`Detalles del servicio de entrenamiento con ID ${req.params.id}`);
    },
    getCareById: (req, res) => {
      res.status(200).send(`Detalles del servicio de cuidado con ID ${req.params.id}`);
    }
  };
  
  module.exports = servicesController;
  
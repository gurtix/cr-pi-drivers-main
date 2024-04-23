const { Router } = require("express");
const driversRoutes = require('./drivers.js');

const router = Router();

router.use("/drivers", driversRoutes);
router.get('/', function(req, res) {
    res.send('¡Bienvenido a la API!');
  });

module.exports = router;
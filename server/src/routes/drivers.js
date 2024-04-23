const {Router} = require('express');
const {getDriverHandler, getDetailDriver, createDriverHandler, getTeamsHandler} = require('../handlers/driversHandler');

const router= Router();

router.get("/teams", getTeamsHandler);
router.get("/:id", getDetailDriver);
router.post("/", createDriverHandler);
router.get("/", getDriverHandler);

module.exports = router;
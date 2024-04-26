const axios = require('axios');
const {createDriverDB, getDriverById, getAllDrivers, getTeams, getDriverByName } = require('../controllers/driversControllers');


const getDriverHandler = async (req, res) =>{
    const {name} = req.query;
    try {
        if (name) {
            const driverByName = await getDriverByName(name);
            res.status(200).json(driverByName);
        }
        else{
            const response = await getAllDrivers();
            res.status(200).json(response);
        }
        
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};
const getDetailDriver = async (req, res) =>{
    const {id} = req.params;
    const source = isNaN(id) ? "bdd" : "api";
    try {
        const response = await getDriverById(id, source);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};
const createDriverHandler = async (req, res) =>{
    const driverData = req.body;
    try {
        if (!driverData.name || !driverData.name.forename || !driverData.name.surname || !driverData.description) {
            throw new Error('Los campos forename, surname y description son obligatorios');
        }
        const response = await createDriverDB(driverData);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};
const getTeamsHandler = async (req, res) =>{
    try {
        const teams = await getTeams();
        res.status(200).send(teams);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

module.exports = {getDriverHandler, getDetailDriver, createDriverHandler, getTeamsHandler};
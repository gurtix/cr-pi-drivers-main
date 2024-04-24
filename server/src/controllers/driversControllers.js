const { Driver, Team } = require("../db.js");
const filterDriverData = require('../modulos/filterDriverData.js');
const api = require('../../api/db.json');
const axios = require('axios');

const createDriverDB = async (driverData) => {
    const { name, description, image, nationality, dob, teams } = driverData;
    const newDriver = await Driver.create({name, description, image, nationality, dob});
    const teamNames = teams.split(', ');
    for (let teamName of teamNames){
        let team = await Team.findOne({
            where: {
                teams: teamName
            }
        });
        if (!team) {
            team = await Team.create({
                teams: teamName
            });
        }
        await newDriver.addTeam(team);
    }
    return newDriver;
};

const getDriverById = async(id, source) => {
    let driver;
    if (source === "api") {
        driver = (await axios.get(`http://localhost:5000/Drivers/${id}`)).data;
    } else {
        driver = await Driver.findByPk(id, {
            include: [{
                model: Team,
                as: 'Teams',  
                through: { attributes: [] },  
            }],
        });
    }

    const detalleApi = filterDriverData(driver, source);

    return {
        id: id,
        ...detalleApi,
        teams: source === "api" ? driver.teams : driver.Teams.map(team => team.teams).join(', '),        
    };
};


const getAllDrivers = async () => {
    const driversDB = await Driver.findAll({
        include: [{
            model: Team,
            as: 'Teams',
            through: { attributes: [] },
        }],
        attributes: ['id', 'name'],
    });
    const drivers = driversDB.map(driver => ({
        id: driver.id,
        name: driver.name,
        dob: driver.dob,
        teams: driver.Teams.map(team => team.teams).join(', '),
        create: true,
    }));
    const infoApi = (await axios.get(`http://localhost:5000/Drivers`)).data;
    const driversApi = infoApi.map(driver => ({
        id: driver.id,
        name: driver.name,
        dob: driver.dob,
        teams: driver.teams,
        create: false,
    }));

    return [...drivers, ...driversApi];
}

const getTeams = async () => {
    
        const driversFromAPI = (await axios.get('http://localhost:5000/Drivers')).data;
        const teamNames = new Set(); 
        for (let driverData of driversFromAPI) {
            if (driverData.teams) {  
                const teams = driverData.teams.split(',').map(team => team.trim());
                for (let teamName of teams) {
                    teamNames.add(teamName);
                }
            }
        }
        for (let teamName of teamNames) {
            if (teamName && teamName !== '') {
                let team = await Team.findOne({ where: { teams: teamName } });
                if (!team) {
                    team = await Team.create({ teams: teamName });
                }
            }
        }

        const teamsFromDB = await Team.findAll();
        return teamsFromDB;
}

const getDriverByName = async (name) => {
    const infoApi = (await axios.get(`http://localhost:3001/Drivers`)).data;
    const drivers = await getAllDrivers(infoApi.name);    
    const lowerCaseName = name.toLowerCase();
    const driverFiltrado = drivers.filter(driver => (driver.name.forename + ' ' + driver.name.surname).toLowerCase() === lowerCaseName);
    const driverDB = await Driver.findOne({ where: { 'name.forename': lowerCaseName } });
    if (driverFiltrado.length === 0 && !driverDB) {
        throw new Error('No se encontró el Corredor con el nombre:', name);
    }
    return driverDB ? [...driverFiltrado, driverDB] : [...driverFiltrado];
}



module.exports = {createDriverDB, getDriverById, getAllDrivers, getTeams, getDriverByName};
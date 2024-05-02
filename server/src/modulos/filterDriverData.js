const filterDriverData = (driverData) => {
    const filteredData = {
        name: driverData.name,
        dateOfBirth: driverData.dateOfBirth,
        nationality: driverData.nationality,
        description: driverData.description,
        image: driverData.image.url,
        nationality: driverData.nationality,
        dob: driverData.dob,
        teams: driverData.teams,
    };

    return filteredData;
};

module.exports = filterDriverData;

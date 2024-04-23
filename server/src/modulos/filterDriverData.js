const filterDriverData = (driverData) => {
    console.log('Datos del conductor antes de filtrar:', driverData);
    const filteredData = {
        // forename: driverData.name ? driverData.name.forename : null,
        // surname: driverData.name ? driverData.name.surname : null,
        name: driverData.name,
        dateOfBirth: driverData.dateOfBirth,
        nationality: driverData.nationality,
        description: driverData.description,
        image: driverData.image.url,
        nationality: driverData.nationality,
        dob: driverData.dob,
        teams: driverData.teams,
    };
    console.log('Datos del conductor después de filtrar:', filteredData);

    return filteredData;
};

module.exports = filterDriverData;

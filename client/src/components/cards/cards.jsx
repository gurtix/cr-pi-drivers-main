import Card from "../card/card"
import "./cards.css"
import React, { useEffect, useState } from 'react';

function Cards(){
    const [drivers, setDrivers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/Drivers')
            .then(response => response.json())
            .then(data => {
                const promises = data.map(driver => 
                    fetch(`http://localhost:3001/Drivers/${driver.id}`)
                        .then(response => response.json())
                        .then(details => ({...driver, image: details.image}))
                );
                Promise.all(promises).then(setDrivers);
            });
    }, []);

    return(
        <div className="card-list">
            {drivers.map(driver => {
                return <Card key={driver.id} driver={driver} />
            })}
        </div>
    )
}
export default Cards;
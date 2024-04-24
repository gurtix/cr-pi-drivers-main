import Card from "../card/card"
import "./cards.css"
import React, { useEffect, useState } from 'react';

function Cards({ sortOrder, selectedTeam, showCreated, searchTerm }){
    const [drivers, setDrivers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const driversPerPage = 9;

    useEffect(() => {
        fetch('http://localhost:3001/Drivers')
            .then(response => response.json())
            .then(data => {
                const promises = data.map(driver => 
                    fetch(`http://localhost:3001/Drivers/${driver.id}`)
                        .then(response => response.json())
                        .then(details => ({...driver, image: details.image}))
                );
            Promise.all(promises)
                    .then(drivers => {
                        let sortedDrivers;
                        switch(sortOrder) {
                            case 'name-asc':
                                sortedDrivers = [...drivers].sort((a, b) => a.name.forename.localeCompare(b.name.forename));
                                break;
                                case 'name-desc':
                                    sortedDrivers = [...drivers].sort((a, b) => b.name.forename.localeCompare(a.name.forename));
                                    break;
                                    case 'surname-asc':
                                        sortedDrivers = [...drivers].sort((a, b) => a.name.surname.localeCompare(b.name.surname));
                                        break;
                                        case 'surname-desc':
                                            sortedDrivers = [...drivers].sort((a, b) => b.name.surname.localeCompare(a.name.surname));
                                            break;
                                            case 'dob':
                                                sortedDrivers = [...drivers].sort((a, b) => new Date(a.dob) - new Date(b.dob));
                                                break;
                                                default:
                                                    sortedDrivers = drivers;
                                                }
                                                
                                                if (selectedTeam) {
                                                    sortedDrivers = sortedDrivers.filter(driver => driver.teams && driver.teams.includes(selectedTeam));
                                                }
                                                if (showCreated) {
                                                    sortedDrivers = sortedDrivers.filter(driver => driver.create);
                                                }
                                                if (searchTerm) {
                                                    const lowerCaseSearchTerm = searchTerm.toLowerCase();
                                                    sortedDrivers = sortedDrivers.filter(driver => 
                                                        driver.name.forename.toLowerCase().includes(lowerCaseSearchTerm) || 
                                                        driver.name.surname.toLowerCase().includes(lowerCaseSearchTerm)
                                                    );
                                                }
                                                setDrivers(sortedDrivers);
                                            });
                                        });                                    
    }, [sortOrder, selectedTeam, showCreated, searchTerm]);

  
    
    const indexOfLastDriver = currentPage * driversPerPage;
    const indexOfFirstDriver = indexOfLastDriver - driversPerPage;
    const currentDrivers = drivers.slice(indexOfFirstDriver, indexOfLastDriver);

    const paginate = pageNumber => setCurrentPage(pageNumber);
    const pages = [...Array(Math.ceil(drivers.length / driversPerPage)).keys()].map(n => n + 1)

    return(
        <div className="cards">            
            <div className="pagination-top">
                {currentPage > 1 && <button onClick={() => paginate(1)}>1</button>}
                {currentPage > 2 && <div>...</div>}
                <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>◀-</button>
                {pages.filter(page => page >= currentPage - 3 && page <= currentPage + 3).map(number => (
                    <button key={number} onClick={() => paginate(number)}className={number === currentPage ? 'active' : ''}>
                        {number}
                    </button>
                ))}
                <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, pages.length))}>-▶</button>
                {currentPage < pages.length - 1 && <div>...</div>}
                {currentPage < pages.length && <button onClick={() => paginate(pages.length)}>{pages.length}</button>}
            </div>
            <div className="card-list">
            {currentDrivers.map(driver => <Card key={driver.id} driver={driver} />)}
            </div>
            <div className="pagination-bot">            
            {currentPage > 1 && <button onClick={() => paginate(1)}>1</button>}
                {currentPage > 2 && <div>...</div>}
                <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>◀-</button>
                {pages.filter(page => page >= currentPage - 3 && page <= currentPage + 3).map(number => (
                    <button key={number} onClick={() => paginate(number)} className={number === currentPage ? 'active' : ''}>
                        {number}
                    </button>
                ))}
                <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, pages.length))}>-▶</button>
                {currentPage < pages.length - 1 && <div>...</div>}
                {currentPage < pages.length && <button onClick={() => paginate(pages.length)}>{pages.length}</button>}
            </div>
            
        </div>
    )
}
export default Cards;
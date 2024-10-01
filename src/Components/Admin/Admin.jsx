import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './Admin.css';
import logo from "../../assets/logo.png";

// Fallback image URLs
const fallbackImage = "https://marketing-fastapi.onrender.com/static/images/default-image.jpg";
const fallbackVisitingCard = "https://marketing-fastapi.onrender.com/static/visiting_cards/default-visiting-card.jpg";

const Admin = () => {
    const [records, setRecords] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("https://marketing-fastapi.onrender.com/records/")
            .then(response => {
                // Sort records by serial number
                const sortedRecords = response.data.sort((a, b) => a.serial_number - b.serial_number);
                setRecords(sortedRecords);
            })
            .catch(error => {
                console.error("There was an error fetching the data!", error);
            });
    }, []);

    const handleRowClick = (serialNumber) => {
        if (serialNumber) {
            navigate(`/records/${serialNumber}`);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? 'Invalid date' : date.toLocaleDateString();
    };

    const handleImageError = (event) => {
        console.error(`Image failed to load: ${event.target.src}`);
        event.target.src = fallbackImage; // Set fallback image
    };

    const handleVisitingCardError = (event) => {
        console.error(`Visiting card image failed to load: ${event.target.src}`);
        event.target.src = fallbackVisitingCard; // Set fallback visiting card
    };

    return (
        <>
            
            <table>
                <thead>
                    <tr>
                        <th>Serial Number</th>
                        <th>User Name</th>
                        <th>Visited Company</th>
                        <th>Status</th>
                        <th>Purpose</th>
                        <th>Date Created</th>
                        <th>Location</th>
                    {/* <th>Image</th>
                    <th>Visiting Card</th> */}
                    </tr>
                </thead>
                <tbody>
                    {records.map((record) => (
                        <tr key={record.serial_number} >
                            <td>{record.serial_number}</td>
                            <td>{record.user_name}</td>
                            <td>{record.company_name}</td>
                            <td>{record.status}</td>
                            <td>{record.purpose}</td>
                            <td>{formatDate(record.date_created)}</td>
                            <td>{record.location || 'N/A'}</td>
                            {/* <td>
                                {record.image_path && 
                                    <img 
                                        src={`http://localhost:8000/static/images/${record.image_path.split('/').pop()}`} 
                                        alt={`Image for ${record.serial_number}`} 
                                        onError={handleImageError}
                                        style={{ width: '100px', height: 'auto' }}
                                    />
                                }
                            </td>
                            <td>
                                {record.visiting_card_path && 
                                    <img 
                                        src={`http://localhost:8000/static/visiting_cards/${record.visiting_card_path.split('/').pop()}`} 
                                        alt={`Visiting card for ${record.serial_number}`} 
                                        onError={handleVisitingCardError}
                                        style={{ width: '100px', height: 'auto' }}
                                    />
                                }
                            </td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </>
    );
};

export default Admin;

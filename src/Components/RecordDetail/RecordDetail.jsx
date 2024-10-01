import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import './RecordDetail.css';

const RecordDetail = () => {
    const { serialNumber } = useParams();
    const [record, setRecord] = useState(null);

    useEffect(() => {
        console.log(`Fetching record with serialNumber: ${serialNumber}`);
        axios.get(`https://marketing-fastapi.onrender.com/records/${parseInt(serialNumber, 10)}`)
            .then(response => {
                console.log("Record fetched successfully:", response.data);
                setRecord(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the record details!", error);
            });
    }, [serialNumber]);

    if (!record) return <p>Loading...</p>;

    return (
        <div className="record-detail">
            <h2>Record Details</h2>
            <p><strong>Serial Number:</strong> {record.serial_number}</p>
            <p><strong>User Name:</strong> {record.user_name}</p>
            <p><strong>Company Name:</strong> {record.company_name}</p>
            <p><strong>Address:</strong> {record.address}</p>
            <p><strong>Contact Person:</strong> {record.contact_person}</p>
            <p><strong>Website URL:</strong> <a href={record.website_url} target="_blank" rel="noopener noreferrer">{record.website_url}</a></p>
            <p><strong>Purpose:</strong> {record.purpose}</p>
            <p><strong>Status:</strong> {record.status}</p>
            <p><strong>Upload Time:</strong> {new Date(record.upload_time).toLocaleDateString()}</p>
            <p><strong>Location:</strong> {record.location || "N/A"}</p>
            <div>
                <strong>Image:</strong>
                {record.image_path && <img src={`https://marketing-fastapi.onrender.com/${record.image_path}`} alt="Record Image" className="record-image" />}
            </div>
            <div>
                <strong>Visiting Card:</strong>
                {record.visiting_card_path && <img src={`https://marketing-fastapi.onrender.com/${record.visiting_card_path}`} alt="Visiting Card" className="visiting-card-image" />}
            </div>
        </div>
    );
};

export default RecordDetail;

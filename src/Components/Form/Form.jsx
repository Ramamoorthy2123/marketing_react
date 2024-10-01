import React, { useState } from 'react';
 import './Form.css';

const Form = () => {
    const [imagePreview, setImagePreview] = useState('');
    const [uploadTime, setUploadTime] = useState('');
    const [formData, setFormData] = useState({
        companyName: '',
        address: '',
        contactPerson: '',
        websiteUrl: '',
        purpose: '',
        status: '',
        image: null,
        visitingCard: null,
        location: '',
        userName: ''
    });

    const imageUploadFunction = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFormData((prevFormData) => ({ ...prevFormData, image: file }));

            // For preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
                setUploadTime(`Uploaded on: ${new Date().toLocaleString()}`);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFormData((prevFormData) => ({ ...prevFormData, visitingCard: file }));
        }
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
    };

    const handleStatusChange = (e) => {
        setFormData((prevFormData) => ({ ...prevFormData, status: e.target.id }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.userName || !formData.companyName || !formData.address || !formData.purpose) {
            alert("Please fill in all required fields.");
            return;
        }

        const data = new FormData();
        data.append('user_name', formData.userName);
        data.append('company_name', formData.companyName);
        data.append('address', formData.address);
        data.append('contact_person', formData.contactPerson);
        data.append('website_url', formData.websiteUrl || '');
        data.append('purpose', formData.purpose);
        data.append('status', formData.status);
        data.append('upload_time', new Date().toISOString());
        data.append('location', formData.location);

        // Append files directly
        if (formData.image) {
            data.append('image_upload', formData.image); 
        }

        if (formData.visitingCard) {
            data.append('visiting_card', formData.visitingCard);
        }

        try {
            const response = await fetch('https://marketing-fastapi.onrender.com/submit_form/', {
                method: 'POST',
                body: data,
            });

            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = typeof errorData === 'object' ? JSON.stringify(errorData) : errorData;
                alert(`Error: ${errorMessage}`);
                throw new Error(`Server Error: ${response.status}`);
            }

            const result = await response.json();
            alert('Successfully Submitted');
        } catch (error) {
            console.error('Error details:', JSON.stringify(error, null, 2));
            alert('An error occurred during form submission. Please try again.');
        }
    };

    const getLocation = () => {
        const x = document.getElementById("demo");
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const locationData = `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`;
                    x.innerHTML = locationData;
                    setFormData((prevFormData) => ({ ...prevFormData, location: locationData }));
                },
                (error) => {
                    x.innerHTML = `Error: ${error.message}`;
                }
            );
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    };

    return (
        <main id="mainForm">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="userName" className="label">Username:</label>
                    <input type="text"  id = "userName"className='input' placeholder="Username"   onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="companyName" className="label">Name Of The Company:</label>
                    <input type="text"  className='input'placeholder="Company Name" id="companyName" onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="address" className="label">Address:</label>
                    <textarea  className='input' placeholder="Address" id="address" onChange={handleChange}></textarea>
                </div>
                <div>
                    <label htmlFor="contactPerson" className="label">Contact Person:</label>
                    <input type="text" className='input' placeholder="Person Name" id="contactPerson" onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="visitingCard" className="label">Visiting Card:</label>
                    <input type="file" className='input' id="visitingCard" onChange={handleFileChange} />
                </div>
                <div>
                    <label htmlFor="location" className="label">Location:</label>
                    <button type="button" id='location' onClick={getLocation}>Get Location</button>
                </div>
                <span><p id="demo"></p></span>
                <div>
                    <label htmlFor="websiteUrl" className="label">Website:</label>
                    <input type="url" className='input'placeholder="Visited Company URL" id="websiteUrl" onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="purpose" className="label">Purpose:</label>
                    <input type="text" className='input' placeholder="Purpose of visiting" id="purpose" onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="imageUpload" className="label">Picture With Date & Time:</label>
                    <input type="file" className='input' id="imageUpload" accept="image/jpeg,image/png" onChange={imageUploadFunction} />
                    <div id="imagePreview" style={{ width: '100px', height: '100px', backgroundSize: 'cover' }}>
                        {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%' }} />}
                    </div>
                    <p id="uploadTime">{uploadTime}</p>
                </div>
                <div className='radio_buttons'>
                    <label>Status:</label>
                    <ul type="none">
                        <li><label htmlFor="Prospective Lead"><input type="radio" name="Radio"
                        value='Prospective Lead'
                        id="Prospective Lead" onChange={handleStatusChange} />Prospective Lead</label></li>
                        <li><label htmlFor="Indiscussion"><input type="radio" name="Radio" 
                        value='Indiscussion'
                        id="Indiscussion" onChange={handleStatusChange} />Indiscussion</label></li>
                        <li><label htmlFor="Project UnderPipeline"><input 
                        value='Project UnderPipeline'
                        type="radio" name="Radio" id="Project UnderPipeline" onChange={handleStatusChange} />Project UnderPipeline</label></li>
                        <li><label htmlFor="Project Accepted"><input type="radio" name="Radio" id="Project Accepted" value='Project Accepted' onChange={handleStatusChange} />Project Accepted</label></li>
                        <li><label htmlFor="Project Completed"><input type="radio" name="Radio" id="Project Completed" onChange={handleStatusChange} />Project Completed</label></li>
                    </ul>
                </div>
                <div className='Finbutton'>
                    <button type="submit" >Save</button>
                </div>
            </form>
        </main>
    );
};

export default Form;

import React, { useState, useRef, useEffect } from 'react';
import './Main.css';
import logo from '../images/65416c7f90b1839c7c682a3affa27fc9.png';
import circleImage from '../images/408e98d4d64a6515194b920de1150a8e.jpeg';
import Image1 from '../images/wepik-export-20231011132939gUpd 1.png';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import { addPostAPi, MainProjectApi } from '../services/allAPI';
import Post from './Post';

function Main() {
    const [show, setShow] = useState(false);
    const fileInputRef = useRef(null);
    const [mainProject, setMainProject] = useState([]);
    const [projectDetails, setProjectDetails] = useState({
        description: "",
        image: ""
    });
    const [postAdded, setPostAdded] = useState(false);



    const handleClose = () => {
        setShow(false);
        handleReset();
    };

    const handleShow = () => setShow(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { description, image } = projectDetails;

        if (!description || !image) {
            Swal.fire({
                title: "Please fill the form completely!",
                icon: "error"
            });
        } else {
            try {
                const reqBody = new FormData();
                reqBody.append('description', description);
                reqBody.append('image', image);

                const reqHeader = {
                    "Content-Type": "multipart/form-data"
                };

                const result = await addPostAPi(reqBody, reqHeader);

                if (result.status === 200) {
                    Swal.fire({
                        title: "Your form has been successfully submitted",
                        icon: "success"
                    });

                    setPostAdded(true);
                    handleClose();
                } else {
                    Swal.fire({
                        title: result.response.data,
                        icon: "error"
                    });
                }
            } catch (error) {
                Swal.fire({
                    title: "An error occurred while submitting the form",
                    text: error.message,
                    icon: "error"
                });
            }
        }
    };

    const handleReset = () => {
        setProjectDetails({
            description: "",
            image: ""
        });
        if (fileInputRef.current) {
            fileInputRef.current.value = null;
        }
    };

    useEffect(() => {
        const getMainProject = async () => {
            const result = await MainProjectApi();
            setMainProject(result.data);
        };

        getMainProject();
    }, [postAdded]);

   

    return (
        <div>
            <div className="App">
                <img src={logo} className="App-logo" alt="logo" />
                <div className="search-container">
                    <input type="text" className="search-box" placeholder="Search..." />
                    <button className="btn">
                        <img src={circleImage} className="circle-img" alt="circle" />
                        <span className="btn-text">Asha Sunny</span>
                    </button>
                    <button className="btn second-btn">Logout</button>
                </div>
            </div>
            <div className="container">
                <div className="centered-rectangle">
                    <button className="upload-button" onClick={handleShow}>Upload Images</button>
                    <img src={Image1} className="right-image" alt="Example" />
                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Upload Images</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-content">
                        <div className="input-group">
                            <label htmlFor="description">Description:</label>
                            <input type="text" id="description" className="description-input" placeholder="Enter description here"
                                value={projectDetails.description}
                                onChange={(e) => setProjectDetails({ ...projectDetails, description: e.target.value })}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="file-upload">Upload Image:</label>
                            <input type="file" id="file-upload" className="file-upload"
                                ref={fileInputRef}
                                onChange={(e) => setProjectDetails({ ...projectDetails, image: e.target.files[0] })}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleReset}>
                        Reset
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Post
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className='row'>
                {mainProject.length > 0 ?
                    mainProject.map((item, index) => (
                        <div key={index}>
                            <Post project={item} />
                        </div>
                    )) :
                    <h4>No Post</h4>
                }
            </div>
        </div>
    );
}

export default Main;

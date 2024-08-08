import React from 'react';
import './Post.css';
import profileImg from '../images/408e98d4d64a6515194b920de1150a8e.jpeg';
import { BASE_URL } from '../services/baseURL';
import { useState } from 'react';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';

function Post({ project }) {
  const [show, setShow] = useState(false);
  const [isHeartClicked, setHeartClicked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const toggleHeart = () => {
    setHeartClicked(!isHeartClicked);
    setLikes(isHeartClicked ? likes - 1 : likes + 1);
  };

  const handleCommentChange = (e) => setComment(e.target.value);

  const handlePostComment = () => {
    if (comment.trim()) {
      setComments([comment, ...comments]);
      setComment('');
    }
  };

  return (
    <div>
      <div className="post-container">
        <div className="profile-header">
          <img src={profileImg} alt="Profile" className="profile-icon ms-5" />
          <span className="profile-name ms-2">Asha Sunny</span>
        </div>
        <div className="description ms-5">
          {project.description}
        </div>
        <img src={`${BASE_URL}/uploads/${project.image}`} alt="Post" className="post-image" />
        <div className="button-container">
          <div className="like-container">
            <span className="like-count">{likes}</span>
            <div onClick={toggleHeart}>
              {
                isHeartClicked ? (
                  <button className="btn1-inline me-2 mb-5">Like</button>
                ) : (
                  <button className="btn1-outline me-2">Like</button>
                )
              }
            </div>
          </div>
          <button className="btn2 btn btn-primary mt-4" onClick={handleShow}>Comment</button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} dialogClassName="custom-modal" centered>
        <Modal.Header closeButton>
          <Modal.Title>Post Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <div className="post-containermodal">
                <div className="profile-headermodal">
                  <img src={profileImg} alt="Profile" className="profile-icon" />
                  <span className="profile-name me-2">Asha Sunny</span>
                </div>
                <div className="description ">
                  {project.description}
                </div>
                <img src={`${BASE_URL}/uploads/${project.image}`} alt="Post" style={{ height: "300px", width: "500px" }} />
              </div>
            </Col>
            <Col md={6}>
              <div className="comments-section mt-5">
                <div className="comments-list">

                  {comments.length > 0 ? (
                    comments.map((com, index) => (

                      <div key={index} className="comment mb-3"
                       style={{
                        display:"flex",
                        backgroundColor: "#e4ad9e",
                        width: "400px",
                        height: "auto",
                        padding: "20px",
                        borderRadius: "0px 30px 30px 30px"
                      }}>
                <img src={profileImg} alt="Profile" className="profile-icon" />

                        <p className='ms-4' style={{ textAlign: "start" }}>{com}</p>
                      </div>
                    ))
                  ) : (
                    <p>No comments yet.</p>
                  )}
                </div>
                <div className="comments-form">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={handleCommentChange}
                  />
                  <Button variant="primary" onClick={handlePostComment}>Post</Button>
                </div>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Post;

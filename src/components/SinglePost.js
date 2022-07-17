import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { deletePost, sendMessage } from '../api';
import { successMsg } from '.';
import EditPost from './EditPost';

const SinglePost = (props) => {
    const [currPost, setCurrPost] = useState({});
    const [message, setMessage] = useState("");
    const [isEdit, setIsEdit] = useState(false)

    const location = useLocation();

    const navigate = useNavigate();
    
    useEffect(() => {
        setCurrPost(location.state.post)
    }, []);

    const deleteIt = async (event) => {
        let res = await deletePost(currPost._id);
        if (res.statusText = "OK") {
            successMsg("Post deleted.")
            navigate('/posts/');
        }
    }

    const sendMessageHandler = async (event) => {
        event.preventDefault();
        let result = ""
        if (message.length < 0) {
            alert('Please enter a message.')
        } else {
            let msgObj = {
                message: {
                    content: message
                }
            }
            result = await sendMessage(currPost._id, msgObj);
        }
        (result === true) ? successMsg('Message Sent.') : alert('Could not send message.');
    }

    const editHandler = (event) => {
        if (isEdit) {
            setIsEdit(false);
        } else {
            setIsEdit(true);
        }
    }

    return <><div id={currPost._id} className="post">
    <h3>{currPost.title}</h3>
    <p id="price"><b>Price:</b> {currPost.price}</p>
    <p id="description">{currPost.description}</p>
    <p id="location"><b>Location:</b> {currPost.location}</p>
    <><br /></>
    {currPost.isAuthor ? <button id="btn_edit" onClick={(e) => editHandler(e)}>Edit</button> : <input id="message" type="text" placeholder="Message" onChange={(e) => setMessage(e.target.value)}></input>}
    <><br /></>
    {currPost.isAuthor ? <button id="btn_delete" onClick={(e) => deleteIt(e)}>Delete</button> : <button id="btn_msg" onClick={(e) => sendMessageHandler(e)}>Send Message</button>}
</div>

 {isEdit ? <EditPost currPost={currPost}/> : null }
</>
}

export default SinglePost;
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserData, getPosts } from '../api/index';
import './Profile.css';


const Profile = () => {
    const [userData, setUserData] = useState([]);
    const [sentMessages, setSentMessages] = useState([]);
    const [receivedMessages, setReceivedMessages] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        let storedToken = localStorage.getItem("token");
        if (storedToken) {
            getUserData(storedToken).then((data) => {
                setUserData(data);
            })
        }
    }, [])

    useEffect(() => {
        if (userData.messages !== undefined) {
            userData.messages.map((msg) => {
            if (msg.fromUser.username === userData.username) {
                setSentMessages((prevMessages) => [...prevMessages, msg]);
            } else {
                setReceivedMessages((prevMessages) => [...prevMessages, msg]);
            }
        })
        }
    }, [userData])



    const clickPostHandler = async (event, pid) => {
        let postArray;
        async function getData() {
            postArray = await getPosts();
        }
        await getData();
        let foundPost = false;
        postArray.map(post => {
            if (post._id === pid) {
                foundPost = true;
                navigate('/posts/' + pid, {state: {post: post}});
            }
        })
        if (!foundPost) {
            alert('Post has been deleted.');
        }
    }

    return <><div id="profile">
        
        <h1 id="welcome">Welcome {userData.username}</h1>
    
        <h2 id="inbox_label">Inbox:</h2>
        {receivedMessages.map(({_id, fromUser, post, content}) => (
            <div key={_id} className="post">
                <h3 id="msg_from">From: ME</h3>
                <p id="msg_content">{content}</p>
                <p id="msg_title" onClick={(e) => {clickPostHandler(e, post._id)}}>{post.title}</p>
            </div>
        ))}

        <h2 id="inbox_label">Outbox:</h2>
        {sentMessages.map(({_id, fromUser, post, content}) => (
            <div key={_id} className="post">
                <h3 id="msg_from">From: ME</h3>
                <p id="msg_content">{content}</p>
                <p id="msg_title" onClick={(e) => {clickPostHandler(e, post._id)}}>{post.title}</p>
            </div>
        ))}

    </div></>
}

export default Profile;
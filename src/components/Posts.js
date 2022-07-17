import React, { useState, useEffect } from 'react';
import { getPosts } from "../api";
import { useNavigate } from 'react-router-dom';
import './Posts.css'

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [allPosts, setAllPosts] = useState([]);
    
    let navigate = useNavigate();

    useEffect(() => {
        async function getData() {
            const postArray = await getPosts();
            setPosts(postArray);
            setAllPosts(postArray);
        }
        getData();
    }, [])

    useEffect(() => {
        let newPosts = [];
        if (searchTerm !== "") {
            allPosts.map((post) => {
                if (!newPosts.includes(post)) {
                    post.description.toLowerCase().includes(searchTerm.toLowerCase()) ? newPosts.push(post) : null;
                }
                if (!newPosts.includes(post)) {
                    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ? newPosts.push(post) : null;
                }
                if (!newPosts.includes(post)) {
                    post.price.toLowerCase().includes(searchTerm.toLowerCase()) ? newPosts.push(post) : null;
                }
            })
            setPosts(newPosts);
        } else {
            setPosts(allPosts);
        }
    }, [searchTerm])

const clickHandler = (event) => {
    let element = null;
    if (event.target.parentElement.id !== 'app') {
        element = event.target.parentElement
    } else {
        element = event.target
    }
    let currPost = {};
    posts.map((post) => {
        if (post._id === element.id) {
            currPost = post;
        }
    })
    navigate('/posts/' + element.id, {state: {post: currPost}});
}

const searchHandler = (event) => {
    setSearchTerm(event.target.value);
}

    return <><div id="search_container">
                <label id="search_label">Search Posts</label>
                <input id="search" type="text" onChange={searchHandler} value={searchTerm}></input>
                <button id="new_post" onClick={(e) => navigate('/posts/add')}>Add New Post</button>
            </div>
        {posts.map(({_id, title, price, description, location, isAuthor}) => (
            <div id={_id} key={_id} className="post" onClick={(e) => clickHandler(e)}>
                <h3>{title}</h3>
                <p id="price"><b>Price:</b> {price}</p>
                <p id="description">{description}</p>
                <p id="location"><b>Location:</b> {location}</p>
            </div>
        ))}
        </>
}

export default Posts;
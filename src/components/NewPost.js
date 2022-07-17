import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './NewPost.css'
import { addPost } from "../api";
import { successMsg } from '.';

const NewPost = (props) => {
    const [post, setPost] = useState({
        title: "",
        description: "",
        price: "",
        willDeliver: false
      });
      const navigate = useNavigate();


    const submitHandler = async (event) => {
        let postObj = {post: {
            title: post.title,
            description: post.description,
            price: post.price,
            willDeliver: post.willDeliver
        }}
        event.preventDefault();
        let res = await addPost(postObj);
        if (res.statusText === "OK") {
            navigate('/posts/')
            successMsg("Posted successfully.")
        }
    }

    const changeInput = (event) => {
        if (event.target.id === "willDeliver") {
            setPost(prevPost => ({
                ...prevPost,
                [event.target.id]: event.target.value === "on"
            }));
        } else {
            setPost(prevPost => ({
                ...prevPost,
                [event.target.id]: event.target.value
            }));
        }
    }

    return <form id="newPost" onSubmit={submitHandler}>
                <h2 id="head" >New Post</h2><br></br>
                <input required id="title" type="text" placeholder="Title" onChange={changeInput}/><br></br>
                <input required id="description" type="text" placeholder="Description" onChange={changeInput}/><br></br>
                <input required id="price" type="text" placeholder="Price" onChange={changeInput}/><br></br>
                <input id="location" type="text" placeholder="Location" onChange={changeInput}/><br></br>
                <label id="deliver"><input id="willDeliver" type="checkbox" onChange={changeInput}/>Will Deliver</label><br></br>
                <button id="post" type="submit">POST</button>
            </form>
}

export default NewPost;
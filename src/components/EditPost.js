import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './EditPost.css'
import { editPost } from "../api";
import { successMsg } from '.';

const EditPost = (props) => {
    const [post, setPost] = useState({
        title: "",
        description: "",
        price: "",
        willDeliver: false
      });

    const navigate = useNavigate();

    const {currPost} = props;

    useEffect(() => {
        setPost(currPost);
    }, [])

    const submitHandler = async (event) => {
        event.preventDefault();
        let postObj = {post: {
            title: post.title,
            description: post.description,
            price: post.price,
            willDeliver: post.willDeliver
        }}
        let res = await editPost(postObj, currPost._id);
        if (res.statusText === "OK") {
            navigate('/posts/')
            successMsg("Updated successfully.")
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

    return <form id="editPost" onSubmit={submitHandler}>
                <h2 id="head">Edit Post</h2><br></br>
                <input required defaultValue={currPost.title} id="title" type="text" onChange={(e) => changeInput(e)}/><br></br>
                <input required defaultValue={currPost.description} id="description" type="text" placeholder="Description" onChange={changeInput}/><br></br>
                <input required defaultValue={currPost.price} id="price" type="text" placeholder="Price" onChange={changeInput}/><br></br>
                <input defaultValue={currPost.location} id="location" type="text" placeholder="Location" onChange={changeInput}/><br></br>
                <label id="deliver"><input defaultValue={currPost.willDeliver} id="willDeliver" type="checkbox" onChange={changeInput}/>Will Deliver</label><br></br>
                <button id="post" type="submit">UPDATE POST</button>
            </form>
}

export default EditPost;
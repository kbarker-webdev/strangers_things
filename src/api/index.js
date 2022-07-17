import Logout from '../components/Logout.js';
import api from './axios.js';

let storedToken = "";

export async function getPosts() {
  let response;
  try {
    response = await api.get(`/posts`);
  } catch(error) {
    throw error;
  }

  return response.data.data.posts;
}

export async function registerUser(user) {
  let response;
  try {
    response = await api.post(`/users/register`, user)
  } catch(error) {
    throw error;
  }
  storedToken = response.data.data.token;
  return response.data.data.token;
}

export async function loginUser(user) {
  let response;
  try {
    response = await api.post(`/users/login`, user);
  } catch(error) {
    return 'Could not login.'
  }
  let token = response.data.data.token;
  api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  return token;
}

export async function addPost(post) {
  api.defaults.headers.common['Authorization'] = 'Bearer ' + storedToken;
  let response;
  try {
    response = await api.post(`/posts`, post);
  } catch (error) {
    throw error;
  }
  return response;
}

export async function editPost(post, postID) {
  api.defaults.headers.common['Authorization'] = 'Bearer ' + storedToken;
  let response;
  try {
    response = await api.patch(`/posts/` + postID, post);
  } catch (error) {
    throw error;
  }
  return response;
}

export async function deletePost(postID) {
  api.defaults.headers.common['Authorization'] = 'Bearer ' + storedToken;
  let response;
  try {
    response = api.delete('/posts/' + postID);
  } catch (error) {
    response = error;
  }
  return response;
}

export async function getUserData(token) {
  api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  storedToken = token;
  let response;
  try {
    response = await api.get(`/users/me`)
  } catch(error){
    throw error;
  }
  return response.data.data;
}

export async function sendMessage(postID, message) {
  api.defaults.headers.common['Authorization'] = 'Bearer ' + storedToken;
  let response;
  try {
    response = await api.post(`/posts/${postID}/messages`, message)
  } catch (error) {
    return error;
  }
  return response.data.success;
}

export function logOut() {
  api.defaults.headers.common['Authorization'] = '';
  storedToken = "";
}
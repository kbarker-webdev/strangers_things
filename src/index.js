import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { getUserData } from './api';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Header,
  LoginForm,
  Posts,
  SinglePost,
  NewPost,
  RegisterForm,
  Profile,
  Logout
} from './components'

import {
    BrowserRouter as Router,
    Route,
    Routes
  } from "react-router-dom";
  



const App = () => {
    const [user, setUser] = useState({});
    const [token, setToken] = useState('');
    const [userData, setUserData] = useState({});
    
    useEffect(() => {
        let storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
            getUserData(storedToken).then((data) => {
                setUserData(data);
            })
        }
    }, [])

    return <Router>
        <Header />

          <Routes>
          {token ? <Route exact path='/' element={<h1 style={{textAlign: 'center'}}>You are logged in as {userData.username}</h1>} /> : <Route exact path='/' element={<LoginForm />} />}

          <Route path='/register' element={<RegisterForm />} />

          <Route path='/posts' element={<Posts />} />

          <Route path='/posts/:id' element={<SinglePost />} />

          <Route path='/posts/add' element={<NewPost isEdit={false}/>} />

          {token ? <Route path='/profile' element={<Profile prevUserData={userData}/>} /> : <Route path='/profile' element={<h1 style={{textAlign: 'center'}}>You are not logged in.</h1>} />}
        
          <Route path='/logout' element={<Logout setUserData={setUserData} setToken={setToken}/>} />
          

        </Routes>
            <ToastContainer />
          </Router>
    
}

ReactDOM.render(<App />, document.getElementById("app"));

import { useEffect } from "react";
import { logOut } from "../api";

const Logout = (props) => {
    const {setUserData} = props;
    const {setToken} = props;

    useEffect(() => {
        localStorage.removeItem("token")
        setUserData({});
        setToken("")
        logOut();
    })

    return <h1 style={{textAlign: 'center'}}>You have been logged out.</h1>
}

export default Logout;
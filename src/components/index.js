export {default as Posts} from './Posts';
export {default as LoginForm} from './LoginForm';
export {default as RegisterForm} from './RegisterForm';
export {default as Header} from './Header';
export {default as Profile} from './Profile'
export {default as Logout} from './Logout'
export {default as SinglePost} from './SinglePost'
export {default as NewPost} from './NewPost'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const successMsg = (msg) => {
    toast.success(msg, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
}
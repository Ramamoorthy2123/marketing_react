import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import AdminLogIn from "./Components/LogInCredential/Admin/AdminLogIn";
import UserLogIn from "./Components/LogInCredential/User/UserLogIn";
import AdminSignUp from "./Components/SignUpCredential/Admin/AdminSignUp";
import UserSignUp from "./Components/SignUpCredential/User/UserSignUp"
import Admin from "./Components/Admin/Admin";
import ResetPassword from "./Components/ResetPassword/ResetPassword"
import Form from "./Components/Form/Form";
import RecordDetail from "./Components/RecordDetail/RecordDetail";


export const router = createBrowserRouter([
    {path : '/',element:<App/>},
    {path :'/adminlogin',element:<AdminLogIn/>},
    {path :'/userlogin',element:<UserLogIn/>},
    {path :'/adminsignup',element:<AdminSignUp/>},
    {path :'/usersignup',element:<UserSignUp/>},
    {path :'/admin',element:<Admin/>},
    {path :'/form',element:<Form/>},
    {path :'/records/:serialNumber',element:<RecordDetail/>},
    {path : '/resetpassword',element:<ResetPassword />}
]);

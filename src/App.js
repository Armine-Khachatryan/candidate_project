import React, {useState, useEffect} from "react";
import {
    BrowserRouter,
    Routes,
    Route, Navigate
} from "react-router-dom";
import Events from "./app/pages/Events/Events";
import './App.css';
import CompaniesSuperAdmin from "./app/pages/CompaniesSuperAdmin/CompaniesSuperAdmin";
import CompaniesCreatedSuperAdmin from "./app/pages/CompaniesCreatedSuperAdmin/CompaniesCreatedSuperAdmin";
import CreateCampanaSuperAdmin from "./app/pages/CreateCampanaSuperAdmin/CreateCampanaSuperAdmin";
import EditCampanaSuperAdmin from "./app/pages/EditCampanaSuperAdmin/EditCampanaSuperAdmin";
import EventorsSuperAdmin from "./app/pages/EventorsSuperAdmin/EventorsSuperAdmin";
import Login from "./app/pages/Login/Login";
import IconsSuperAdmin from './app/pages/IconsSuperAdmin/IconsSuperAdmin';
import ResetPassword from "./app/pages/ResetPassword/ResetPassword";
import NewPassword from "./app/pages/NewPassword/NewPassword";
import {Signup} from "./app/pages/Signup/SignUp";
import {EmailConfirmation} from "./app/pages/EmailConfirmation/EmailConfirmation";
import {Politics} from "./app/pages/Politics/Politics";
import Industries from "./app/pages/Industries/Industries";
import Requests from "./app/pages/Requests/Requests";
import Indicators from "./app/pages/Indicators/Indicators";
import MyProfile from "./app/pages/MyProfile/MyProfile";
import axios from "axios";
import config from "./config";
import {useDispatch} from "react-redux";
import {setUserData} from "../src/app/features/User/UserSlice";


function App() {

    let [accessToken, setAccessToken] = useState(sessionStorage.getItem('token') || "");
    let [role, setRole] = useState(sessionStorage.getItem('role') || "");
    const dispatch=useDispatch();

    useEffect(() => {
        getAuthUserData();
    }, [role]);


    let getAuthUserData = async () => {
        let token= sessionStorage.getItem('token');
        try {
            let response = await axios.get(`${config.baseUrl}api/my-profile`,{
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            });
            dispatch(setUserData(response.data.data));
        } catch (error) {
            console.log(error.response, 'auth request  error response');
        }
    }



    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Politics/>}/>
                <Route path="/politics" element={<Politics/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/email-confirmation" element={<EmailConfirmation/>}/>
                <Route path="/login" element={<Login setAccessToken={setAccessToken} setRole={setRole}/>}/>
                <Route path="/reset-password" element={<ResetPassword/>}/>
                <Route path="/new-password" element={<NewPassword/>}/>
                {accessToken && role === "superadmin" ?
                    <>
                        <Route path="/companies" element={<CompaniesSuperAdmin/>}>
                            <Route index path="created" element={<CompaniesCreatedSuperAdmin/>}/>
                            <Route path="create" element={<CreateCampanaSuperAdmin/>}/>
                            <Route path="edit" element={<EditCampanaSuperAdmin/>}/>
                        </Route>
                        <Route exact path="/icons" element={<IconsSuperAdmin/>}/>
                        <Route exact path="/eventors" element={<EventorsSuperAdmin/>}/>
                        <Route exact path="/requests" element={<Requests/>}/>
                    </> : <Route path="*" element={<Navigate to="/login"/>}/>}
                {accessToken && role === "candidate" ?
                    <>
                        <Route exact path="/indicators" element={<Indicators/>}/>
                        {/*<Route exact path="/events" element={<Events/>}/>*/}
                        {/*<Route exact path="/industries" element={<Industries/>}/>*/}
                        <Route exact path="/my-profile" element={<MyProfile/>}/>
                    </> : <Route path="*" element={<Navigate to="/login"/>}/>}
            </Routes>
        </BrowserRouter>
    );
}

export default App;


import React, {useEffect} from "react";
import Footer from "../../components/Footer/Footer";
import HeaderSuperAdmin from "../../components/HeaderSuperAdmin/HeaderSuperAdmin";
import {Outlet, useNavigate} from 'react-router-dom';


function CompaniesSuperAdmin(){

    const navigate = useNavigate();
    // useEffect(() => {
    //     navigate('./created');
    // }, []);



    return (
        <div className="whole">
            <div>
                <HeaderSuperAdmin/>
                    <Outlet/>
            </div>
            <Footer/>
        </div>
    )
}


export default CompaniesSuperAdmin;
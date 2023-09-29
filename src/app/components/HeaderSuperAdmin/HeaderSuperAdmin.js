import React, {useState} from "react";
import Bell from "../../assets/images/Bell.svg";
import DownArrow from "../../assets/images/DownArrow.svg";
import Logo from "../../assets/images/logo.png";
import classes from '../HeaderAdmin/HeaderAdmin.module.css';
import axios from "axios";
import config from "../../../config";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import Loader from "../../UI/Loader/Loader";


function HeaderSuperAdmin(){
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const SidebarData=[

        {
            title:"Companies",
            link:"/companies/created"
        },
        // {
        //     title:"Indicators",
        //     link:"/indicators"
        // },

        {
            title:"Eventors",
            link:"/eventors"
        },

        {
            title:"Icons",
            link:"/icons"
        },
        {
            title:"Peticiones",
            link:"/requests"
        }
    ]


    const sidebarclick =(e,val)=>{
        e.stopPropagation();
        window.location.pathname=val.link;
        // val.title==="Log Out" && removeToken()
    }

    const renderSideBarData = SidebarData.map((val, key)=>(
            <div className={`${window.location.pathname.includes(val.link) ? classes.activeHeader : classes.headerMiddleInside}`}
                 key={key}
                 onClick={(e)=>{sidebarclick(e,val)}}
            >{val.title}</div>
    ))



    let logOut =async () => {
        let token= sessionStorage.getItem('token');
        setIsLoading(true)
        try {
            let response = await axios(  {
                url:`${config.baseUrl}api/logout`,
                method: 'post',
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('role');
            setIsLoading(false);
            navigate('/login');
            // dispatch(setUserData(null))
        } catch (e) {
            setIsLoading(false);
            toast.error(
                e.response?.data.message || "Something went wrong."
            )
        }
    }

    if (isLoading) return <Loader/>;

    return(

        <div className="headerFooterBackground">
            <div className="container">
                <div className={classes.headerWhole}>
                    <div className={classes.logoDiv} onClick={()=>{navigate('/companies/created')}}>
                        <img src={Logo} alt=""/>
                    </div>
                    <div className={classes.headerMiddle}>
                        {renderSideBarData}
                    </div>
                    <div className={classes.headerRight}>
                        {/*<div><img src={Bell} alt=""/></div>*/}
                        <div className={classes.myProfileHeader} onClick={logOut}>Log out</div>
                            {/*<img className={classes.downArrowImg} src={DownArrow} alt=""/></div>*/}
                        {/*<div>*/}
                        {/*    <img src={User} alt=""/>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderSuperAdmin;


import React, {useState} from "react";
import Bell from "../../assets/images/Bell.svg";
import DownArrow from "../../assets/images/DownArrow.svg";
import Logo from "../../assets/images/logo.png";
import User from "../../assets/images/User.png";
import classes from './HeaderAdmin.module.css';
import axios from "axios";
import config from "../../../config";
import {toast} from "react-toastify";
import Loader from "../../UI/Loader/Loader";
import {useNavigate} from "react-router-dom";
import BrownAvatar from "../../assets/images/BrownAvatar.svg";
import {useDispatch, useSelector} from "react-redux";
import {setUserData} from "../../features/User/UserSlice";

function HeaderAdmin() {
    const [isLoading, setIsLoading] = useState(false);
    // const [activeDiv, setActiveDiv] = useState("events");
    const navigate = useNavigate();
    const dispatch=useDispatch();
    const customer = useSelector((state)=>state.user.data);

    const SidebarData=[
        {
            title:"Indicadores",
            link:"/indicators"
        },
        // {
        //     title:"Industries",
        //     link:"/industries"
        // },
        //
        // {
        //     title:"Events",
        //     link:"/events"
        // }
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


    let logOut = async () => {
        let token = sessionStorage.getItem('token');
        setIsLoading(true)
        try {
            let response = await axios({
                url: `${config.baseUrl}api/logout`,
                method: 'post',
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('role');
            dispatch(setUserData(null))
            setIsLoading(false);
            navigate('/login');
        } catch (e) {
            setIsLoading(false);
            toast.error(
                e.response?.data.message || "Something went wrong."
            )
        }
    }

    if (isLoading) return <Loader/>;

    return (
        <div className="headerFooterBackground">
            <div className="container">
                <div className={classes.headerWhole}>
                    <div className={classes.logoDiv} onClick={()=>{navigate('/events')}}><img src={Logo} alt=""/></div>
                    <div className={classes.headerMiddle}>
                        {renderSideBarData}
                    </div>
                    <div className={classes.headerRight}>
                        {/*<div><img src={Bell} alt=""/></div>*/}
                        <div className={classes.myProfileHeader} onClick={()=>  navigate('/my-profile')}>My Profile
                            {/*<img className={classes.downArrowImg} src={DownArrow} alt=""/>*/}
                        </div>
                        <div className={classes.avatarStyle}>
                            <img  className={classes.avatarImg} src={customer?.avatar || BrownAvatar} alt=""/>
                        </div>
                        <div className={classes.myProfileHeader} onClick={logOut}>Log out</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderAdmin;
import React  from "react";
import Logo from "../../assets/images/logo.png";
import Twitter from "../../assets/images/Twitter.svg";
import Facebook from "../../assets/images/Facebook.svg";
import Youtube from "../../assets/images/Youtube.svg";
import LinkedIn from "../../assets/images/LinkedIn.svg";
import classes from './Footer.module.css';
import {useNavigate} from "react-router-dom";



function Footer(){

    const navigate=useNavigate();
    const onTop = () => {
        window.scrollTo(0, 0);
    }

    let moveToHomePage=()=>{
        let token= sessionStorage.getItem('token');
        let role = sessionStorage.getItem('role');
        onTop()
        if( token && role === "superadmin"){
            navigate('/companies/created')
        }
        else if( token && role === "candidate"){
            navigate('/events')
        }
        else {
            navigate('/#ar-politics')
        }
     }

    return(
        <div className="headerFooterBackground">
            <div className="container">
                <div className={classes.footerWhole}>
                    <div className={classes.logoDiv} onClick={moveToHomePage}>
                        <img src={Logo} alt=""/>
                    </div>
                    <div className={classes.footerMiddle}>Copyright ©, 2023 Egregor Innovation Data Tech,
                        All Rights Reserved</div>
                    <div className={classes.footerRight}>
                        <img className={classes.footerIcon} src={Twitter} alt=""/>
                        <img className={classes.footerIcon} src={Facebook} alt=""/>
                        <img className={classes.footerIcon} src={Youtube} alt=""/>
                        <img className={classes.footerIcon} src={LinkedIn} alt=""/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;

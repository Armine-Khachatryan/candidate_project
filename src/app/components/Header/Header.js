import React from "react";
import Logo from "../../assets/images/logo.png";
import classes from './Header.module.css';
import s from '../HeaderAdmin/HeaderAdmin.module.css'
import {useNavigate} from "react-router-dom";





function Header(){

    const navigate=useNavigate();
    const onTop = () => {
        window.scrollTo(0, 0);
    }

    const SidebarData=[
        {
            title:"AR4Politics",
            href: "#ar-politics"
            // link:"/politics"
        },
        {
            title:"¿Qué es AR?",
            href: "#what-is-ra"
            // link:"/what-is-ra"
        },

        {
            title:"Costos",
            href: "#costs"
            // link:"/costos"
        }
        // {
        //     title:"Log Out",
        //     link:"/"
        // }
    ]


    const navigateToPageSpecialSection = (e, val) => {
        e.stopPropagation();
        navigate(`/${val.href}`);
    }
        const renderSideBarData = SidebarData.map((val, key)=>(
        <a className={`${window.location.hash===val.href ? s.activeHeader : s.headerMiddleInside}`}
           key={key}
           onClick={(e) => navigateToPageSpecialSection(e, val)}
           href={val.href}
        >{val.title}</a>
    ))


    return(
        <div className="headerFooterBackground">
            <div className="container">
                <div className={classes.headerWhole}>
                    <div className={classes.logoDiv} onClick={()=>{navigate('/#ar-politics');
                        onTop()}}>
                        <img src={Logo} alt=""/>
                    </div>
                    <div className={classes.headerMiddle}>
                        {renderSideBarData}
                    </div>
                    <div className={classes.headerRight}>
                       <div className={classes.leftBtn} onClick={()=>{navigate('/signup')}}>Crear Cuenta</div>
                        <div className={classes.rightBtn} onClick={()=>{navigate('/login')}}>Iniciar sesión</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;

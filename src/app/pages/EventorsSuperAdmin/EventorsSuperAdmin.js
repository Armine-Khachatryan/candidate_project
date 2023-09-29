import React, {useEffect, useState} from "react";
import Footer from "../../components/Footer/Footer";
import HeaderSuperAdmin from "../../components/HeaderSuperAdmin/HeaderSuperAdmin";
import {useNavigate} from 'react-router-dom';
import classes from './EventorsSuperAdmin.module.css';
import axios from "axios";
import config from "../../../config";
import Loader from "../../UI/Loader/Loader";
import {toast} from "react-toastify";


function EventorsSuperAdmin() {

    const [eventors, setEventors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getEventorsData();
    }, []);

    let getEventorsData = async () => {
        let token = sessionStorage.getItem('token');
        setIsLoading(true);
        try {
            let response = await axios.get(`${config.baseUrl}api/active-municipalities`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            setIsLoading(false);
            setEventors(response.data.data);
        } catch (error) {
            setIsLoading(false);
            toast.error(
                error.response?.data.message || "Something went wrong."
            )
        }
    }

    const renderEventors = eventors?.map((item, index) => (
        <div className={classes.singleEvent} key={index}>{item.name}</div>))

    if (isLoading) return <Loader/>;

    return (
        <div className="whole">
            <div>
                <HeaderSuperAdmin/>
                <div className="container">
                    <div className="upPart">
                        <div className="upTitle">Events</div>
                        {/*<Button OnClick={openIconsModal}>Create New*/}
                        {/*    <img className="plusIcon" src={Plus} alt=""/>*/}
                        {/*</Button>*/}
                    </div>
                    <div className={classes.eventorsContainer}>
                        <div className={classes.eventorsNumber}>{eventors?.length}</div>
                        <div className={classes.eventorsText}>Number of cities listed</div>
                    </div>
                    <div className={classes.eventors}>
                        {renderEventors}
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}


export default EventorsSuperAdmin;
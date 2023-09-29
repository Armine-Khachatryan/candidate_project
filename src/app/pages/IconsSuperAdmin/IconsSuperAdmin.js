import React, {useEffect, useState} from "react";
import Footer from "../../components/Footer/Footer";
import HeaderSuperAdmin from "../../components/HeaderSuperAdmin/HeaderSuperAdmin";
import classes from './IconsSuperAdmin.module.css';
import Button from "../../UI/Button/Button";
import Plus from "../../assets/images/Plus.svg";
import Delete from '../../assets/images/Delete.png';
import IconModal from "../../components/IconModal/IconModal";
import axios from "axios";
import config from "../../../config";
import {toast} from "react-toastify";
import Loader from "../../UI/Loader/Loader";


function IconsSuperAdmin(){

    const [iconsModalIsOpen, setIconsModalIsOpen] = useState(false);
    const [iconsData, setIconsData]= useState([]);
    const [isLoading, setIsLoading] = useState(false);

    function openIconsModal() {
        setIconsModalIsOpen(true);
    }

    function closeIconsModal(){
        setIconsModalIsOpen(false);
    }
    useEffect(()=>{
        getIconsData();
    }, [])

    let getIconsData =async () => {
        let token= sessionStorage.getItem('token');
        setIsLoading(true);
        try {
            let response = await axios.get(`${config.baseUrl}api/icons/all`,{
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            });
            setIsLoading(false);
            setIconsData(response.data.data)
        } catch (error) {
            setIsLoading(false);
            toast.error(
                error.response?.data.message || "Something went wrong."
            )
        }
    }


    let deleteIcon =async (id) => {
        let token= sessionStorage.getItem('token');
        setIsLoading(true);
        try {
            let response = await axios.delete(`${config.baseUrl}api/icons/delete/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            if(response.data.message=== "Successfully deleted"){
                setIsLoading(false);
                getIconsData();
            }
        } catch (error) {
            setIsLoading(false);
            toast.error(
                error.response?.data.message || "Something went wrong."
            )
        }
    }

    if (isLoading) return <Loader/>;

    const renderImages=iconsData?.map((item, index)=>(
            <div className={classes.icon}>
                <div className={classes.deleteIconDiv} onClick={()=>deleteIcon(item.id)}>
                    <img src={Delete} alt={""}/>
                </div>
                <div className={classes.iconImg}><img src={item.path} alt={""}/></div>
            </div>
    ))


    return (
        <div className="whole">
            <div>
                <HeaderSuperAdmin/>
                <div className="container">
                    <div className="upPart">
                        <div className="upTitle">Icons</div>
                        <Button OnClick={openIconsModal}>Create New
                            <img className="plusIcon" src={Plus} alt=""/>
                        </Button>
                    </div>
                    <div className={classes.iconsContainer}>
                        <div className={classes.iconsNumber}>{iconsData?.length}</div>
                        <div className={classes.iconsText}>
                            {`${iconsData?.length===0 ? "You don’t have added Icons yet" 
                                : iconsData?.length===1? "Icon" : "Icons" }`}
                        </div>
                    </div>
                    <div className={classes.icons}>
                        {renderImages}
                    </div>
                </div>
            </div>
            <IconModal iconsModalIsOpen={iconsModalIsOpen} closeIconsModal={closeIconsModal}
                       onGetIconsData={getIconsData}/>
            <Footer/>
        </div>
    )
}


export default IconsSuperAdmin;
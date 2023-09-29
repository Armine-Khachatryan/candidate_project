import React, {useEffect, useState} from 'react'
import Footer from "../../components/Footer/Footer";
import HeaderAdmin from "../../components/HeaderAdmin/HeaderAdmin";
import classes from '../../pages/IconsSuperAdmin/IconsSuperAdmin.module.css';
import Button from "../../UI/Button/Button";
import axios from "axios";
import config from "../../../config";
import {toast} from "react-toastify";
import Loader from "../../UI/Loader/Loader";
import Delete from "../../assets/images/Delete.png";
import IconModal from "../../components/IconModal/IconModal";

 const Industries = ()=>{
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

     if (isLoading) return <Loader/>;

     const renderImages=iconsData?.map((item, index)=>(
         <div className={classes.icon}>
             <div className={classes.deleteIconDiv} onClick={()=>deleteIcon(item.id)}>
                 <img src={Delete} alt={""}/>
             </div>
             <div className={classes.iconImg}><img src={item.path} alt={""}/></div>
         </div>
     ))



     let deleteIcon =async (id) => {
         let token = sessionStorage.getItem('token');
         setIsLoading(true);
         try {
             let response = await axios.delete(`${config.baseUrl}api/icons/delete/${id}`, {
                 headers: {
                     "Authorization": `Bearer ${token}`
                 }
             })
             if (response.data.message === "Successfully deleted") {
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

     return(
         <div className="whole">
             <div>
                 <HeaderAdmin/>
                 <div className="container">
                     <>
                         <div className="upPart">
                             <div className="upTitle">
                                 Industries
                             </div>
                             <Button OnClick={openIconsModal}>Create New +</Button>
                         </div>
                         <div className={classes.icons}>
                             {renderImages}
                         </div>
                     </>
                 </div>
             </div>
             <IconModal iconsModalIsOpen={iconsModalIsOpen} closeIconsModal={closeIconsModal}
                        onGetIconsData={getIconsData}/>
             <Footer/>
         </div>
      )
}

export default Industries
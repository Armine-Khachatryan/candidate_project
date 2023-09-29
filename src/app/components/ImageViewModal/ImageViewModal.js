import React, { useState} from "react";
import Modal from 'react-modal';
import CloseIcon from '../../assets/images/CloseIcon.svg';
import DownloadIcon from '../../assets/images/DownloadIcon.svg';
import classes from './ImageViewModal.module.css';
import {saveAs} from "file-saver";
import axios from "axios";
import config from "../../../config";
import {toast} from "react-toastify";
import Loader from "../../UI/Loader/Loader";



function ImageViewModal (props){

    const [isLoading, setIsLoading] = useState(false);
    const [modalImage, setModalImage]=useState(null);





    const customStyles = {
        content: {
            padding: '24px',
            maxWidth: '624px',
            width: '100%',
            top: '55%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background:'#FFFFFF',
            borderRadius:'8px',
        },
        overlay: {zIndex: 1000}
    };


    function closeImageModal (){
        props.closeImageViewModal();
    }





    // let imageDownloadingRequest =async () => {
    //     let token= sessionStorage.getItem('token');
    //     setIsLoading(true)
    //     try {
    //         let response = await axios.get(`${config.baseUrl}api/requests/download-photo/${props.modalData.id}`, {
    //             headers: {
    //                 "Authorization": `Bearer ${token}`
    //             }
    //         })
    //         setIsLoading(false);
    //         console.log(response)
    //         saveAs(response.config.url, "image.jpg");
    //         // closeImageModal ();
    //     } catch (e) {
    //         setIsLoading(false);
    //         toast.error(
    //             e.response || "Something went wrong."
    //         )
    //     }
    // }

    let imageDownloadingRequest =async () => {
        let token= sessionStorage.getItem('token');
        setIsLoading(true)
        try {
            let response = await axios.get(`${config.baseUrl}api/requests/download-photo/${props.modalData.id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                responseType: 'blob',
            })
            setIsLoading(false);
            const blob = new Blob([response.data], {type: 'image/jpeg'}) // Adjust MIME type as needed
            const blobUrl = URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = blobUrl;
            anchor.download = 'downloaded-image.jpg'; // Set the default download filename
            anchor.style.display = 'none';
            document.body.appendChild(anchor)
            ;
            anchor.click();
            document.body.removeChild(anchor)
            ;
            URL.revokeObjectURL(blobUrl);
        } catch (error) {
            setIsLoading(false);
                    toast.error(
                        error.response || "Something went wrong."
                    )
        }
    }


    if (isLoading) return <Loader/>;

    return (
        <>
            <Modal
                isOpen={props.imageViewModalIsOpen}
                onRequestClose={closeImageModal}
                style={customStyles}
                ariaHideApp={false}
            >
                <div className={classes.modalInside}>
                    <div className={classes.closingModal}>
                        <div className={classes.modalTitle}>Imagen del candidato</div>
                        <div style={{display:"flex"}}>
                            <div onClick={imageDownloadingRequest}>
                                <img className={classes.downloadIconStyle} src={DownloadIcon}/>
                            </div>
                            <div onClick={closeImageModal}>
                                <img className={classes.closeModalImg} src={CloseIcon} alt=""/>
                            </div>
                        </div>
                    </div>
                    <div className={classes.imageContainer}>
                        <img className={classes.imageStyle} src={props?.modalData?.photo}/>
                    </div>
                </div>
            </Modal>
        </>
    )
}


export default ImageViewModal;


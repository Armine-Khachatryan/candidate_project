import React, { useState} from "react";
import Modal from 'react-modal';
import CloseIcon from '../../assets/images/CloseIcon.svg';
import classes from './IconModal.module.css';
import DeleteIcon from "../../assets/images/DeleteIcon.svg";
import DragDrop from "../../assets/images/DragDrop.png";
import ImageUploader from "../ImageUploader/ImageUploader";
import axios from "axios";
import config from "../../../config";
import Loader from "../../UI/Loader/Loader";
import {toast} from "react-toastify";


function IconModal (props){


    const [body, setBody] = useState({});
    const [isLoading, setIsLoading] = useState(false);

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

    const onChangeInput = (e) => {
        body[e.target.name] =e.target.value;
            setBody({...body});
    };

    let saveIcon =async () => {
        let token= sessionStorage.getItem('token');
        let formData = new FormData();
        formData.append('icon', body?.icon);
        setIsLoading(true)
        try {
            let response = await axios.post(`${config.baseUrl}api/icons/create`, formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            if(response.data.message=== "success"){
                setIsLoading(false);
                props.onGetIconsData();
                closeModal();
            }
        } catch (e) {
            setIsLoading(false);
            toast.error(
                e.response?.data.message || "Something went wrong."
            )
            closeModal();
        }
    }

    if (isLoading) return <Loader/>;


    function closeModal (){
        props.closeIconsModal();
        setBody({icon : null})
    }

    return (
        <>
            <Modal
                isOpen={props.iconsModalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                ariaHideApp={false}
            >
                <div className={classes.modalInside}>
                    <div className={classes.closingModal}  onClick={closeModal}>
                        <div className={classes.modalTitle}>Add Icon</div>
                        <div><img className={classes.closeModalImg} src={CloseIcon} alt=""/></div>
                    </div>
                    <div className={classes.iconDragDrop}>
                        <ImageUploader
                            deleteIcon={DeleteIcon}
                            image={DragDrop}
                            textDragDrop="Drag and drop Icon, or "
                            spanText="Browse"
                            width={'100%'}
                            height={'200px'}
                            imgWidth={'274px'}
                            imgHeight={'105px'}
                            max="Max 2kb"
                            // maxSize={2097152}
                            name={'icon'}
                            selectedImg={body?.icon}
                            OnUpdateImage={onChangeInput}
                        />
                    </div>
                    <div className={classes.saveBtn} onClick={saveIcon}>Save</div>
                </div>
            </Modal>
        </>
    )
}


export default IconModal;

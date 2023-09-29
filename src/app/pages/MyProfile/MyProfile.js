import React, { useState, useEffect } from "react";
import classes from './MyProfile.module.css';
import HeaderAdmin from "../../components/HeaderAdmin/HeaderAdmin";
import Footer from "../../components/Footer/Footer";
import BrownAvatar from "../../assets/images/BrownAvatar.svg";
import ImageUploader from "../../components/ImageUploader/ImageUploader";
import EditIcon from "../../assets/images/EditBrown.svg";
import Delete from "../../assets/images/Delete.png";
import DragDrop from "../../assets/images/DragDrop.png";
import Button from "../../UI/Button/Button";
import CreateAvatar from "../../assets/images/CreateAvatar.svg";
import Input from "../../UI/Input/Input";
import Loader from "../../UI/Loader/Loader";
import {toast} from "react-toastify";
import ChangePasswordModal from "../../components/ChangePasswordModal/ChangePasswordModal";
import axios from "axios";
import config from "../../../config";
import {setUserData} from "../../features/User/UserSlice";
import {useDispatch} from "react-redux"


function MyProfile(){

    const [showEditable, setShowEditable]=useState(false);
    const [changePasswordModalIsOpen, setChangePasswordModalIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [body, setBody] = useState({});
    const [image_deleted, setImage_deleted]=useState(false);
    const dispatch=useDispatch();


    function openChangePasswordModal() {
        setChangePasswordModalIsOpen(true);
    }

    function closeChangePasswordModal() {
        setChangePasswordModalIsOpen(false);
    }

    useEffect(()=>{
        getProfileData();
    },[]);

    let getProfileData = async ()=>{
        let token = sessionStorage.getItem('token');
        setIsLoading(true);
        try{
            let response =await axios.get(`${config.baseUrl}api/my-profile`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
                setIsLoading(false);
                setBody(response.data.data)
                console.log(response.data.data, "profile response data")
        }
        catch (error){
            setIsLoading(false);
            toast.error(
                error.response?.data.message || "Something went wrong"
            )
        }
    }

    let editProfile = async ()=>{
        let token = sessionStorage.getItem('token');
        setIsLoading(true);
        let formData = new FormData();
        if(typeof (body?.avatar) !=="string" && body?.avatar !==null){
            formData.append('avatar', body?.avatar);
        }
        if(image_deleted){
            formData.append('image_deleted', 1);
        }
        else{
            formData.append('image_deleted', 0);
        }
        formData.append('name', body?.name);
        formData.append('phone', body?.phone);
        setShowEditable(false)
        try {
            let response = await axios.post(`${config.baseUrl}api/my-profile/update`, formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            setIsLoading(false);
            setBody(response.data.data);
            dispatch(setUserData(response.data.data));
        } catch (error) {
            setIsLoading(false);
            toast.error(
                error.response?.data.message || "Something went wrong"
            )
        }
    }


    const onChangeInput = (e) => {
        const {name, value} = e.target;
        setBody((prevBody) => ({...prevBody, [name]: value}));
        // setErrors({
        //     ...errors,
        //     [name]: null
        // });
    };




    if (isLoading) return <Loader/>;


    return(
        <div className="whole">
            <div>
                <HeaderAdmin/>
                <div className="container">
                    <div className="upPart">
                        <div className="upTitle">My Profile</div>
                    </div>
                        <div className={classes.profileWhole}>
                            <div className={classes.profileLeft}>
                                {!showEditable ?
                                    <div className={classes.editIconDiv} onClick={() => setShowEditable(!showEditable)}>
                                        <img src={EditIcon} alt=""/>
                                    </div>:
                                    <div className={classes.editIconDiv}/>
                                }
                                <div className={classes.imgUploaderDiv}>
                                    {!showEditable ?
                                        <div className={classes.avatarDiv}>
                                            <img src={body?.avatar || BrownAvatar}/>
                                        </div> :
                                        <ImageUploader
                                            deleteIcon={Delete}
                                            image={CreateAvatar}
                                            textDragDrop="Add profile photo o"
                                            spanText="Buscarlo"
                                            width={'405px'}
                                            height={'200px'}
                                            imgWidth={'120px'}
                                            imgHeight={'135px'}
                                            max="Max 2kb"
                                            // maxSize={2097152}
                                            name={'avatar'}
                                            selectedImg={body?.avatar}
                                            OnUpdateImage={onChangeInput}
                                            OnSetImage_deleted={setImage_deleted}
                                        />
                                    }
                                </div>
                                {!showEditable ?
                                    <>
                                        <div className={classes.profileInfo}>Candidate’s name:
                                            <span className={classes.profileInfoWritten}> {body?.name}</span>
                                        </div>
                                        <div className={classes.profileInfo}>Correo electrónico del candidato:
                                            <span
                                                className={classes.profileInfoWritten}> {body?.email}</span>
                                        </div>
                                        <div className={classes.profileInfo}>Número de teléfono del candidato:
                                            <span className={classes.profileInfoWritten}> {body?.phone}</span>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <Input input={{
                                            placeholder: "Candidate’s name",
                                            name: "name",
                                            value: body?.name,
                                            type: "text",
                                            onChange: onChangeInput
                                        }}
                                        />
                                        <input
                                            className={classes.emailInput}
                                            readOnly={true}
                                            placeholder={body?.email}
                                            // name: inputsOfMunicipality?.name,
                                            // value: inputsOfMunicipality?.name || "",
                                        />
                                        <Input input={{
                                            placeholder: "Candidate’s phone number",
                                            name:"phone",
                                            value: body?.phone || "",
                                            type: "number",
                                            onChange: onChangeInput
                                        }}
                                        />
                                    </>
                                }
                                <div className={classes.changePass} onClick={openChangePasswordModal}>Change Password</div>
                                {/*<div className={classes.changePassEdit}>Change Password</div>*/}
                                {showEditable && <div style={{marginTop:"24px"}}>
                                    <Button width={"100%"} OnClick={editProfile}> Guardar Cambios</Button>
                                </div>}
                            </div>
                            <div className={classes.profileRight}>
                                <div className={classes.profileInfo}> ID de la Campaña :
                                    <span className={classes.profileInfoWritten}> {body?.campaign_id}</span>
                                </div>
                                <div className={classes.profileInfo}> Código DANE del municipio:
                                    <span className={classes.profileInfoWritten}> {body?.m_code}</span>
                                </div>
                                <div className={classes.profileInfo}> Nombre del Departamento:
                                    <span className={classes.profileInfoWritten}> {body?.m_state}</span>
                                </div>
                                <div className={classes.profileInfo}> Nombre del municipio:
                                    <span className={classes.profileInfoWritten}> {body?.m_name}</span>
                                </div>
                                <div className={classes.profileInfo}> Categoría del municipio:
                                    <span className={classes.profileInfoWritten}> {body?.m_category}</span>
                                </div>
                                <div className={classes.profileInfo}> Nombre del Partido Político:
                                    <span className={classes.profileInfoWritten}> {body?.political_party_name}</span>
                                </div>
                            </div>
                        </div>
                        {/*<Button OnClick={() => createEvent(singleEvent)}>Save</Button>*/}
                    </div>
                <ChangePasswordModal changePasswordModalIsOpen={changePasswordModalIsOpen}
                                     closeChangePasswordModal={closeChangePasswordModal}
                                     onSetShowEditable={setShowEditable}/>
                </div>
            <Footer/>
        </div>
    )
}


export default MyProfile;
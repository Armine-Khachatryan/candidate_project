import React, {useState} from "react";
import Proposal from "../Proposal/Proposal";
import classes from './ProposalPart.module.css';
import Input from "../../UI/Input/Input";
import AudioUploader from "../AudioUploader/AudioUploader";
import DeleteIcon from "../../assets/images/DeleteIcon.svg";
import CreateSpeech from "../../assets/images/CreateSpeech.svg";
import Button from "../../UI/Button/Button";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import config from "../../../config";
import {toast} from "react-toastify";
import Loader from "../../UI/Loader/Loader";



function ProposalPart(props){
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [body, setBody] = useState(
        {
            speech:null,
            icon_id:null,
            profile_id:props?.profile_id
        }
    );

    const onChangeInput =(e)=>{
       const {name, value} = e.target;
        setBody((prev)=>({
                ...prev,
                [name]:value
        }))
    }

    let createProposal =async ()=>{
        let token= sessionStorage.getItem('token');
        let formData = new FormData();
        formData.append('name', body?.name);
        formData.append('icon_id', body?.icon_id);
        formData.append('speech', body?.speech);
        formData.append('user_profile_id', body?.profile_id);
        setIsLoading(true);
        try {
            let response = await axios.post(`${config.baseUrl}api/industries/create`, formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            if(response.data.message==="success"){
                props.onSetShowProposalsPart(false);
                props.onSetProposals(true)
                props.setRerendererBody(prev=>({...prev,industries : [response.data.data,...prev.industries]}))
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            toast.error(
                error.response?.data.message || "Something went wrong."
            )
        }
    }

    if (isLoading) return <Loader/>;
    return(
        <>
            <div className="container">
                <div className="upPart">
                    <div className="upTitle"><span className="titleSpan" onClick={() => navigate('/companies/created')}>Campañas Creadas / </span>
                        <span className="titleSpan" onClick={() => { navigate('/companies/edit');
                            props.onSetProposal(false)}}>Actualizar
                            campaña / </span>Create Proposal
                    </div>
                    <Button OnClick={createProposal}>
                        Guardar</Button>
                </div>
                <div className={classes.typeNameInput}>
                    <Input
                        input={{
                            maxWidth:"515px",
                            width: "100%",
                            name: "name",
                            onChange:onChangeInput,
                            // value: singleEvent.location,
                            placeholder: "Type name of field",
                            type: "text",
                        }}
                    />
                </div>
                <div className={classes.titleSwiper}>Select Icon For proposal</div>
                <Proposal proposalsIcons={props.proposalsIcons} onsetId={onChangeInput}/>
                <div className={classes.singleDragDropProposal} style={{marginTop:"48px"}}>
                    <AudioUploader
                        deleteIcon={DeleteIcon}
                        image={CreateSpeech}
                        textDragDrop="Drag and drop your audio, or "
                        spanText="Browse"
                        width={'100%'}
                        height={'200px'}
                        max="Max 2 minutes"
                        // maxSize={2097152}
                        name={'speech'}
                        selectedAud={body?.speech}
                        OnUpdateImage={onChangeInput}
                    />
                </div>
            </div>
        </>
    )
}


export default ProposalPart;
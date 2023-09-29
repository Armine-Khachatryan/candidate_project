import React, {useState, useEffect} from "react";
import axios from "axios";
import config from "../../../config";
import Input from "../../UI/Input/Input";
import Loader from "../../UI/Loader/Loader";
import Button from "../../UI/Button/Button";
import classes from './EditCampanaSuperAdmin.module.css'
import {useNavigate, useLocation} from "react-router-dom";
import DeleteIcon from "../../assets/images/DeleteIcon.svg";
import DownloadIcon from '../../assets/images/DownloadIcon.svg';
import DragDrop from "../../assets/images/DragDrop.png";
import CreateAvatar from "../../assets/images/CreateAvatar.svg";
import CreateSpeech from "../../assets/images/CreateSpeech.svg";
import SelectSearch from "react-select-search";
import Plus from "../../assets/images/Plus.svg";
import {saveAs} from "file-saver";
import Delete from "../../assets/images/Delete.png";
import ImageUploader from "../../components/ImageUploader/ImageUploader";
import AudioUploader from "../../components/AudioUploader/AudioUploader";
import EditAction from "../../assets/images/EditAction.svg";
import ProposalPart from "../../components/ProposalPart/ProposalPart";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import s from "../Signup/SignUp.module.css";
import {NewInput} from "../../UI/NewInput/NewInput";

function EditCampanaSuperAdmin(){
    const navigate = useNavigate();
    const {state} = useLocation();
    const id = state;
    const [body, setBody] = useState({});
    const [municipalityOptions, setMunicipalityOptions]=useState([]);
    const [showAgregarBtnActive, setShowAgregarBtnActive]=useState(false);
    const [renderPaymentsData, setRenderPaymentsData]=useState(false);
    const [renderPaymentsBelowData, setRenderPaymentsBelowData]=useState(true);
    const [paymentsInfo, setPaymentsInfo] = useState([]);
    const [inputsOfMunicipality, setInputsOfMunicipality] = useState();
    const [proposalsIcons, setProposalsIcons]=useState([]);
    const [proposals, setProposals]=useState(false);
    const [showProposalsPart, setShowProposalsPart]=useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState(null);

    useEffect(()=>{
        getSelectOptions();
    }, [])

    useEffect(()=>{
        postMunicipalityCode()
    }, [body?.m_code])

    useEffect(()=>{
        getProposals();
    },[showProposalsPart])


    useEffect(()=>{
        getBodyData();
    }, [id,proposals])

    let getProposals = async()=>{
        let token= sessionStorage.getItem('token');
        setIsLoading(true)
        try {
            let response = await axios.get(`${config.baseUrl}api/icons/all`,{
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            });
            setIsLoading(false);
            setProposalsIcons(response.data.data)
        } catch (error) {
            setIsLoading(false);
            toast.error(
                error.response?.data.message || "Something went wrong"
            )
        }
    }

    let getBodyData =async () => {
        let token= sessionStorage.getItem('token');
        setIsLoading(true);
        try {
            let response = await axios.get(`${config.baseUrl}api/candidate/show/${id}`,{
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            });
            setIsLoading(false);
            setBody(response.data.data)
        } catch (error) {
            setIsLoading(false);
            toast.error(
                error.response?.data.message || "Something went wrong"
            )
        }
    }

    let postMunicipalityCode =async () => {
        let token= sessionStorage.getItem('token');
        let formData = new FormData();
        formData.append('m_code', body?.m_code);
        setIsLoading(true)
        try {
            let response = await axios.post(`${config.baseUrl}api/municipality-by-code`, formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            if(response.data.message=== "success"){
                setIsLoading(false);
                setInputsOfMunicipality(response.data.data)
            }
        } catch (error) {
            setIsLoading(false);
            // toast.error(
            //     error.response?.data.message || "Something went wrong"
            // )
        }
    }


    const handleChangeSelect =(e)=>{
        setBody((prev) => ({
            ...prev,
            "m_code": e
        }));
    }


    const handleChangePayments = (e, index) => {
        const { name, value } = e.target;
        if(paymentsInfo.length) {
            setPaymentsInfo((prevPaymentsInfo) => {
                const updatedPaymentsInfo = [...prevPaymentsInfo];
                if (updatedPaymentsInfo[index]) {
                    if (name === "status") {
                        updatedPaymentsInfo[index][name] = +value;
                    } else {
                        updatedPaymentsInfo[index][name] = value;
                    }
                } else {
                    updatedPaymentsInfo[index] = {[name]: name === "status" ? +value : value};
                }
                return updatedPaymentsInfo;
            });
        }
        else {
            const updatedPaymentsInfo = [...body?.payments];
            if (updatedPaymentsInfo[index]) {
                if (name === "status") {
                    updatedPaymentsInfo[index][name] = +value;
                } else {
                    updatedPaymentsInfo[index][name] = value;
                }
            } else {
                updatedPaymentsInfo[index] = {[name]: name === "status" ? +value : value};
            }
            setBody((prev) => ({
                ...prev,
                payments: updatedPaymentsInfo
            }));
        }
    };


    const onChangeInput = (e) => {
        const { name, value } = e.target;
        if (name === "number_of_payments") {
            const newNumberOfPayments = parseInt(value);
            setShowAgregarBtnActive(true);
            setRenderPaymentsData(false);
            // setRenderPaymentsData(false)
            const updatedPaymentsInfo = [...body?.payments];
            if (newNumberOfPayments > updatedPaymentsInfo.length) {
                const diff = newNumberOfPayments - updatedPaymentsInfo.length;
                for (let i = 0; i < diff; i++) {
                    updatedPaymentsInfo.push({ date: null, sum: null, status: 0 });
                }
            } else if (newNumberOfPayments < updatedPaymentsInfo.length) {
                updatedPaymentsInfo.splice(newNumberOfPayments);
            }
            setPaymentsInfo(updatedPaymentsInfo);
        }
        setBody((prevBody) => ({ ...prevBody, [name]: value }));
    };

    const onSelectList = (e) => {
        setBody(prev => ({...prev, plan: e.value}))
    }


    let getSelectOptions =async () => {
        let token= sessionStorage.getItem('token');
        setIsLoading(true)
        try {
            let response = await axios.get(`${config.baseUrl}api/all-municipalities`,{
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            });
            setIsLoading(false);
            setMunicipalityOptions(response.data.data);
        } catch (error) {
            setIsLoading(false);
            // toast.error(
            //     error.response?.data.message || "Something went wrong"
            // )
        }
    }

    let deleteIcon =async (id) => {
        let token= sessionStorage.getItem('token');
        setIsLoading(true)
        try {
            let response = await axios.delete(`${config.baseUrl}api/industries/delete/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            if(response.data.message=== "Successfully deleted"){
                setIsLoading(false);
                getBodyData()
            }
        } catch (error) {
            setIsLoading(false);
            toast.error(
                error.response?.data.message || "Something went wrong"
            )
        }
    }

    let saveEditCompana =async () => {
        let token= sessionStorage.getItem('token');
        let formData = new FormData();
        if(typeof (body?.logo) !=="string"){
            formData.append('logo', body?.logo);
        }
        else if(typeof (body?.model_3d) !=="string"){
            formData.append('model_3d', body?.model_3d);
        }
        else if(typeof (body?.voice) !=="string"){
            formData.append('voice', body?.voice);
        }
        formData.append('name', body?.name);
        formData.append('email', body?.email);
        formData.append('phone', body?.phone);
        formData.append('campaign_id', body?.campaign_id);
        formData.append('political_party_name', body?.political_party_name);
        formData.append('contract_value', body?.contract_value);
        formData.append('m_code', body?.m_code);
        formData.append('website', body?.website);
        formData.append('plan', body?.plan);
        formData.append('number_of_payments', body?.number_of_payments);
        for(let i=0; i<body?.payments.length; i++){
            formData.append(`payments[${i}][date]`, body?.payments[i].date)
            formData.append(`payments[${i}][sum]`, body?.payments[i].sum);
            formData.append(`payments[${i}][status]`, body?.payments[i].status);
        }
        setIsLoading(true)
        try {
            let response = await axios.post(`${config.baseUrl}api/candidate/update/${id}`, formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            setIsLoading(false);
            navigate('/companies/created')
        } catch (error) {
            setIsLoading(false);
            toast.error(
                error.response?.data.message || "Something went wrong"
            )
        }
    }


    const renderPayments = Array.from({length:body?.number_of_payments})?.map((item, index)=>(
        <div className={classes.inputs} key={index}>
            <div style={{width:"50%"}}>
                <Input
                    input={{
                        maxWidth:"unset",
                        width: "100%",
                        name: `date`,
                        // value: paymentsInfo[index]?.date || null,
                        value: body?.payments[index]?.date,
                        placeholder: `Date ${index + 1}`,
                        type: "date",
                        onChange: (e)=>handleChangePayments(e,index)
                    }}
                />
            </div>
            <div style={{width:"50%"}}>
                <Input
                    input={{
                        maxWidth:"unset",
                        width: "100%",
                        name: `sum`,
                        value: body?.payments[index]?.sum,
                        placeholder: `Amount ${index + 1}`,
                        type: "number",
                        onChange: (e)=>handleChangePayments(e,index)
                    }}
                />
            </div>
        </div>
    ))

    const renderIndustries=body?.industries?.map((item, index)=>(
        <div className={classes.singleIndustryDiv}  key={index}>
            <div className={classes.singleIndustry}>
                <div className={classes.deleteIconDiv}
                     onClick={()=>deleteIcon(item.id)}
                >
                    <img src={Delete} alt={""}/>
                </div>
                <div className={classes.industryImg}><img src={item.icon} alt={""}/></div>
            </div>
            <div className={classes.industryName}>{item.name}</div>
        </div>
    ))

    const handleChangeActiveCandidate = async (e, id)=>{
        let token= sessionStorage.getItem('token');
        let formData = new FormData();
        formData.append('status', +e.target.checked);
        setIsLoading(true);
        setBody((prev) => ({
            ...prev,
            status: +e.target.checked
        }));
        try {
            let response = await axios.post(`${config.baseUrl}api/candidate/change-status/${id}`, formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            setIsLoading(false)
            //         navigate('/companies/created');
        } catch (e) {
            setIsLoading(false);
            toast.error(
                e.response?.data.message || "Something went wrong."
            )
        }
    }


    const handleDownloadPhoto = async () => {
        let token = sessionStorage.getItem('token');
        setIsLoading(true)
        try {
            let response = await axios.get(`${config.baseUrl}api/candidate/download-photo/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                responseType: 'blob',
            })
            setIsLoading(false);
            const blob = new Blob([response.data], {type: 'image/jpeg'}); // Adjust MIME type as needed
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

    let downloadQr = async () => {
        let token = sessionStorage.getItem('token');
        setIsLoading(true)
        try {
            let response = await axios.get(`${config.baseUrl}api/candidate/download-qr/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                responseType: 'blob',
            })
            setIsLoading(false);
            const blob = new Blob([response.data], {type: 'image/svg'}); // Adjust MIME type as needed
            const blobUrl = URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = blobUrl;
            anchor.download = 'downloaded-image.svg'; // Set the default download filename
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
    // let downloadQr = async () => {
    //     let token= sessionStorage.getItem('token');
    //     setIsLoading(true)
    //     try {
    //         let response = await axios.get(`${config.baseUrl}api/candidate/download-qr/${id}`, {
    //             headers: {
    //                 "Authorization": `Bearer ${token}`
    //             }
    //         })
    //         setIsLoading(false);
    //         console.log(response, "downloadqr")
    //         saveAs(response.config.url, "image.svg");
    //         // closeImageModal ();
    //     } catch (e) {
    //         setIsLoading(false);
    //         toast.error(
    //             e.response || "Something went wrong."
    //         )
    //     }
    //}


    if (isLoading) return <Loader/>;

    return(
        !showProposalsPart ?
            <>
                <div className="container">
                    <div className="upPart">
                        <div className="upTitle"><span className="titleSpan" onClick={() => navigate('/companies/created')}>Campañas Creadas / </span> Actualizar
                            campaña
                        </div>
                        <div style={{display:"flex", alignItems:"center"}}>
                            <div className={classes.switcherDiv}>
                                <div className={classes.switcherName}>Activar campaña</div>
                                <label className="switch">
                                    <input type="checkbox" name={"activeCandidate"}
                                           onChange={(e)=>handleChangeActiveCandidate(e, id)}
                                           checked={body?.status}/>
                                    <span className="slider round"/>
                                </label>
                            </div>
                            <Button
                                OnClick={saveEditCompana}>
                                Guardar</Button>
                        </div>
                    </div>
                    <div className={classes.downloadedFiles}>
                        <div onClick={handleDownloadPhoto} className={classes.downloadPhoto}>Download photo
                            <img className={classes.downloadIconStyle} src={DownloadIcon}/>
                        </div>
                        <div onClick={downloadQr} className={classes.downloadPhoto}>Download Qr
                            <img className={classes.downloadIconStyle} src={DownloadIcon}/>
                        </div>
                    </div>

                    <div className={classes.dragDropsEdit}>
                        <div className={classes.singleDragDropEdit}>
                            <ImageUploader
                                deleteIcon={DeleteIcon}
                                image={CreateAvatar}
                                textDragDrop="Drag and drop candidate avatar, or "
                                spanText="Browse"
                                width={'100%'}
                                height={'200px'}
                                imgWidth={'120px'}
                                imgHeight={'135px'}
                                // max="Max 2kb"
                                // maxSize={2097152}
                                name={'model_3d'}
                                selectedImg={body?.model_3d}
                                OnUpdateImage={onChangeInput}
                            />
                        </div>
                        <div className={classes.singleDragDropEdit}>
                            <ImageUploader
                                deleteIcon={DeleteIcon}
                                image={DragDrop}
                                textDragDrop="Drag and drop political logo, or "
                                spanText="Browse"
                                width={'100%'}
                                height={'200px'}
                                imgWidth={'120px'}
                                imgHeight={'135px'}
                                // max="Max 2kb"
                                // maxSize={2097152}
                                name={'logo'}
                                selectedImg={body?.logo}
                                OnUpdateImage={onChangeInput}
                            />
                        </div>
                        <div className={classes.singleDragDropEdit}>
                            <AudioUploader
                                deleteIcon={DeleteIcon}
                                image={CreateSpeech}
                                textDragDrop="Drag and drop candidate intro speech, or "
                                spanText="Browse"
                                width={'100%'}
                                height={'200px'}
                                max="Max 2 minutes"
                                // maxSize={2097152}
                                name={'voice'}
                                selectedAud={body?.voice}
                                OnUpdateImage={onChangeInput}
                            />
                        </div>
                    </div>
                    <div className={classes.inputsEdit}>
                        <Input
                            input={{
                                placeholder: "Candidate’s name*",
                                onChange: onChangeInput,
                                name: "name",
                                type: "text",
                                value: body?.name,
                            }}
                        />
                        <Input
                            input={{
                                placeholder: "Correo electrónico del candidato*",
                                onChange: onChangeInput,
                                name: "email",
                                type: "email",
                                value: body?.email,
                            }}
                        />
                        <Input
                            input={{
                                placeholder: "Número de teléfono del candidato*",
                                onChange: onChangeInput,
                                name: "phone",
                                type: "number",
                                value: body?.phone,
                            }}
                        />
                    </div>
                    <div className={classes.inputsEdit}>
                        <Input
                            input={{
                                placeholder: " ID de la Campaña, ej (00001)*",
                                onChange: onChangeInput,
                                name: "campaign_id",
                                type: "text",
                                value: body?.campaign_id,
                            }}
                        />
                        <SelectSearch
                            placeholder="Código DANE del municipio*"
                            options={municipalityOptions}
                            name="m_code"
                            value={body?.m_code}
                            search
                            onChange={handleChangeSelect}/>
                        <Input
                            input={{
                                placeholder: "Nombre del Departamento*",
                                type: "text",
                                value: inputsOfMunicipality?.name || body?.m_name
                            }}
                        />
                        <Input
                            input={{
                                placeholder: "Nombre del municipio*",
                                value: inputsOfMunicipality?.state || body?.state,
                                type: "text",
                            }}
                        />
                    </div>
                    <div className={classes.inputsEdit}>
                        <Input
                            input={{
                                placeholder: "Categoría del municipio*",
                                width: "100%",
                                value: inputsOfMunicipality?.category || body?.m_category,
                                type: "text",
                            }}
                        />
                        <Input
                            input={{
                                width: "100%",
                                placeholder: "Nombre del Partido Político*",
                                onChange: onChangeInput,
                                name: "political_party_name",
                                type: "text",
                                value: body?.political_party_name,
                            }}
                        />
                        <Input
                            input={{
                                width: "100%",
                                placeholder: "Valor del contrato*",
                                onChange: onChangeInput,
                                name: "contract_value",
                                type: "text",
                                value: body?.contract_value,
                            }}
                        />
                    </div>
                    <div className={`${classes.title}`}>Link del sitio oficial del candidato</div>
                    <div className={s.body}>
                        <NewInput placeholder={'Link del sitio oficial del candidato'} name={'website'} onChange={onChangeInput}
                                  value={body?.website}/>
                    </div>
                    <div className={`${classes.title}`}>Selecciona el plan de tu interés, nuestro equipo de ventas se
                        pondrá
                        en contacto contigo
                    </div>
                    <div className={`${classes.block}`}>
                        <div className={`${classes.list} ${body?.plan === 'full' ? classes.selected_plan : null}`}
                             onClick={() => onSelectList({value: 'full'})}>Full Campaña ($10.499.999/mes) paga los 3
                            meses de
                            campaña y ahorra 25%
                        </div>
                        <div className={`${classes.list} ${body?.plan === 'half' ? classes.selected_plan : null}`}
                             onClick={() => onSelectList({value: 'half'})}>Media Campaña ($12.599.999/mes) paga 2 meses
                            y ahorra
                            10%
                        </div>
                        <div className={`${classes.list} ${body?.plan === 'small' ? classes.selected_plan : null}`}
                             onClick={() => onSelectList({value: 'small'})}>Small Campaña ($13.999.999/mes) paga 1 mes
                        </div>
                        <div className={`${classes.list} ${body?.plan === 'free' ? classes.selected_plan : null}`}
                             onClick={() => onSelectList({value: 'free'})}
                        >
                            Versión Gratuita / 15 días de prueba por una única vez
                        </div>
                    </div>
                    <div className="upPart">
                        <div className="upTitle">Condiciones de pago</div>
                    </div>
                    {(!renderPaymentsBelowData || body?.payments?.length ===0) &&
                        <div className={classes.inputsEdit}>
                            <div style={{width: "50%"}}>
                                <Input
                                    input={{
                                        maxWidth: "unset",
                                        width: "100%",
                                        name: "number_of_payments",
                                        // value: body?.payments.length || null,
                                        value: body?.number_of_payments || paymentsInfo?.length,
                                        placeholder: "Numero de pagos",
                                        type: "number",
                                        onChange: onChangeInput
                                    }}
                                />
                            </div>
                            <div style={{width: "50%"}}>
                                <button   className={` ${!showAgregarBtnActive? classes.notActiveBtn : classes.activeBtn}`}
                                          onClick={()=>{
                                              setRenderPaymentsData (!renderPaymentsData);
                                              setShowAgregarBtnActive(false)
                                          }}>
                                {/*<button*/}
                                {/*    className={` ${body?.number_of_payments === null || body?.number_of_payments === "" ? classes.notActiveBtn : classes.activeBtn}`}*/}
                                {/*    onClick={() => setRenderPaymentsData(!renderPaymentsData)}>*/}
                                    Agregar
                                </button>
                            </div>
                        </div>
                    }
                    {(renderPaymentsBelowData && body?.payments?.length !==0 )?
                        <div className={classes.paymentsPart}>
                            <div className={classes.paymentsApprovedWhole}>
                                <div className={classes.paymentsApprovedPart}>Numero de pagos</div>
                                <div className={classes.paymentsApprovedPart}># of Payments</div>
                                <div className={classes.paymentsApprovedPart}>Payments date</div>
                                <div className={classes.paymentsApprovedPart}>Status</div>
                                <div className={classes.paymentsApprovedPart}>Actions</div>
                            </div>
                            {body?.payments?.map((item, index) => {
                                return (
                                    <div className={classes.paymentsApprovedWhole} key={index}>
                                        <div className={classes.paymentsApprovedPart}>{body?.payments?.length}</div>
                                        <div className={classes.paymentsApprovedPart}>{item.sum}</div>
                                        <div className={classes.paymentsApprovedPart}>{item.date}</div>
                                        <select  className={classes.paymentsApprovedPart}  name="status"
                                                 onChange={ (e)=>handleChangePayments(e, index)}
                                                 value={item.status}
                                        >1
                                            <option  selected disabled hidden ></option>
                                            <option value={+0}>Unpaid</option>
                                            <option value={+1}>Paid</option>
                                        </select >
                                        <div className={classes.paymentsApprovedPart}
                                             onClick={() => {
                                                 setRenderPaymentsData(true);
                                                 setRenderPaymentsBelowData(false)
                                             }}>
                                            <img className={classes.editAction} src={EditAction} alt=""/></div>
                                    </div>
                                )
                            })}
                        </div> : <>
                            {renderPaymentsData && renderPayments }
                            {renderPaymentsData &&
                            <div style={{marginBottom: "50px"}}>
                                <Button width={"100%"} OnClick={() => {
                                    setRenderPaymentsBelowData(true);
                                    setRenderPaymentsData(false);
                                    if(paymentsInfo.length){
                                        setBody((prev) => ({
                                            ...prev,
                                            payments: paymentsInfo
                                        }));
                                    }
                                }}>Ahorrar</Button>
                            </div>}
                        </>
                    }
                    <div className="upPart">
                        <div className="upTitle">Propuestas</div>
                        <Button OnClick={() => setShowProposalsPart(!showProposalsPart)}>Create Proposal
                            <img className="plusIcon" src={Plus} alt=""/>
                        </Button>
                    </div>
                    {body?.industries &&
                        <div className={classes.industryContainer}>
                            {renderIndustries}
                        </div>
                    }
                </div>
            </>
            : <ProposalPart proposalsIcons={proposalsIcons} onSetProposal={setShowProposalsPart}
                            onSetShowProposalsPart={setShowProposalsPart}
                            profile_id={body?.profile_id}
                            onSetProposals={setProposals}
                            setRerendererBody={setBody}
            />
    )
}


export default EditCampanaSuperAdmin;

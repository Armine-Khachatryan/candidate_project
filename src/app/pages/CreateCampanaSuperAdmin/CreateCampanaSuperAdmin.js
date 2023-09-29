import React, {useState, useEffect} from "react";
import axios from "axios";
import config from "../../../config";
import EditAction from '../../assets/images/EditAction.svg';
import classes from './CreateCampanaSuperAdmin.module.css';
import CreateAvatar from '../../assets/images/CreateAvatar.svg';
import CreateSpeech from '../../assets/images/CreateSpeech.svg';
import ImageUploader from "../../components/ImageUploader/ImageUploader";
import DeleteIcon from "../../assets/images/DeleteIcon.svg";
import DragDrop from "../../assets/images/DragDrop.png";
import Input from "../../UI/Input/Input";
import SelectSearch from 'react-select-search';
import Button from "../../UI/Button/Button";
import 'react-select-search/style.css'
import AudioUploader from "../../components/AudioUploader/AudioUploader";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../../UI/Loader/Loader";
import s from "../Signup/SignUp.module.css";
import {NewInput} from "../../UI/NewInput/NewInput";


function CreateCampanaSuperAdmin(){

    const navigate = useNavigate();
    const [body, setBody] = useState(
        {
            model_3d:null,
            logo:null,
            voice:null,
            number_of_payments:null
        }
    );
    const [municipalityOptions, setMunicipalityOptions]=useState([]);
    const [inputsOfMunicipality, setInputsOfMunicipality] = useState();
    const [showAgregarBtnActive, setShowAgregarBtnActive]=useState(false)
    const [renderPaymentsData, setRenderPaymentsData]=useState(false);
    const [renderPaymentsBelowData, setRenderPaymentsBelowData]=useState(false);
    const [paymentsInfo, setPaymentsInfo] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({
        name: null,
        email: null,
        phone:null,
        campaign_id:null,
        political_party_name:null,
        contract_value:null,
        m_code:null,
        logo:null,
        model_3d:null,
        voice:null,
        number_of_payments:null
        //payments:null
    });


    useEffect(()=>{
        getSelectOptions();
    }, [])

    useEffect(()=>{
        postMunicipalityCode()
    }, [body?.m_code])

    const onSelectList = (e) => {
        setBody(prev => ({...prev, plan: e.value}))
    }

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        if (name === "number_of_payments") {
            const newNumberOfPayments = parseInt(value);
            setShowAgregarBtnActive(true);
            setRenderPaymentsData(false)
            // if (newNumberOfPayments > 0) {
                const updatedPaymentsInfo = [...paymentsInfo];
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
        // }
        setBody((prevBody) => ({ ...prevBody, [name]: value }));
        setErrors({
            ...errors,
            [name]: null
        });
        };

    const handleChangePayments = (e, index) => {
        const { name, value } = e.target;
        setPaymentsInfo((prevPaymentsInfo) => {
            const updatedPaymentsInfo = [...prevPaymentsInfo];
            if (updatedPaymentsInfo[index]) {
                if (name === "status") {
                    updatedPaymentsInfo[index][name] = +value;
                } else {
                    updatedPaymentsInfo[index][name] = value;
                }
            } else {
                updatedPaymentsInfo[index] = { [name]: name === "status" ? +value : value };
            }
            return updatedPaymentsInfo;
        });
    };


    const handleChangeSelect =(e)=>{
        setBody((prev) => ({
            ...prev,
            "m_code": e
        }));
      setErrors({
            ...errors,
            m_code: null
        });
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
            //     error.response?.data.message || "Something went wrong."
            // )
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
                setIsLoading(false)
                setInputsOfMunicipality(response.data.data)
            }
        } catch (error) {
            setIsLoading(false)
            // toast.error(
            //     error.response?.data.message || "Something went wrong."
            // )
        }
    }

    let saveCampana =(e)=>{
        const {name, email, phone, campaign_id, political_party_name, contract_value, m_code, logo,
            model_3d, voice,number_of_payments}=body
        let valid = true;
        let nameMessage =null;
        let emailMessage =null;
        let phoneMessage =null;
        let campaignIdMessage =null;
        let politicalPartyNameMessage=null;
        let contractValueMessage=null;
        let mCodeMessage=null;
        let logoMessage=null;
        let model3dMessage=null;
        let voiceMessage=null;
        let numberOfPaymentsMessage=null;
        if (!name) {
            nameMessage = "Name is required";
            valid = false
        }
        if (!email) {
            emailMessage = "Email is required";
            valid = false
        }

        if (email) {
            const emailReg =/\w+(\.|-|_)?\w+@\w+\.\w{2,3}/;
            if (!emailReg.test(email)) {
                emailMessage = "Invalid email";
                valid = false
            }
        }
        if (!phone) {
            phoneMessage = "Phone is required";
            valid = false
        }
        if (!campaign_id) {
            campaignIdMessage = "Campaign id is required";
            valid = false
        }
        if (!political_party_name) {
            politicalPartyNameMessage = "Political party name is required";
            valid = false
        }
        if (!contract_value) {
            contractValueMessage = "Contract value is required";
            valid = false
        }
        if (!m_code) {
            mCodeMessage = "Municipality code  is required";
            valid = false
        }
        if (!logo) {
            logoMessage = "Logo is required";
            valid = false
        }
        if (!model_3d) {
            model3dMessage = "Model 3d is required";
            valid = false
        }
        if (!voice) {
            voiceMessage = "Speech is required";
            valid = false
        }
        if (!number_of_payments) {
            numberOfPaymentsMessage = "Number of payments is required";
            valid = false
        }
        setErrors({
            name: nameMessage,
            email: emailMessage,
            phone : phoneMessage,
            campaign_id:campaignIdMessage,
            political_party_name:politicalPartyNameMessage,
            contract_value:contractValueMessage,
            m_code: mCodeMessage,
            logo:logoMessage,
            model_3d:model3dMessage,
            voice: voiceMessage,
            number_of_payments:numberOfPaymentsMessage
        });
        if (valid) {
            createCompanyRequest();
        }
    }


    let createCompanyRequest =async () => {
        let token= sessionStorage.getItem('token');
        let formData = new FormData();
        formData.append('name', body?.name);
        formData.append('email', body?.email);
        formData.append('phone', body?.phone);
        formData.append('campaign_id', body?.campaign_id);
        formData.append('political_party_name', body?.political_party_name);
        formData.append('contract_value', body?.contract_value);
        formData.append('m_code', body?.m_code);
        formData.append('logo', body?.logo);
        formData.append('model_3d', body?.model_3d);
        formData.append('voice', body?.voice);
        formData.append('plan', body?.plan);
        formData.append('website', body?.website);
        formData.append('number_of_payments', body?.number_of_payments);
        for(let i=0; i<body?.payments?.length; i++){
            formData.append(`payments[${i}][date]`, body?.payments[i].date)
            formData.append(`payments[${i}][sum]`, body?.payments[i].sum);
            formData.append(`payments[${i}][status]`, body?.payments[i].status);
        }
        setIsLoading(true)
        try {
            let response = await axios.post(`${config.baseUrl}api/candidate/create`, formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            navigate('/companies/created');
            setIsLoading(false)
        } catch (e) {
            setIsLoading(false);
            toast.error(
                e.response?.data.message || "Something went wrong."
            )
        }
    }



  const renderPayments = Array.from({length:body?.number_of_payments}).map((item, index)=>(
        <div className={classes.inputs} key={index}>
            <div style={{width:"50%"}}>
                <Input
                    input={{
                        maxWidth:"unset",
                        width: "100%",
                        name: `date`,
                        value: paymentsInfo[index]?.date || null,
                        // value: body?.payments[index]?.date || null,
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
                        value: paymentsInfo[index]?.sum || null,
                        placeholder: `Amount ${index + 1}`,
                        type: "number",
                        onChange: (e)=>handleChangePayments(e,index)
                    }}
                />
            </div>
        </div>
    ))

    if (isLoading) return <Loader/>;

    return(
        <div className="container">
            <div className="upPart">
                <div className="upTitle"><span className="titleSpan" onClick={()=>navigate('/companies/created')}>Campañas Creadas / </span> Crear campaña</div>
                <Button OnClick={saveCampana}>Save</Button>
            </div>
                    <div className={classes.dragDrops}>
                        <div className={`${errors.model_3d===null? classes.singleDragDrop : classes.singleDragDropRed}`}>
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
                                errorText={errors.model_3d}
                            />
                        </div>
                        <div className= {`${errors.logo===null? classes.singleDragDrop : classes.singleDragDropRed}`}>
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
                                errorText={errors.logo}
                            />
                        </div>
                        <div className= {`${errors.voice===null? classes.singleDragDrop : classes.singleDragDropRed}`}>
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
                                errorText={errors.voice}
                            />
                        </div>
                    </div>
                    <div className={classes.inputs}>
                        <Input
                            hasError={errors.name}
                            errorText={errors.name}
                            input={{
                                placeholder: "Candidate’s name*",
                                onChange:onChangeInput,
                                name: "name",
                                type: "text",
                                value: body?.name,
                            }}
                        />
                        <Input
                            hasError={errors.email}
                            errorText={errors.email}
                            input={{
                                placeholder: "Correo electrónico del candidato*",
                                onChange:onChangeInput,
                                name: "email",
                                type: "email",
                                value: body?.email,
                            }}
                        />
                        <Input
                            hasError={errors.phone}
                            errorText={errors.phone}
                            input={{
                                placeholder: "Número de teléfono del candidato*",
                                onChange:onChangeInput,
                                name: "phone",
                                type: "number",
                                value: body?.phone,
                            }}
                        />
                    </div>
                    <div className={classes.inputs}>
                        <Input
                            hasError={errors.campaign_id}
                            errorText={errors.campaign_id}
                            input={{
                                placeholder: " ID de la Campaña, ej (00001)*",
                                onChange:onChangeInput,
                                name: "campaign_id",
                                type: "text",
                                value: body?.campaign_id
                            }}
                        />
                        {errors.m_code ?
                            <div className={classes.selectSearchError}>
                                <SelectSearch
                                    placeholder="Código DANE del municipio*"
                                    options={municipalityOptions}
                                    name="m_code"
                                    value={body?.m_code}
                                    search
                                    onChange={handleChangeSelect}
                                />
                                <div className={classes.errorText}>{errors.m_code}</div>
                            </div> :
                            <SelectSearch
                                placeholder="Código DANE del municipio*"
                                options={municipalityOptions}
                                name="m_code"
                                value={body?.m_code}
                                search
                                onChange={handleChangeSelect}
                            />
                        }
                            {/*<div className="text-danger">*/}
                            {/*    {errors.mCodeMessage}*/}
                            {/*</div>*/}

                        <Input
                            input={{
                                placeholder: "Nombre del Departamento",
                                name:inputsOfMunicipality?.state,
                                type: "text",
                                value:inputsOfMunicipality?.state || "",
                            }}
                        />
                        <Input
                            input={{
                                placeholder: "Nombre del municipio",
                                name:inputsOfMunicipality?.name,
                                value:inputsOfMunicipality?.name || "",
                                type: "text",
                            }}
                        />
                    </div>
                    <div className={classes.inputs}>
                        <Input
                            input={{
                                placeholder: "Categoría del municipio",
                                onChange:onChangeInput,
                                width: "100%",
                                name:inputsOfMunicipality?.category,
                                value:inputsOfMunicipality?.category || "",
                                type: "text",
                            }}
                        />
                        <Input
                            hasError={errors.political_party_name}
                            errorText={errors.political_party_name}
                            input={{
                                width: "100%",
                                placeholder: "Nombre del Partido Político*",
                                onChange:onChangeInput,
                                name: "political_party_name",
                                type: "text",
                                value: body?.political_party_name,
                            }}
                        />
                        <Input
                            hasError={errors.contract_value}
                            errorText={errors.contract_value}
                            input={{
                                width: "100%",
                                placeholder: "Valor del contrato*",
                                onChange:onChangeInput,
                                name: "contract_value",
                                type: "number",
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
            {!renderPaymentsBelowData &&
                    <div className={classes.inputs}>
                        <div style={{width:"50%"}}>
                            <Input
                                hasError={errors.number_of_payments}
                                errorText={errors.number_of_payments}
                                input={{
                                    maxWidth:"unset",
                                    width: "100%",
                                    name: "number_of_payments",
                                    value: body?.number_of_payments || paymentsInfo?.length ,
                                    placeholder: "Numero de pagos",
                                    type: "number",
                                    onChange: onChangeInput
                                }}
                            />
                        </div>
                        <div style={{width:"50%"}}>
                            {/*<button   className={` ${body?.number_of_payments ===null*/}
                            {/*|| body?.number_of_payments === ""? classes.notActiveBtn : classes.activeBtn}`}*/}
                            <button   className={` ${!showAgregarBtnActive? classes.notActiveBtn : classes.activeBtn}`}
                            onClick={()=>{setRenderPaymentsData (!renderPaymentsData);
                                setShowAgregarBtnActive(false)
                            }}>
                                Agregar</button>
                        </div>
                    </div>
            }
            {renderPaymentsData && <>
                {renderPayments}
                <div style={{marginBottom: "50px"}}>
                    <Button width={"100%"} OnClick={()=>{setRenderPaymentsBelowData(!renderPaymentsBelowData);
                    setRenderPaymentsData(false);
                        setBody((prev) => ({
                            ...prev,
                            payments:paymentsInfo
                        }));
                    }}>Ahorrar</Button>
                </div>
            </>
               }
            {renderPaymentsBelowData &&
            <div className={classes.paymentsPart}>
                <div className={classes.paymentsApprovedWhole}>
                    <div className={classes.paymentsApprovedPart}>Numero de pagos</div>
                    <div className={classes.paymentsApprovedPart}># of Payments</div>
                    <div className={classes.paymentsApprovedPart}>Payments date</div>
                    <div className={classes.paymentsApprovedPart}>Status</div>
                    <div className={classes.paymentsApprovedPart}>Actions</div>
                </div>
                {paymentsInfo.map((item,index)=>{
                    return (
                        <div className={classes.paymentsApprovedWhole} key={index}>
                            <div className={classes.paymentsApprovedPart}>{paymentsInfo.length}</div>
                            <div className={classes.paymentsApprovedPart}>{item.sum}</div>
                            <div className={classes.paymentsApprovedPart}>{item.date}</div>
                            <select  className={classes.paymentsApprovedPart}  name="status"
                                      onChange={ (e)=>handleChangePayments(e, index)}
                                     value={item.status}
                            >
                                <option  selected disabled hidden ></option>
                                <option value={+0}>Unpaid</option>
                                <option value={+1}>Paid</option>
                            </select >
                            <div className={classes.paymentsApprovedPart}
                            onClick={()=>{setRenderPaymentsData(true);
                                            setRenderPaymentsBelowData(false)}}>
                                <img className={classes.editAction} src={EditAction} alt=""/>
                            </div>
                        </div>
                    )
                })}
            </div>}
        </div>
    )
}


export default CreateCampanaSuperAdmin;



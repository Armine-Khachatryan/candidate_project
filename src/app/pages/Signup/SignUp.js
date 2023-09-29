import React, {useCallback, useState, useEffect} from 'react';
import s from './SignUp.module.css';
import {NewButton} from "../../UI/NewButton/NewButton";
import {Checkbox} from "../../UI/Checkbox";
import NewIcon from "../../UI/NewIcon/NewIcon";
import {NewInput} from "../../UI/NewInput/NewInput";
import {onChangeBody} from "../../resources";
import {Password} from "../../components/Password/Password";
import {UploadFile} from "../../UI/UploadFile";
import {useNavigate, useLocation} from "react-router-dom";
import {GoogleReCaptchaProvider, useGoogleReCaptcha} from "react-google-recaptcha-v3";
import {toast} from "react-toastify";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {Steper} from "../../components/Steper/Steper";
import classes from "../CreateCampanaSuperAdmin/CreateCampanaSuperAdmin.module.css";
import ImageUploader from "../../components/ImageUploader/ImageUploader";
import DeleteIcon from "../../assets/images/DeleteIcon.svg";
import CreateAvatar from "../../assets/images/CreateAvatar.svg";
import DragDrop from "../../assets/images/DragDrop.png";
import AudioUploader from "../../components/AudioUploader/AudioUploader";
import CreateSpeech from "../../assets/images/CreateSpeech.svg";
import axios from "axios";
import config from "../../../config";
import SelectSearch from "react-select-search";
import Input from "../../UI/Input/Input";
import Loader from "../../UI/Loader/Loader";

export const Signup = () => {
    const routePath = useLocation();
    const [inputsOfMunicipality, setInputsOfMunicipality] = useState();
    const [municipalityOptions, setMunicipalityOptions] = useState([]);
    const [errors, setErrors] = useState({
        name: null,
        email: null,
        phone:null,
        political_party_name:null,
        m_code:null,
        logo:null,
        photo:null,
        voice:null,
        password:null,
        password_confirmation:null,
        // website:null, //not required
        plan:null,
        terms:null
    });
    const [isLoading, setIsLoading] = useState(false);
    const [body, setBody] = useState(
        {
            photo: null,
            logo: null,
            voice: null,
            terms:0,
        }
    );
    const onTop = () => {
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        onTop();
    }, [routePath]);

    useEffect(() => {
        getSelectOptions();
    }, [])

    useEffect(() => {
        postMunicipalityCode()
    }, [body?.m_code])


    // const {executeRecaptcha} = useGoogleReCaptcha();
    const navigate = useNavigate()

    const onSubmit = useCallback(async (e) => {
            const {name, email, phone,  political_party_name, m_code, logo,
                photo, voice, password, password_confirmation,
                // website,
                plan, terms}=body
            let valid = true;
            let nameMessage =null;
            let emailMessage =null;
            let phoneMessage =null;
            let politicalPartyNameMessage=null;
            let mCodeMessage=null;
            let logoMessage=null;
            let photoMessage=null;
            let voiceMessage=null;
            let passwordMessage=null;
            let passwordConfirmationMessage=null;
            // let websiteMessage=null;
            let planMessage=null;
            let termsMessage=null;
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
            if (!political_party_name) {
                politicalPartyNameMessage = "Political party name is required";
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
            if (!photo) {
                photoMessage = "A photo for model 3d is required";
                valid = false
            }
            if (!voice) {
                voiceMessage = "Speech is required";
                valid = false
            }
            // if(!website){
            //     websiteMessage = "Website is required"; ///check
            //     valid = false
            // }
            if(!plan){
                planMessage = "Plan is required";
                valid = false
            }
           if(!terms){
                termsMessage = "Please select terms!";
                valid = false
            }


        setErrors({
                name: nameMessage,
                email: emailMessage,
                phone : phoneMessage,
                political_party_name:politicalPartyNameMessage,
                m_code: mCodeMessage,
                logo:logoMessage,
                photo:photoMessage,
                voice: voiceMessage,
                // website:websiteMessage,
                plan:planMessage,
                terms:termsMessage
            });
            if (valid) {
                const formData = new FormData()
                body.phone = +body.phone

                Object.entries(body).forEach(([key,value])=>{
                    formData.append(key,value)
                })
                setIsLoading(true)
                try {
                    let response = await axios.post(`${config.baseUrl}api/register-candidate`, formData, {
                    })
                    if (response.data.message === "Request sent successfully") {
                        setIsLoading(false);
                        navigate('/email-confirmation');
                        setIsLoading(false)
                    }
                } catch (error) {
                    setIsLoading(false);
                    toast.error(
                        error.response?.data.message || "Something went wrong."
                    )
                }
            }
        },
        [body]
    );



    const onChangeInput = (e) => {
        const {name, value} = e.target;
        // if (name === "number_of_payments") {
        //     const newNumberOfPayments = parseInt(value);
        //     // if (newNumberOfPayments > 0) {
        //     const updatedPaymentsInfo = [...paymentsInfo];
        //     if (newNumberOfPayments > updatedPaymentsInfo.length) {
        //         const diff = newNumberOfPayments - updatedPaymentsInfo.length;
        //         for (let i = 0; i < diff; i++) {
        //             updatedPaymentsInfo.push({ date: null, sum: null, status: 0 });
        //         }
        //     } else if (newNumberOfPayments < updatedPaymentsInfo.length) {
        //         updatedPaymentsInfo.splice(newNumberOfPayments);
        //     }
        //     setPaymentsInfo(updatedPaymentsInfo);
        // }
        setBody((prevBody) => ({...prevBody, [name]: value}));
        setErrors({
            ...errors,
            [name]: null
        });
    };

    const onSelectList = (e) => {
        setBody(prev => ({...prev, plan: e.value}))
        setErrors({
            ...errors,
            plan: null
        });
    }

    const handleChangeSelect = (e) => {
        setBody((prev) => ({
            ...prev,
            "m_code": e
        }));
        setErrors({
            ...errors,
            m_code: null
        });
    }

    let getSelectOptions = async () => {
        // let token= sessionStorage.getItem('token');
        setIsLoading(true)
        try {
            let response = await axios.get(`${config.baseUrl}api/all-municipalities`
                //     ,{
                //     headers:{
                //         "Authorization": `Bearer ${token}`
                //     }
                // }
            );
            setIsLoading(false);
            setMunicipalityOptions(response.data.data);
        } catch (error) {
            setIsLoading(false);
            // toast.error(
            //     error.response?.data.message || "Something went wrong."
            // )
        }
    }


    let postMunicipalityCode = async () => {
        let token = sessionStorage.getItem('token');
        let formData = new FormData();
        formData.append('m_code', body?.m_code);
        setIsLoading(true)
        try {
            let response = await axios.post(`${config.baseUrl}api/municipality-by-code`, formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            if (response.data.message === "success") {
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

    if (isLoading) return <Loader/>;

    return (
        <div className="whole">
            <div>
                <Header/>
                <div className={s.container}>
                    <Steper/>
                    {/*<div style={{padding:'40px 80px'}}>*/}
                    <div className={`${s.title}`}>Datos de Contacto</div>
                    <div className={s.body}>
                        <NewInput placeholder={'Nombres y apellidos del Candidato'}
                                  name={'name'}
                                  onFinish={onChangeInput}
                                  value={body?.name}
                                  errorMassage={errors.name}
                                  hasError={errors.name}
                        />
                        <NewInput placeholder={'Número de teléfono de Contacto'}
                                  name={'phone'}
                                  onFinish={onChangeInput}
                                  value={body?.phone}
                                  errorMassage={errors.phone}
                                  hasError={errors.phone}
                        />
                        <NewInput placeholder={'Correo electrónico de Contacto'}
                                  name={'email'}
                                  onFinish={onChangeInput}
                                  value={body?.email}
                                  errorMassage={errors.email}
                                  hasError={errors.email}
                        />
                        <NewInput placeholder={'Nombre del Partido o movimiento político del Candidato'}
                                  name={'political_party_name'}
                                  onFinish={onChangeInput}
                                  value={body?.political_party_name}
                                  errorMassage={errors.political_party_name}
                                  hasError={errors.political_party_name}
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
                        <Input input={{
                            placeholder: "Nombre del Departamento",
                            name: inputsOfMunicipality?.state,
                            type: "text",
                            value: inputsOfMunicipality?.state || "",
                            onChange: onChangeInput
                        }}
                        />
                        <Input input={{
                            placeholder: "Nombre del municipio",
                            name: inputsOfMunicipality?.name,
                            value: inputsOfMunicipality?.name || "",
                            type: "text",
                        }}
                        />
                        <Input input={{
                            placeholder: "Categoría del municipio",
                            onChange: onChangeInput,
                            width: "100%",
                            name: inputsOfMunicipality?.category,
                            value: inputsOfMunicipality?.category || "",
                            type: "text",
                        }}
                        />
                        {/*<NewInput placeholder={'Categoría del municipio'}/>*/}
                        {/*<NewInput placeholder={'Nombre del municipio'}/>*/}
                        {/*<NewInput placeholder={'Category of municipality'}/>*/}
                    </div>

                    <Password onChange={onChangeInput}
                              password={body['password']}
                              confirmPassword={body['password_confirmation']}
                    />

                    <div className={`f20-500 ${s.title}`}>Insumos para prepar tu escena de Realidad Aumentada</div>
                    <div className={s.dragDropsDiv}>
                        {/*<div className={`${errors.photo===null? classes.singleDragDrop : classes.singleDragDropRed}`}>*/}
                        {/*<div className={classes.singleDragDrop}>*/}
                            <div className={`${errors.photo===null? classes.singleDragDrop : classes.singleDragDropRed}`}>
                            <ImageUploader deleteIcon={DeleteIcon}
                                           image={CreateAvatar}
                                           textDragDrop="Arrastre la foto del candidato con la ropa representativa de la campaña o "
                                           spanText="Buscarlo"
                                           width={'100%'}
                                           height={'200px'}
                                           imgWidth={'332px'}
                                           imgHeight={'130px'}
                                // max="Max 2kb"
                                // maxSize={2097152}
                                           name={'photo'}
                                           selectedImg={body?.photo}
                                           OnUpdateImage={onChangeInput}
                                            errorText={errors.photo}
                            />
                        </div>
                        {/*<div className= {`${errors.logo===null? classes.singleDragDrop : classes.singleDragDropRed}`}>*/}
                        <div className={`${errors.logo===null? classes.singleDragDrop : classes.singleDragDropRed}`}>
                            <ImageUploader deleteIcon={DeleteIcon}
                                           image={DragDrop}
                                           textDragDrop="Arrastre el logo del candidato o  "
                                           spanText="Buscarlo"
                                           width={'100%'}
                                           height={'200px'}
                                           imgWidth={'332px'}
                                           imgHeight={'130px'}
                                // max="Max 2kb"
                                // maxSize={2097152}
                                           name={'logo'}
                                           selectedImg={body?.logo}
                                           OnUpdateImage={onChangeInput}
                                           errorText={errors.logo}
                            />
                        </div>
                        {/*<div className= {`${errors.voice===null? classes.singleDragDrop : classes.singleDragDropRed}`}>*/}
                        <div className={`${errors.voice===null? classes.singleDragDrop : classes.singleDragDropRed}`}>
                            <AudioUploader
                                deleteIcon={DeleteIcon}
                                image={CreateSpeech}
                                textDragDrop=" Arrastre el audio de la propuesta o  "
                                spanText="Buscarlo"
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
                    <div className={`${s.title}`}>Link del sitio oficial del candidato</div>
                    <div className={s.body}>
                        <NewInput placeholder={'Link del sitio oficial del candidato'} name={'website'} onChange={onChangeInput} value={body?.website}/>
                    </div>

                    <div className={`${s.title}`}>Selecciona el plan de tu interés, nuestro equipo de ventas se
                        pondrá
                        en contacto contigo
                    </div>
                    <div className={`${!errors.plan? s.block: s.invalid}`}>
                        <div className={`${s.list} ${body?.plan === 'full' ? s.selected_plan : null}`}
                             onClick={() => onSelectList({value: 'full'})}>Full Campaña ($10.499.999/mes) paga los 3
                            meses de
                            campaña y ahorra 25%
                        </div>
                        <div className={`${s.list} ${body?.plan === 'half' ? s.selected_plan : null}`}
                             onClick={() => onSelectList({value: 'half'})}>Media Campaña ($12.599.999/mes) paga 2 meses
                            y ahorra
                            10%
                        </div>
                        <div className={`${s.list} ${body?.plan === 'small' ? s.selected_plan : null}`}
                             onClick={() => onSelectList({value: 'small'})}>Small Campaña ($13.999.999/mes) paga 1 mes
                        </div>
                        <div className={`${s.list} ${body?.plan === 'free' ? s.selected_plan : null}`}
                             onClick={() => onSelectList({value: 'free'})}
                        >
                            Versión Gratuita / 15 días de prueba por una única vez
                        </div>
                        <div className={`${s.card} ${s.green_block}`}>
                            <div className={s.mark}>
                                <NewIcon type={'ExclamationMark'} size={56}/>
                            </div>
                            <div className={``}>¡Excelentes noticias para ti! <b>Todos</b> nuestros planes te
                                ofrecen <b>15 días
                                    de prueba
                                    gratuita</b>, pero si optas por nuestros planes Full, Media y Small, garantizarás
                                todos los <b>beneficios
                                    Premium</b>. No pierdas más tiempo y asegura tu cupo en tu municipio. ¡No dejes
                                pasar esta
                                oportunidad, separa el tuyo ahora mismo!
                            </div>
                        </div>
                        <div className={s.errorTextPlan}>{errors.plan}</div>
                    </div>

                    <div className={`${s.title}`}>
                        Selecciona el plan de tu interés, nuestro equipo de ventas se pondrá en contacto contigo
                    </div>

                    <div className={`${s.card} ${s.brown_block}`}>
                        <div className={s.mark}>
                            <NewIcon type={'ExclamationMark'} size={56}/>
                        </div>
                        <div className={`${s.brown_header}`}>
                            La versión gratuita por 15 días es por <b>una única vez,</b> pero ten en cuenta que:
                        </div>
                        <ul>
                            <li>
                                Si eliges la <b>versión gratuita</b> de nuestra plataforma y si otro candidato de tu
                                municipio
                                decide
                                adquirir una versión Premium (para el mismo cargo de elección popular), tu cuenta <b>se
                                deshabilitará automáticamente.</b>
                            </li>
                            <li>
                                La <b>construcción y animación del Avatar</b> pueden requerir <b>hasta 5 días</b>,
                                dependiendo
                                de la demanda
                                que tengamos en ese momento, por lo que te recomendamos que <b>no pierdas tiempo</b> e
                                inicies
                                con un
                                plan premium.
                            </li>
                        </ul>
                    </div>

                    <div className={`${!errors.terms? s.privacy_policy_container: s.invalid}`}>
                        <Checkbox
                            label={'Estoy de acuerdo con los Términos y Condiciones y confirmo que he leído la Política de privacidad.'}
                            className={s.checkbox}
                            name={'terms'}
                            checked={body?.terms}
                            onChange={(e)=>{
                              setBody(p=>({...p,[e.target.name]: +e.target.checked}))
                                setErrors({
                                ...errors,
                                    [e.target.name]: null
                            });
                            }}
                        />
                        <div className={classes.errorText}>{errors.terms}</div>
                    </div>
                    <div className={s.text}>
                        Por favor marque la casilla para continuar
                    </div>
                    <div id={'recaptch-v3'}/>
                    <NewButton label={'Siguiente'}
                               variant={'primary'}
                               className={s.submit_btn}
                               onClick={onSubmit}
                               style={{maxWidth: "296px"}}
                    />
                </div>
            </div>
            <Footer/>
        </div>
    )
}

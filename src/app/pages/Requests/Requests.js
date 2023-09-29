import {useCallback, useEffect, useRef, useState} from 'react'
import classes from './requests.module.css'
import Footer from "../../components/Footer/Footer";
import HeaderSuperAdmin from "../../components/HeaderSuperAdmin/HeaderSuperAdmin";
import axios from "axios";
import config from "../../../config";
import MinLoader from "../../UI/MinLoader/MinLoader";
import Loader from "../../UI/Loader/Loader";
import ImageViewModal from "../../components/ImageViewModal/ImageViewModal";
import {useNavigate} from "react-router-dom";

const Requests = () => {


    const [imageViewModalIsOpen, setImageViewModalIsOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState({label: 'All', key: 'pending'});
    const [dropdown, setDropDown] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [modalData, setModalData] =useState(null);
    const a = useRef(null);
    const navigate=useNavigate()

    const tabs = [
        {label: 'All', key: 'pending'},
        {label: 'Accepted', key: 'accepted'},
        {label: 'Declined', key: 'declined'},
    ]

    useEffect(() => {
        if (a.current?.key !== selectedTab?.key) {
            let token = sessionStorage.getItem('token');
            setIsLoading(true)
            axios.get(`${config.baseUrl}api/requests/${selectedTab.key}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(r => {
                    setData(r.data.data)
                })
                .catch(e => {
                    console.log(e)
                })
                .then(() => {
                    setIsLoading(false)
                })
        }
        a.current = selectedTab;
    }, [selectedTab])

    function openImageViewModal(newId) {
        setImageViewModalIsOpen(true);
        const item = data.find((item)=>item.id===newId);
        setModalData(item)
    }


    function closeImageViewModal(){
        setImageViewModalIsOpen(false);
    }

    const onClickTab = useCallback((item) => {
        setSelectedTab(item)
    }, []);

    const onClickTableBtn = (key = 'pending', itemId) => {
        let token = sessionStorage.getItem('token');
        axios( {
            url:`${config.baseUrl}api/requests/${key}/${itemId}`,
            method:'post',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(r => {
                const dataCopy=[...data];
                let newDataCopy = dataCopy.filter((item)=>{
                    if (item.id !== itemId) {
                        return item
                    }
                })
                setData(newDataCopy)
                if(key === 'accept' && r.data.message ==="success"){
                    navigate('/companies/edit', {state: r.data.data.id})
                }
            })
            .catch(e => {
                console.log(e)
            })
    }


    return (
        <div className="whole">
            <div>
                <HeaderSuperAdmin/>
                <div className="container">
                    <div className={classes.top}>
                        <div className="upTitle">
                            Requests
                        </div>
                    </div>
                    <div className={classes.tab_container}>
                        {tabs.map(t => {
                            return (
                                <div key={t.key}
                                     className={[classes.tab, selectedTab.key === t.key ? classes.selectedTab : ''].join(' ')}
                                     onClick={() => onClickTab(t)}
                                >
                                    {t.label}
                                </div>
                            )
                        })}
                    </div>
                    <div className={classes.table}>
                        <div className={`${classes.tr} ${classes.thead}`}>
                            <div className={classes.td}>Foto</div>
                            <div className={classes.td}>Nombres y apellidos</div>
                            <div className={classes.td}>Correo electrónico</div>
                            <div className={classes.td}>Nombre del Partido o movimiento político</div>
                            {selectedTab.label === "All" ? <div className={classes.td}>Actions</div> :
                                <div className={classes.td}>Status</div>}
                        </div>
                        {
                            isLoading ?
                                <Loader/> :
                                data?.map(item => {
                                    return (
                                        <div className={classes.tbody} key={item.id}>
                                            <div className={`${classes.tr}`}>
                                                <div className={classes.td} onClick={()=>openImageViewModal(item.id)}>
                                                    <img src={item.photo} alt=""/>
                                                </div>
                                                <div className={classes.td}>{item.name}</div>
                                                <div className={classes.td}>{item.email}</div>
                                                <div className={classes.td}>{item.political_party_name}</div>
                                                <div className={classes.td}>
                                                    <div className={classes.table_action_btns}>
                                                        {selectedTab.label === "All" ?
                                                            <div className={classes.table_decline_btn}
                                                                 onClick={() => onClickTableBtn('decline', item.id)}
                                                            >
                                                                Decline
                                                            </div> : selectedTab.label === "Declined" ?
                                                                <div className={classes.declinedButtonStatus}>
                                                                Declined</div>:""
                                                        }
                                                        {selectedTab.label === "All" ?
                                                            <div className={classes.table_accept_btn}
                                                                 onClick={() => onClickTableBtn('accept', item.id)}
                                                            >
                                                                Accept
                                                            </div> : selectedTab.label === "Accepted" ?
                                                                <div className={classes.acceptedButtonStatus}>
                                                                    Accepted</div> : ""
                                                        }
                                                        <div className={classes.table_less_info_btn}
                                                             onClick={() => {
                                                                 setDropDown(p => p === item.id ? undefined : item.id)
                                                             }}
                                                        >
                                                            {dropdown === item.id ? 'Less info' : 'More info'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={` ${classes.tr_drop_down}`}
                                                 style={{
                                                     display: dropdown === item.id ? 'flex' : 'none'
                                                 }}
                                            >
                                                <div style={{width:"100%"}}>
                                                    <div style={{display: "flex", justifyContent:"space-between", width:"100%"}}>
                                                        <div className={classes.td} style={{ width:"30%"}}>
                                                            <div className={`${classes.td}`}>
                                                                <div className={classes.header}>Plan de tu interés:</div>
                                                                <div>{item.plan}</div>
                                                            </div>
                                                        </div>
                                                        <div className={classes.td} style={{ width:"30%"}}>
                                                            <div>
                                                                <div className={classes.header}>Número de teléfono de Contacto:
                                                                </div>
                                                                <div>{item.phone}</div>
                                                                {/*<div>Número de teléfono de Contacto:</div>*/}
                                                            </div>
                                                        </div>
                                                        <div className={classes.td} style={{ width:"30%"}}>
                                                            <div>
                                                                <div className={classes.header}>
                                                                    Link del sitio oficial del candidato:
                                                                </div>
                                                                <div>{item.website}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div style={{display: "flex", justifyContent:"space-between", width:"100%"}}>
                                                        <div className={classes.td} style={{ width:"30%"}}>
                                                            <div className={`${classes.td}`}>
                                                                <div className={classes.header}>Código DANE del municipio:</div>
                                                                <div>{item.m_code}</div>
                                                            </div>
                                                        </div>
                                                        <div className={classes.td} style={{ width:"30%"}}>
                                                            <div className={`${classes.td}`}>
                                                                <div className={classes.header}>Nombre del Departamento:</div>
                                                                <div>{item.m_state}</div>
                                                            </div>
                                                        </div>
                                                        <div className={classes.td} style={{ width:"30%"}}>
                                                            <div className={`${classes.td}`}>
                                                                <div className={classes.header}>Nombre del municipio:</div>
                                                                <div>{item.m_name}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                        }
                    </div>
                </div>
                <ImageViewModal modalData={modalData}
                    imageViewModalIsOpen={imageViewModalIsOpen} closeImageViewModal={closeImageViewModal}/>
            </div>
            <Footer/>
        </div>
    )
}

export default Requests;
import React, {useEffect, useState} from "react";
import Frame1 from '../../assets/images/Frame1.png';
import classes from './CompaniesCreatedSuperAdmin.module.css';
import EditBrown from "../../assets/images/EditBrown.svg";
import Button from "../../UI/Button/Button";
import Plus from "../../assets/images/Plus.svg";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import config from "../../../config";
import Loader from "../../UI/Loader/Loader";
import {toast} from "react-toastify";


function CompaniesCreatedSuperAdmin() {

    const navigate = useNavigate();
    const [allCandidatesData, setAllCandidatesData] = useState([]);
    const [candidatesByCode, setCandidatesByCode] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [active, setActive] = useState();
    const cityRefs = React.useRef([]);
    // const parentCityRefs = React.useRef([]);
    // const [clickedElement, setClickedElement] = useState(null);

    // useEffect(() => {
    //     console.log("1",clickedElement)
    //     console.log(parentCityRefs,"4");
    //     if (clickedElement!=null) {
    //         // const scrollPosition = parentCityRefs.current.scrollTop;
    //         //         console.log("zzz",scrollPosition);
    //                 debugger
    //
    //                 let asd = document.getElementById("parentCity")
    //                 // let scrollPosition = asd.scrollTop();
    //         // asd.scroll(0, 1000)
    //     }
    // }, [clickedElement]);
    //
    // const handleCityClick = () => {
    //     // Set the clicked element and trigger scrolling
    //     setClickedElement("city");
    // };

    useEffect(() => {
        getAllCandidates();
        // goToPosition()
        // getScrollPosition();
        // active.focus();
    }, []);

    useEffect(() => {
        goToPosition()
    }, [candidatesByCode]);

    let goToPosition =(a)=> {
        // console.log(a, 111)
        a?.scrollIntoView({
                behavior: "smooth",
            inline: "center",
                block: "nearest",
                alignToTop: false
            });
    }



    // Function to get the scroll position of the cityRef
    // const getScrollPosition = () => {
    //     if (parentCityRefs.current) {
    //         const scrollPosition = parentCityRefs.current.scrollTop;
    //         console.log(scrollPosition);
    //         debugger
    //         // parentCityRefs.current.scrollTo(0, scrollPosition);
    //     }
    // };


    // useEffect(() => {
    //     if (active) {
    //         const targetElement = document.querySelector(active);
    //         console.log(54654654);
    //         if (targetElement) {
    //             targetElement.scrollIntoView({ behavior: "smooth" });
    //         }
    //     }
    // }, [singleCandidateData]);


    let getAllCandidates = async () => {
        let token = sessionStorage.getItem('token');
        setIsLoading(true);
        try {
            let response = await axios.get(`${config.baseUrl}api/candidate/all`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            setIsLoading(false);
            setAllCandidatesData(response?.data?.data);
            setActive(response?.data?.data[0]?.name);
        } catch (error) {
            setIsLoading(false);
            toast.error(
                error.response?.data.message || "Something went wrong"
            )
        }
    }

    let getSingleCandidate = async (code) => {
        let token = sessionStorage.getItem('token');
        setIsLoading(true);
        try {
            let response = await axios.get(`${config.baseUrl}api/candidates-by-code/${code}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            setIsLoading(false);
            setCandidatesByCode(response.data?.data)
        } catch (error) {
            setIsLoading(false);
            toast.error(
                error.response?.data.message || "Something went wrong"
            )
        }
    }

    const renderCities = allCandidatesData?.map((item, index) => (
        <div
            ref={el => cityRefs.current[index] = el}
            // ref={cityRefs.current[index]}
            className={`${active === item?.name ? classes.cityDivActive : classes.cityDiv}`}
            onClick={(e) => {
                setActive(item?.name);
                getSingleCandidate(item?.code);
                const audioElement = document.getElementById("backgroundMusic");
                audioElement.load();
                e.stopPropagation();
                e.preventDefault();
                goToPosition(cityRefs?.current[index])
                // cityRefs.current[index].scrollIntoView({
                //     behavior: "smooth",
                //     block: "end",
                //     alignToTop: false
                // });

                // getScrollPosition()
                // handleCityClick()
            }}
            key={index}
        >
            {item.name}
        </div>

        // <div
        //     ref={el => cityRefs.current[index] = el} // Store reference to each city div
        //     className={`${active === item.name ? classes.cityDivActive : classes.cityDiv}`}
        //     onClick={() => {
        //         setActive(item?.name);
        //         getSingleCandidate(item?.code);
        //         const audioElement = document.getElementById("backgroundMusic");
        //         audioElement.load();
        //     }}
        //     key={index}
        // >
        //     {item.name}
        // </div>
    ));


    // const renderCities = allCandidatesData?.map((item, index) => (
    //         <div
    //             className={`${active === item.name ? classes.cityDivActive : classes.cityDiv}`}
    //             // id={item[0]?.candidate?.id}
    //             onClick={() => {
    //                 setActive(item?.name);
    //                 getSingleCandidate(item?.code);
    //                 const audioElement = document.getElementById("backgroundMusic");
    //                 audioElement.load();
    //                 // audioElement.play();
    //             }} key={index}>{item.name}</div>
    //
    // ));


    if (isLoading) return <Loader/>;

    return (
                <div className="container">
                    <div className="upPart">
                        <div className="upTitle">Campañas Creadas</div>
                        <Button OnClick={() => navigate('/companies/create')}>
                            Crear campaña
                            <img className="plusIcon" src={Plus} alt=""/>
                        </Button>
                    </div>
                    <div className={classes.listedContainer}>
                        <div className={classes.listedNumber}>{allCandidatesData?.length}</div>
                        <div className={classes.listedText}>Number of cities listed</div>
                    </div>
                    <div className={classes.belowDivCampaign}>
                        <div
                            // ref={parentCityRefs}
                            className={classes.citiesWhole} id="parentCity">
                            {renderCities}
                        </div>
                        {candidatesByCode ?
                            <div className={classes.candidates}>
                                {candidatesByCode?.map((item, index) => (
                                    <div className={classes.politicalContainer} key={index}>
                                        <div className={classes.politicalInside}>
                                            <div className={classes.politicalInsideDiv}>
                                                <div>
                                                    {item?.model_3d &&
                                                        <div className={classes.nameSurname} style={{color: "green"}}>3d
                                                            upladed</div>}
                                                    <div className={classes.imagesDiv}>
                                                        {/*<model-viewer*/}
                                                        {/*    className="frameStyle"*/}
                                                        {/*    src={singleCandidateData?.model_3d}*/}
                                                        {/*    alt="A rock"*/}
                                                        {/*    exposure="0.008"*/}
                                                        {/*    camera-controls*/}
                                                        {/*    ar*/}
                                                        {/*    ar-modes="webxr"*/}
                                                        {/*    ref={(ref) => {*/}
                                                        {/*        modelRef.current = ref;*/}
                                                        {/*    }}*/}
                                                        {/*>*/}
                                                        {/*</model-viewer>*/}
                                                        <div className={classes.frameStyle}>
                                                            <img className={classes.frameStyle} src={Frame1} alt=""/>
                                                        </div>
                                                        <div className={classes.frameStyle}>
                                                            <img src={item?.logo} alt=""/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className={classes.polName}>{item?.political_party_name}</div>
                                                    <div className={classes.nameSurname}>{item?.name}</div>
                                                    <div className={classes.email}>{item?.email}</div>
                                                    <div className={classes.phoneNumber}>{item?.phone}</div>
                                                    <audio controls className={classes.audioStyling}
                                                           id="backgroundMusic"
                                                    >
                                                        <source src={item?.voice}/>
                                                    </audio>
                                                </div>
                                            </div>
                                            <div className={classes.editDiv}
                                                 onClick={() => navigate('/companies/edit', {state: item?.id})}
                                            ><img src={EditBrown} alt=""/></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            :
                            <div className={classes.candidates}>
                                {allCandidatesData[0]?.candidates?.map((item, index) => (
                                    <div className={classes.politicalContainer} key={index}>
                                        <div className={classes.politicalInside}>
                                            <div className={classes.politicalInsideDiv}>
                                                <div>
                                                    {item?.model_3d &&
                                                        <div className={classes.nameSurname}
                                                             style={{color: "green"}}
                                                        >
                                                            3d upladed
                                                        </div>}
                                                    <div className={classes.imagesDiv}>
                                                        <div className={classes.frameStyle}>
                                                            <img className={classes.frameStyle}
                                                                 src={Frame1} alt=""/>
                                                            {/*src={item?.model_3d || Frame1} alt=""/>*/}
                                                        </div>
                                                        <div className={classes.frameStyle}>
                                                            <img src={item?.logo} alt=""/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className={classes.polName}>{item?.political_party_name}</div>
                                                    <div className={classes.nameSurname}>{item?.name}</div>
                                                    <div className={classes.email}>{item?.email}</div>
                                                    <div className={classes.phoneNumber}>{item?.phone}</div>
                                                    <audio controls className={classes.audioStyling}
                                                           id="backgroundMusic"
                                                    >
                                                        <source src={item?.voice}/>
                                                    </audio>
                                                </div>
                                            </div>
                                            <div className={classes.editDiv}
                                                 onClick={() => navigate('/companies/edit', {state: item?.id})}
                                            ><img src={EditBrown} alt=""/></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
                    {/*    </>*/}
                    {/*    :*/}
                    {/*    <div className={classes.noCompanies}> No companies</div>*/}
                    {/*}*/}
                </div>

    )
}


export default CompaniesCreatedSuperAdmin;
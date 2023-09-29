import React, {useEffect, useState, useRef} from "react";
import HeaderAdmin from "../../components/HeaderAdmin/HeaderAdmin";
import Footer from "../../components/Footer/Footer";
import Gold_eye from "../../assets/images/Gold_eye.svg";
import Gold_like from "../../assets/images/Gold_like.svg";
import Gold_dislike from "../../assets/images/Gold_dislike.svg";
import Gold_share from "../../assets/images/Gold_share.svg";
import BrownEye from '../../assets/images/BrownEye.svg';
import BlackEye from '../../assets/images/BlackEye.svg';
import BlackWatchEye from '../../assets/images/BlackWatchEye.svg';
import BrownWatchEye from '../../assets/images/BrownWatchEye.svg';
import BlackWatchMan from '../../assets/images/BlackWatchMan.svg';
import BrownWatchMan from '../../assets/images/BrownWatchMan.svg';
import BlackPerson from '../../assets/images/BlackPerson.svg';
import BrownPerson from '../../assets/images/BrownPerson.svg';
import BlackHeart from '../../assets/images/BlackHeart.svg';
import BrownHeart from '../../assets/images/BrownHeart.svg';
import BlackUnlike from '../../assets/images/BlackUnlike.svg';
import BrownUnlike from '../../assets/images/BrownUnlike.svg';
import BlackShare from '../../assets/images/BlackShare.svg';
import BrownShare from '../../assets/images/BrownShare.svg';
import BlackEngagement from '../../assets/images/Blackengagement.svg';
import BrownEngagement from '../../assets/images/Brownengagement.svg';
import BlackDollar from '../../assets/images/BlackDollar.svg';
import BrownDollar from '../../assets/images/BrownDollar.svg';
import BlackDollarPerson from '../../assets/images/BlackDollarPerson.svg';
import BrownDollarPerson from '../../assets/images/BrownDollarPerson.svg';
import BlackMessage from '../../assets/images/BlackMessage.svg';
import BrownMessage from '../../assets/images/BrownMessage.svg';
import BlackViews from '../../assets/images/BlackViews.svg';
import BrownViews from '../../assets/images/BlackViews.svg';
import classes from './Indicators.module.css';
import Progress_bar from "../../components/Progress_bar/Progress_bar";
import {Swiper, SwiperSlide} from "swiper/react";
import {Keyboard, Navigation, Pagination} from "swiper";
import LineChart from "../../components/LineChart/LineChart";
import PieChart from "../../components/PieChart/PieChart";
import BarChart from "../../components/BarChart/BarChart";
import moment from 'moment';
import axios from "axios";
import config from "../../../config";
import {toast} from "react-toastify";
import Loader from "../../UI/Loader/Loader";
import IndicatorsByIndustries from "../../components/IndicatorsByIndustries/IndicatorsByIndustries";
import RangeCalendarIntro from "../../components/CalendarIntro/CalendarIntro";



function Indicators() {

    const titleRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [activeIndustryId, setActiveIndustryId]=useState();
    const [activeTypeIntro, setActiveTypeIntro]=useState("visits");
    const [activeTypeIndustry, setActiveTypeIndustry]=useState("visits");
    const [activeSlide, setActiveSlide]=useState(0);
    const [hoverSlide, setHoverSlide] = useState(null);
    const [activeSlideIndustry, setActiveSlideIndustry]=useState(0);
    const [hoverSlideIndustry, setHoverSlideIndustry] = useState(null);
    const [lineChartData, setLineChartData]=useState({});
    const [lineChartDataIndustry, setLineChartDataIndustry]=useState({});
    const [pieChartDataGender, setPieChartDataGender] =useState({});
    const [pieChartDataGenderIndustry, setPieChartDataGenderIndustry] =useState({});
    const [barChartDataIntro, setBarChartDataIntro] =useState({});
    const [barChartDataIndustry, setBarChartDataIndustry] =useState({});
    const [proposalDataIntro, setProposalDataIntro]=useState([]);
    const [proposalDataIndustry, setProposalDataIndustry]=useState([]);
    const [industriesOfCandidate, setIndustriesOfCandidate]=useState([]);
    const [dateRangeIntro, setDateRangeIntro] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    const [calendarDataIndustry, setCalendarDataIndustry]= useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    const [indicatorIcons, setIndicatorIcons]=useState([
        {
            image:BlackEye,
            brownImage:BrownEye,
            title:"Vistas",
            indicatorKey:"visits",
            subtitle: "100.000",
            details: "Número de veces que un dispositivo entra a la app (No importa si fue el mismo dispositivo)"
        },
        {
            image:BlackPerson,
            brownImage:BrownPerson,
            title:"Usuarios",
            indicatorKey:"visitsByIp",
            subtitle: "40.000",
            details: "Número de veces que un dispositivo entra a la app (Una vez por dispositivo)"
        },
        {
            image:BlackHeart,
            brownImage:BrownHeart,
            title:"Me gusta",
            indicatorKey:"likes",
            subtitle:"35000",
            details: "Número de clicks en el botón “Me gusta” (Una vez por dispositivo)"
        },
        {
            image:BlackUnlike,
            brownImage:BrownUnlike,
            title:"No Me gusta",
            indicatorKey:"unlikes",
            subtitle:"5.000",
            details: "Número de clicks en el botón “No me gusta” (Una vez por dispositivo)"
        },
        {
            image:BlackMessage,
            brownImage:BrownMessage,
            title:"Comentarios",
            indicatorKey:"proposes",
            subtitle:"5.000",
            details: "Número de clicks en el botón “Comentarios”"
        },
        {
            image:BlackShare,
            brownImage:BrownShare,
            title:"Compartido",
            indicatorKey:"shares",
            subtitle:"5000",
            details: "Número de veces que el link de la app fue compartido."
        },
        {
            image:BlackEngagement,
            brownImage:BrownEngagement,
            title:"Tasa de Interaccion",
            indicatorKey:"interaction",
            subtitle:"5.000",
            details: "La tasa de interacción mide el nivel de usuarios que interactuaron con el contenido de la app."
        },
        {
            image:BlackWatchEye,
            brownImage: BrownWatchEye,
            title:"Tiempo promedio de vista por sesión",
            indicatorKey:"average_view_time_per_session",
            subtitle:"0:06:25",
            details:"Tiempo promedio que se vió cada sesión por vista."
        },
        {
            image:BlackWatchMan,
            brownImage:BrownWatchMan,
            title:"Tiempo promedio de usuarios por sesión",
            indicatorKey:"average_user_time_per_session",
            subtitle:"2.00",
            details: "Tiempo promedio que se vió cada sesión por usuario."
        },
        {
            image:BlackViews,
            brownImage: BrownViews,
            title:"Tasa de Abandono",
            indicatorKey:"pending_variables",
            subtitle:"5.000",
            details:"Número de vistas que no interactuaron con ningún botón, o duraron menos de 30 segundos en la app"
        },
        {
            image:BlackDollar,
            brownImage: BrownDollar,
            title:"Costo por interacción",
            indicatorKey:"avg_cost_of_each_user_by_interaction",
            subtitle:"2000",
            details: "Descripción: costo promedio de cada interacción de usuario con la app."
        },
        {
            image:BlackDollarPerson,
            brownImage:BrownDollarPerson,
            title:"Costo por usuario",
            indicatorKey:"avg_cost_of_each_user",
            subtitle:"5000",
            details:"Descripción: costo promedio de cada usuario por la app."
        }
    ])


    const [indicatorIconsIndustry, setIndicatorIconsIndustry]=useState([
        {
            image:BlackEye,
            brownImage:BrownEye,
            title:"Vistas",
            indicatorKey:"visits",
            subtitle: "100.000",
            details: "Número de veces que un dispositivo entra a la app (No importa si fue el mismo dispositivo)"
        },
        {
            image:BlackPerson,
            brownImage:BrownPerson,
            title:"Usuarios",
            indicatorKey:"visitsByIp",
            subtitle: "40.000",
            details: "Número de veces que un dispositivo entra a la app (Una vez por dispositivo)"
        },
        {
            image:BlackHeart,
            brownImage:BrownHeart,
            title:"Me gusta",
            indicatorKey:"likes",
            subtitle:"35000",
            details: "Número de clicks en el botón “Me gusta” (Una vez por dispositivo)"
        },
        {
            image:BlackUnlike,
            brownImage:BrownUnlike,
            title:"No Me gusta",
            indicatorKey:"unlikes",
            subtitle:"5.000",
            details: "Número de clicks en el botón “No me gusta” (Una vez por dispositivo)"
        },
        {
            image:BlackMessage,
            brownImage:BrownMessage,
            title:"Comentarios",
            indicatorKey:"proposes",
            subtitle:"5.000",
            details: "Número de clicks en el botón “Comentarios”"
        },
        {
            image:BlackShare,
            brownImage:BrownShare,
            title:"Compartido",
            indicatorKey:"shares",
            subtitle:"5000",
            details: "Número de veces que el link de la app fue compartido."
        },
        {
            image:BlackEngagement,
            brownImage:BrownEngagement,
            title:"Tasa de Interaccion",
            indicatorKey:"interaction",
            subtitle:"5.000",
            details: "La tasa de interacción mide el nivel de usuarios que interactuaron con el contenido de la app."
        },
        {
            image:BlackWatchEye,
            brownImage: BrownWatchEye,
            title:"Tiempo promedio de vista por sesión",
            indicatorKey:"average_view_time_per_session",
            subtitle:"0:06:25",
            details:"Tiempo promedio que se vió cada sesión por vista."
        },
        {
            image:BlackWatchMan,
            brownImage:BrownWatchMan,
            title:"Tiempo promedio de usuarios por sesión",
            indicatorKey:"average_user_time_per_session",
            subtitle:"2.00",
            details: "Tiempo promedio que se vió cada sesión por usuario."
        },
        {
            image:BlackViews,
            brownImage: BrownViews,
            title:"Tasa de Abandono",
            indicatorKey:"pending_variables",
            subtitle:"5.000",
            details:"Número de vistas que no interactuaron con ningún botón, o duraron menos de 30 segundos en la app"
        },
        {
            image:BlackDollar,
            brownImage: BrownDollar,
            title:"Costo por interacción",
            indicatorKey:"avg_cost_of_each_user_by_interaction",
            subtitle:"2000",
            details: "Descripción: costo promedio de cada interacción de usuario con la app."
        },
        {
            image:BlackDollarPerson,
            brownImage:BrownDollarPerson,
            title:"Costo por usuario",
            indicatorKey:"avg_cost_of_each_user",
            subtitle:"5000",
            details:"Descripción: costo promedio de cada usuario por la app."
        }
    ])


    useEffect(() => {
        getAllIndustriesForCandidate();
    }, []);

    // useEffect(()=>{
    //     getAllAnalyticsData()
    // },[activeIndustryId])



    let scrollToSpecificDiv =()=>{
        titleRef.current.scrollIntoView({ behavior: "smooth" });
    }

    let changeActiveSlideIndustry=(index)=>{
        setActiveSlideIndustry(index)
    }

    let getAllIndustriesForCandidate = async () => {
        let token = sessionStorage.getItem('token');
        setIsLoading(true);
        try {
            let response = await axios.get(`${config.baseUrl}api/industries/by-candidate`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            setIsLoading(false);
            setIndustriesOfCandidate(response.data.data);
            setActiveIndustryId(response.data.data[0].id);
            getAllAnalyticsData(response.data.data[0].id)
        } catch (error) {
            setIsLoading(false);
            toast.error(
                error.response?.data.message || "Something went wrong"
            )
        }
    }



    let getAllAnalyticsData = async (aaa) => {
        let token = sessionStorage.getItem('token');
        setIsLoading(true);
        try {
            let response = await axios.get(`${config.baseUrl}api/analytic/all?industry_id=${aaa}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            setIsLoading(false);
            let indicatorIconsCopy=[...indicatorIcons];
            let indicatorIconsIndustryCopy=[...indicatorIconsIndustry];
            for (let i = 0; i < indicatorIconsCopy.length; i++) {
                // if(response.data.data.intro[indicatorIconsCopy[i].indicatorKey]){
                //     indicatorIconsCopy[i].subtitle= response.data.data.intro[indicatorIconsCopy[i].indicatorKey];
                // }
                for (let [key, value] of Object.entries(response.data.data.intro)) {
                    if(indicatorIconsCopy[i].indicatorKey===key){
                        indicatorIconsCopy[i].subtitle=value
                    }
                }
            }
            for (let i = 0; i < indicatorIconsIndustryCopy.length; i++) {
                for (let [key, value] of Object.entries(response.data.data.industry)) {
                    if(indicatorIconsIndustryCopy[i].indicatorKey===key){
                        indicatorIconsIndustryCopy[i].subtitle=value
                    }
                }
            }
            console.log(response.data, "needed getAllAnalyticsData")
            setIndicatorIcons(indicatorIconsCopy);
            setIndicatorIconsIndustry(indicatorIconsIndustryCopy);
            setBarChartDataIntro(response.data.data.intro.ages);
            setBarChartDataIndustry(response.data.data.industry.ages);
            setPieChartDataGender(response.data.data.intro.genders);
            setPieChartDataGenderIndustry(response.data.data.industry.genders)
            setProposalDataIntro(response.data.data.intro.proposalData);
            setProposalDataIndustry(response.data.data.industry.proposalData);
            setLineChartData(response.data.data.intro.graph);
            setLineChartDataIndustry(response.data.data.industry.graph);
            setCardsProposals(response.data.data.intro.industries)
        } catch (error) {
            setIsLoading(false);
            console.log(error)
            // toast.error(
            //     error.response?.data.message || "Something went wrong"
            // )
        }
    }

    let getAllAnalyticsDataForIndustry  = async (i) => {
        let token = sessionStorage.getItem('token');
        setIsLoading(true);
        try {
            let response = await axios.get(`${config.baseUrl}api/analytic/industry/${i}`, {
                // let response = await axios.get(`${config.baseUrl}api/analytic/all?industry_id=${activeIndustryId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            setIsLoading(false);
            let indicatorIconsIndustryCopyNew=[...indicatorIconsIndustry];
            for (let i = 0; i < indicatorIconsIndustryCopyNew.length; i++) {
                for (let [key, value] of Object.entries(response.data.data)) {
                    if(indicatorIconsIndustryCopyNew[i].indicatorKey===key){
                        indicatorIconsIndustryCopyNew[i].subtitle=value
                    }
                }
            }
            console.log(response.data, "new zapros")
            setIndicatorIconsIndustry(indicatorIconsIndustryCopyNew);
            setBarChartDataIndustry(response.data.data.ages);
            setPieChartDataGenderIndustry(response.data.data.genders)
            setProposalDataIndustry(response.data.data.proposalData);
            setLineChartDataIndustry(response.data.data.graph);
            setCalendarDataIndustry([{
                startDate: new Date(),
                endDate: new Date(),
                key: 'selection'
            }])
        } catch (error) {
            setIsLoading(false);
            console.log(error)
        }
    }


    let getInteractionIntro = async ( type, startDate, endDate) => {
        let token = sessionStorage.getItem('token');
        setIsLoading(true);
        const queryParams = {};
        if (type) {
            queryParams.type = type;
        }
        else{
            queryParams.type =activeTypeIntro
        }
        if (startDate && endDate) {
            queryParams.start_date = startDate;
            queryParams.end_date = endDate;
        }
        // else{
        //     queryParams.start_date =
        // }

        try {
            const queryString = Object.keys(queryParams)
                .map((key) => `${key}=${queryParams[key]}`)
                .join('&');
            let response = await axios.get(
                `${config.baseUrl}api/analytic/interaction?${queryString}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            console.log(response.data, "getInteractionIntro verevi data")
            setIsLoading(false);
            setLineChartData(response.data.data.graph);
            setBarChartDataIntro(response.data.data.ages);
            setPieChartDataGender(response.data.data.genders);
            setProposalDataIntro(response.data.data.proposalData)
        } catch (error) {
            setIsLoading(false);
            toast.error(error.response?.data.message || "Something went wrong");
        }
    };

    let getInteractionIndustry = async (requiredId, type, startDate, endDate) => {
        let token = sessionStorage.getItem('token');
        setIsLoading(true);
        const queryParams = {};
        if (!requiredId) {
            requiredId =activeIndustryId
        }
        // else{
        //
        // }
        if (type) {
            queryParams.type = type;
        }
        else{
            queryParams.type =activeTypeIndustry
        }
        if (startDate && endDate) {
            queryParams.start_date = startDate;
            queryParams.end_date = endDate;
        }
        try {
            const queryString = Object.keys(queryParams)
                .map((key) => `${key}=${queryParams[key]}`)
                .join('&');
            let response = await axios.get(
                `${config.baseUrl}api/analytic/interaction/${requiredId}?${queryString}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setIsLoading(false);
            console.log(response.data, "getInteractionIntro nerqevi data")
            setLineChartDataIndustry(response.data.data.graph);
            setBarChartDataIndustry(response.data.data.ages);
            setPieChartDataGenderIndustry(response.data.data.genders);
            setProposalDataIndustry(response.data.data.proposalData)
        } catch (error) {
            setIsLoading(false);
            console.log(error);
            toast.error(error.response?.data.message || "Something went wrong");
        }
    };

    let indicatorIconsClick = (indx, indKey)=>{
        if(indKey !=="interaction" && indKey !=="avg_cost_of_each_user_by_interaction" && indKey !=="avg_cost_of_each_user"
            && indKey !=="average_view_time_per_session" && indKey !=="average_user_time_per_session" && indKey !=="pending_variables")
        {
            getInteractionIntro(indKey);
            setActiveSlide(indx);
            setActiveTypeIntro(indKey);
            setDateRangeIntro([{
                startDate: new Date(),
                endDate: new Date(),
                key: 'selection'
            }])
        }
    }

    let indicatorIconsIndustryClick  = (indxInds, indKeyInds)=>{
        if(indKeyInds !=="interaction" && indKeyInds !=="avg_cost_of_each_user_by_interaction" && indKeyInds !=="avg_cost_of_each_user"
            && indKeyInds !=="average_view_time_per_session" && indKeyInds !=="average_user_time_per_session" && indKeyInds !=="pending_variables")
        {
            getInteractionIndustry(undefined, indKeyInds);
            setActiveTypeIndustry(indKeyInds);
            changeActiveSlideIndustry(indxInds);
            setCalendarDataIndustry([{
                startDate: new Date(),
                endDate: new Date(),
                key: 'selection'
            }])
        }
        else{
            console.log("hiii")
        }
    }



    let saveCalendarDataIntro = (data)=>{
        // setCalendarDataIntro({
        //     startDate:moment(data[0].startDate).format("YYYY-MM-DD"),
        //     endDate:moment(data[0].endDate).format("YYYY-MM-DD"),
        // })
        setDateRangeIntro(data);
        getInteractionIntro( undefined, moment(data[0].startDate).format("YYYY-MM-DD"), moment(data[0].endDate).format("YYYY-MM-DD"))
    }

    let changeCalendarDataIndustry = (data)=>{
        setCalendarDataIndustry(data);
        getInteractionIndustry( undefined,undefined, moment(data[0].startDate).format("YYYY-MM-DD"), moment(data[0].endDate).format("YYYY-MM-DD"))
    }




    const renderIndicatorIcons =indicatorIcons?.map((item, index)=>(
        <SwiperSlide
            key={index}
            className={"indicatorsSwiperSlide"}
            // onClick={()=>setActiveSlide(index)}
            // onClick={()=>indicatorIconsClick(index)}
            onMouseEnter={() => setHoverSlide(index)}
            onMouseLeave={() => setHoverSlide(null)}
        >
            <div className="sliderInside indicatorsInside">
                <div className={classes.iconsDiv}
                    // onClick={()=>{getInteractionIntro(item.indicatorKey);
                     onClick={()=>indicatorIconsClick(index, item.indicatorKey)}
                    //     setActiveTypeIntro(item.indicatorKey)
                    //     setDateRangeIntro([{
                    //         startDate: new Date(),
                    //         endDate: new Date(),
                    //         key: 'selection'
                    //     }])
                    // }}
                >
                    <div>
                        <img
                            className={classes.iconStyle}
                            src={activeSlide !== index ? item.image: item.brownImage}
                        />
                    </div>
                    <div className={classes.downDiv}>
                        <div  className={`${activeSlide !== index ? classes.titleIndicator : classes.brownTitileIndicator}`}>{item.title}</div>
                        <div className={`${activeSlide !== index ? classes.subtitleIndicator : classes.brownSubtitileIndicator}`}>
                            {    (item.indicatorKey  !=="interaction" && item.indicatorKey !=="avg_cost_of_each_user_by_interaction" && item.indicatorKey !=="avg_cost_of_each_user"
                            && item.indicatorKey !=="average_view_time_per_session" && item.indicatorKey !=="average_user_time_per_session"
                                && item.indicatorKey !=="pending_variables") ? item.subtitle :
                            Number(item.subtitle).toFixed(2)}
                        </div>
                    </div>
                    {hoverSlide ===index && <div className={classes.detailDiv}>{item.details}</div>}
                </div>
            </div>
        </SwiperSlide>
    ))


    const cardsIndicators = [
        {
            title: "Vistas"
        },
        {
            title: "Me gusta"
        },
        {
            title: "Me disgusta"
        },
        {
            title: "Compartido"
        }
    ]



    const [cardsProposals, setCardsProposals]=useState({});



    const switchCaseTitle = (parameter) => {
        switch(parameter){
            case "visits":
                return "Vistas"
            case  "likes":
                return "Me gusta"
            case  "unlikes":
                return "Me disgusta"
            default:
                return "Compartido"
        }
    }

    const renderProposalsDetails = Object.entries(cardsProposals)?.map(([key, val])=>{
        return (
            <div className={classes.items}>
                <label className={classes.category}>{switchCaseTitle(key)}</label>
                <div className={classes.elements}>
                    {
                        // value.value
                        val.map((item)=>(
                            <Progress_bar
                                image={item.image}
                                title={item.name}
                                completed={`${(item.value/val.reduce((a,v)=>a+v.value ,0)*100).toFixed(2)}`}
                                // completed={item.value}
                                bgcolor={"red"}
                            />
                        ))
                    }
                </div>
            </div>

        )
    })


    const renderProposalsInformation =proposalDataIntro?.map((item, index)=>(
        <SwiperSlide
            key={index}
            className={"proposalSwiperSlide"}>
            <div className={classes.proposalsDetails}>
                <div className={classes.proposalSubtitle}>Age: <span>{item.age}</span></div>
                <div className={classes.proposalSubtitle}>Gender: <span>{item.gender}</span></div>
                <div className={classes.proposalSubtitle}>Name: <span>{item.name}</span></div>
                <div className={classes.proposalSubtitle}>Date: <span>
                    {/*{console.log(item.created_at)}*/}
                    {/*{item.created_at}*/}
                    {/*{console.log(new Date(item.created_at))}*/}
                    {moment(new Date(item.created_at)).format("DD/MM/YYYY")}
                </span>
                </div>
                <div className={classes.proposalText}>{item.message}</div>
            </div>
        </SwiperSlide>
    ))

    if (isLoading) return <Loader/>;

    return (
        <div className="whole">
            <div>
                <HeaderAdmin/>
                <div className="container">
                    <div className="upPart">
                        <div className="upTitle">Indicadores
                        </div>
                        {/*<Button OnClick={() => createEvent(singleEvent)}>Save</Button>*/}
                    </div>
                    <div className="swiperWhole">
                        <Swiper
                            slidesPerView={8}
                            spaceBetween={40}
                            // onSlideChange={() => console.log('slide change')}
                            // onSwiper={(swiper) => console.log(swiper)}
                            keyboard={{ enabled: true }}
                            modules={[Keyboard, Pagination, Navigation]}
                            pagination={{
                                clickable: true
                            }}
                            navigation={true}
                            className={"indicatorsSlider"}
                        >
                            {renderIndicatorIcons}
                        </Swiper>
                    </div>
                    <div className={classes.summary_total}>
                        <RangeCalendarIntro OnSaveCalendarDataIntro={saveCalendarDataIntro}
                                            dateRangeIntro={dateRangeIntro}/>
                        <div className={classes.chart}>
                            <LineChart
                                chartData={lineChartData}
                            />
                        </div>
                    </div>
                    <div className={classes.downPart}>
                        <div className={classes.chartsPart}>
                            <PieChart chartData={pieChartDataGender}/>
                            <BarChart chartData={barChartDataIntro}/>
                        </div>


                        <div className={classes.proposalsPart}>
                            <div className={classes.proposalsTitle}>Proposals</div>
                            <Swiper
                                slidesPerView={1}
                                spaceBetween={40}
                                // onSlideChange={() => console.log('slide change')}
                                // onSwiper={(swiper) => console.log(swiper)}
                                keyboard={{ enabled: true }}
                                modules={[Keyboard, Pagination, Navigation]}
                                pagination={{
                                    clickable: true
                                }}
                                navigation={true}
                                className={"proposalsSlider"}
                            >
                                {renderProposalsInformation}
                            </Swiper>
                        </div>
                    </div>
                    <div className="upPart"><div className="upTitle">Detalle por propuestas
                    </div>
                    </div>
                    <div className={classes.secondary_container}>
                        {cardsProposals && renderProposalsDetails}
                    </div>
                    <IndicatorsByIndustries industriesOfCandidate={industriesOfCandidate}
                                            indicatorIconsIndustry={indicatorIconsIndustry}
                                            onSetActiveIndustryId={setActiveIndustryId}
                                            proposalDataIndustry={proposalDataIndustry}
                                            barChartDataIndustry={barChartDataIndustry}
                                            pieChartDataGenderIndustry={pieChartDataGenderIndustry}
                                            lineChartDataIndustry={lineChartDataIndustry}
                                            activeIndustryId={activeIndustryId}
                                            getInteractionIndustry={getInteractionIndustry}
                                            activeSlideIndustry={activeSlideIndustry}
                                            onChangeActiveSlideIndustry={changeActiveSlideIndustry}
                                            hoverSlideIndustry={hoverSlideIndustry}
                                            setHoverSlideIndustry={setHoverSlideIndustry}
                                            onSetCalendarDataIndustry={changeCalendarDataIndustry}
                                            setActiveTypeIndustry={setActiveTypeIndustry}
                                            calendarDataIndustry={calendarDataIndustry}
                                            setCalendarDataIndustry={setCalendarDataIndustry}
                                            titleRef={titleRef}
                                            onScrollToDiv={scrollToSpecificDiv}
                                            getAllAnalyticsDataForIndustry={getAllAnalyticsDataForIndustry}
                                            indicatorIconsIndustryClick={indicatorIconsIndustryClick}
                        // scollToRef={scollToRef}
                    />
                </div>
            </div>
            <Footer/>
        </div>
    )
}


export default Indicators;
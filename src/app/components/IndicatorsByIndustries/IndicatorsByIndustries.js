import React, {useRef, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Keyboard, Navigation, Pagination} from "swiper";
import RangeCalendar from "../CalendarIndicators/CalendarIndicators";
import LineChart from "../LineChart/LineChart";
import PieChart from "../PieChart/PieChart";
import BarChart from "../BarChart/BarChart";
import moment from "moment";
import classes from '../../pages/Indicators/Indicators.module.css';


function IndicatorsByIndustries(props){
    const targetDivRef = useRef(null);
    const industryDivRef = useRef(null);
    const saveCalendarData = (data)=>{
        props.onSetCalendarDataIndustry(data);
        if (industryDivRef.current) {
            industryDivRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }



    const renderIndicatorIcons =props?.indicatorIconsIndustry.map((item, index)=>(
        <SwiperSlide
            key={index}
            className={"indicatorsSwiperSlide"}
            // onClick={()=>props?.onChangeActiveSlideIndustry(index)}
            onMouseEnter={() => props?.setHoverSlideIndustry(index)}
            onMouseLeave={() => props?.setHoverSlideIndustry(null)}
        >
            <div className="sliderInside indicatorsInside" >
                <div className={classes.iconsDiv}
                    // href={`#${props.activeIndustryId}`}
                     onClick={()=>{props.indicatorIconsIndustryClick(index, item.indicatorKey);
                         if (industryDivRef.current) {
                             industryDivRef.current.scrollIntoView({ behavior: "smooth" });
                         }}}
                >
                    <div>
                        <img
                            className={classes.iconStyle}
                            src={props?.activeSlideIndustry !== index ? item.image: item.brownImage}
                        />
                    </div>
                    <div className={classes.downDiv}>
                        <div  className={`${props?.activeSlideIndustry !== index ? classes.titleIndicator : classes.brownTitileIndicator}`}>{item.title}</div>
                        <div className={`${props?.activeSlideIndustry !== index ? classes.subtitleIndicator : classes.brownSubtitileIndicator}`}>
                            {    (item.indicatorKey  !=="interaction" && item.indicatorKey !=="avg_cost_of_each_user_by_interaction" && item.indicatorKey !=="avg_cost_of_each_user"
                                && item.indicatorKey !=="average_view_time_per_session" && item.indicatorKey !=="average_user_time_per_session") ? item.subtitle :
                                Number(item.subtitle).toFixed(2)}
                           </div>
                    </div>
                    {props?.hoverSlideIndustry ===index && <div className={classes.detailDiv}>{item.details}</div>}
                </div>
            </div>
        </SwiperSlide>
    ))


    const renderIndustryImages=props?.industriesOfCandidate?.map((item, index)=>(
        <div className={classes.indicatorImages} key={index}>
            <a className={classes.indImg}
                // href={`#${props.activeIndustryId}`}
               onClick={(e)=> {
                   props.onSetActiveIndustryId(item.id);
                   props.getAllAnalyticsDataForIndustry(item.id);
                   props?.onChangeActiveSlideIndustry(0);
                   if (targetDivRef.current) {
                       targetDivRef.current.scrollIntoView({ behavior: "smooth" });
                   }
                   // props?.getInteractionIndustry(item.id)
               }}
            >
                <img src={item.icon} alt=""/>
            </a>
            {props.activeIndustryId ===item.id &&
                <div className={classes.imgTitle}>{item.name}</div>}
        </div>
    ))


    const renderProposalsInformation =props?.proposalDataIndustry?.map((item, index)=>(
        <SwiperSlide
            key={index}
            className={"proposalSwiperSlide"}>
            <div className={classes.proposalsDetails}>
                <div className={classes.proposalSubtitle}>Age: <span>{item.age}</span></div>
                <div className={classes.proposalSubtitle}>Gender: <span> {item.gender}</span></div>
                <div className={classes.proposalSubtitle}>Name: <span> {item.name}</span></div>
                <div className={classes.proposalSubtitle}>Date: <span>
                    {moment(item.created_at).format("YYYY-MM-DD")}</span>
                </div>
                <div className={classes.proposalText}>{item.message}</div>
            </div>
        </SwiperSlide>
    ))

    return(
        <>
            <div className="upPart"><div className="upTitle">Indicadores by industries</div>
            </div>
            <div style={{display:"flex"}}  ref={targetDivRef}
                // id={props.activeIndustryId}
            > {renderIndustryImages}</div>
            <div className="swiperWhole" ref={industryDivRef}>
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
                <div className={classes.summary_total}>
                    <RangeCalendar OnSaveCalendarData ={saveCalendarData}
                                   calendarDataIndustry={props.calendarDataIndustry}
                    />
                    <div className={classes.chart}>
                        <LineChart
                            chartData={props.lineChartDataIndustry}
                        />
                    </div>
                </div>
                <div className={classes.downPart}>
                    <div className={classes.chartsPart}>
                        <PieChart chartData={props.pieChartDataGenderIndustry}/>
                        <BarChart chartData={props.barChartDataIndustry}/>
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
            </div>
        </>
    )
}

export default IndicatorsByIndustries;
import React, {useState} from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Pagination, Navigation }  from 'swiper';
import 'swiper/css';
import 'swiper/css/keyboard';
import "swiper/css/pagination";
import "swiper/css/navigation";
import  './Proposal.css';


function Proposal(props){

    const [activeSlide, setActiveSlide]=useState(null)



    const renderProposalIcons =props.proposalsIcons?.map((item, index)=>(
        <SwiperSlide
            className={`${activeSlide ===item.id ? "activeSlide" : "slide"}`}
                     onClick={(e)=>{
                         props.onsetId({target:{name:"icon_id",value:item.id}});
                         setActiveSlide(item.id)}}>
            <div className="sliderInside" ><img src={item.path}/></div>
        </SwiperSlide>
))



    return(
        <div className="container">
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
                    className={"max_width"}
                >
                    {renderProposalIcons}
                </Swiper>
            </div>
        </div>
    )
}


export default Proposal;
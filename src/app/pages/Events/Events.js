import React, {useState} from "react";
import Plus from "../../assets/images/Plus.svg";
import Location from '../../assets/images/Location.svg';
import DeleteIcon from "../../assets/images/DeleteIcon.svg";
import EventImage from "../../assets/images/EventImage.png";
import DragDrop from '../../assets/images/DragDrop.png';
import EditIcon from '../../assets/images/EditIcon.svg';
import HeaderAdmin from "../../components/HeaderAdmin/HeaderAdmin";
import Footer from "../../components/Footer/Footer";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import ImageUploader from "../../components/ImageUploader/ImageUploader";
import classes from './Events.module.css';

function Events() {
    const [cardInfo, setCardInfo] = useState(Array.from({length: 8}, (_, k) => (
        {
            image: EventImage,
            location: "Location",
            eventName: "Event Name" + " " + (k + 1),
            theme: "Theme Name",
            date: "08 MAY 2023 4:00 PM",
        })))

    const [singleEvent, setSingleEvent] = useState({
        image: null,
        location: "",
        eventName: "",
        theme: "",
        date: "",
    })

    const [create, setCreate] = useState(false);
    const [edit, setEdit] = useState(false);
    const [itemIndex, setItemIndex] = useState();


    const handleChange = (e) => {
        let img;
        if (e.target.name === 'image' && e.target.value !== null) {
            img = URL.createObjectURL(e.target.value);
        }
        setSingleEvent({
            ...singleEvent,
            [e.target.name]: img || e.target.value,
        });
    };

    const createEvent = (singleEvent, newIndex) => {
        if (newIndex || newIndex === 0) {
            const cardInfoCopy = JSON.parse(JSON.stringify(cardInfo));
            cardInfoCopy.splice(newIndex, 1, singleEvent);
            setCardInfo(cardInfoCopy)
        } else {
            const cardInfoCopy = JSON.parse(JSON.stringify(cardInfo));
            cardInfoCopy.unshift(singleEvent);
            setCardInfo(cardInfoCopy);
        }
        setSingleEvent({
            image: null,
            location: "",
            eventName: "",
            theme: "",
            date: "",
        })
        setCreate(false);
        setEdit(false)
    }

    const editCard = (indx) => {
        setEdit(!edit);
        setItemIndex(indx);
        let item = cardInfo.find((item, index) => index === indx);
        setSingleEvent({
            image: item.image,
            location: item.location,
            eventName: item.eventName,
            theme: item.theme,
            date: item.date,
        })
    }


    const renderCards = cardInfo.map((item, index) => (
        <div className={classes.cardDiv} key={index}>
            <div className={classes.eventImg}><img className={classes.eventImg} src={item.image} alt=""/>
                <div className={classes.editIconDiv} onClick={() => editCard(index)}><img src={EditIcon} alt=""/></div>
            </div>
            <div className={classes.locationDiv}>
                <img className={classes.locationIcon} src={Location} alt=""/>
                {item.location}</div>
            <div className={classes.eventName}>{item.eventName}</div>
            <div className={classes.theme}>Theme: {item.theme}</div>
            <div className={classes.eventTime}>{item.date}</div>
        </div>
    ))


    return (
        <div className="whole">
            <div>
                <HeaderAdmin/>
                <div className="container">
                    {create ?
                        <>
                            <div className="upPart">
                                <div className="upTitle"><span className="titleSpan">Events / </span> Create New Event
                                </div>
                                <Button OnClick={() => createEvent(singleEvent)}>Save</Button>
                            </div>
                        </>
                        : edit ?
                            <>
                                <div className="upPart">
                                    <div className="upTitle"><span className="titleSpan">Events / </span> Edit Event
                                    </div>
                                    <div className={classes.buttons}>
                                        <div className={classes.deleteBtn}>Delete event</div>
                                        <Button OnClick={() => createEvent(singleEvent, itemIndex)}>Save</Button>
                                    </div>
                                </div>
                            </>
                            :
                            <>
                                <div className="upPart">
                                    <div className="upTitle">Events</div>
                                    <Button OnClick={() => setCreate(!create)}>Create New
                                        <img className="plusIcon" src={Plus} alt=""/></Button>
                                </div>
                            </>
                    }
                    {edit || create ?
                        <div className={classes.dragAndDropPart}>
                            <div className={classes.dragAndDropInside}>
                                <Input
                                    input={{
                                        name: "location",
                                        value: singleEvent.location,
                                        placeholder: "Type the location",
                                        type: "text",
                                        onChange: handleChange
                                    }}
                                />
                                <Input
                                    input={{
                                        name: "eventName",
                                        value: singleEvent.eventName,
                                        placeholder: "Type event name",
                                        type: "text",
                                        onChange: handleChange
                                    }}
                                />
                                <Input
                                    input={{
                                        name: "theme",
                                        value: singleEvent.theme,
                                        placeholder: "Type theme",
                                        type: "text",
                                        onChange: handleChange
                                    }}
                                />
                                <Input
                                    input={{
                                        name: "date",
                                        value: singleEvent.date,
                                        placeholder: "Type the date",
                                        type: "date",
                                        onChange: handleChange
                                    }}
                                />
                                <div className={classes.imageUploaderDiv}>
                                    <ImageUploader
                                        deleteIcon={DeleteIcon}
                                        image={DragDrop}
                                        textDragDrop="Drag and drop event avatar, or"
                                        spanText="Browse"
                                        width={'405px'}
                                        height={'250px'}
                                        imgWidth={'405px'}
                                        imgHeight={'250px'}
                                        max="Max 2kb"
                                        maxSize={2097152}
                                        name={'eventImage'}
                                        selectedImg={singleEvent?.image}
                                        OnUpdateImage={handleChange}
                                    />
                                </div>
                            </div>
                        </div> :
                        <div className={classes.cardsAll}>
                            {renderCards}
                        </div>
                    }
                </div>
            </div>
            <Footer/>
        </div>
    )
}


export default Events;
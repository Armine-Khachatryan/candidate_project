import React from "react";
import classes from './Progress_bar.module.css';

const ProgressBar = (props) => {

    const { bgcolor, completed, image, title } = props;

    const containerStyles = {
        height: "25px",
        width: '440px',
        backgroundColor: "#e0e0de",
        borderRadius: 50,
        margin: 50
    }

    const fillerStyles = {
        height: '100%',
        width: `${completed}%`,
        backgroundColor: "#9F8F5B",
        borderRadius: 'inherit',
        textAlign: 'right',
    }

    const labelStyles = {
        padding: 5,
        color: '#393122',
        fontWeight: 'bold',
        fontFamily: "Inter_Regular, sans-serif",
        fontSize: "16px",
        fontStyle: "normal",
        paddingRight:"30px",
        paddingLeft:"10px"
    }
    const container_completed={
        display: "flex",
        alignItems: "center"
    }
    const container_ind_column={
        border: "1px solid #9F8F5B",
        borderRadius: "12px",
        width:"120px",
        height: "120px",
        display: "flex",
        paddingTop:"10px",
        paddingBottom:"10px",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#E9E9E9",
    }

    const image_style={
        marginTop:"10px",
        maxWidth:"50px",
        width:"100%"
    }


    return (
        <div style={container_completed}>
            <div style={container_ind_column}>
                <img  style={image_style} src={image} alt="Imagen de logo"/>
                <h3 className={classes.title}
                >{title}</h3>
            </div>
                <div style={containerStyles}>
                    <div style={fillerStyles}>
                        <span style={labelStyles}>{`${completed}%`}</span>
                    </div>
                </div>
        </div>
    );
};

export default ProgressBar;
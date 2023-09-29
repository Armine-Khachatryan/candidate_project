import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './AudioUploader.css';

const AudioUploader = (props) => {

    const [selectedAudio, setSelectedAudio] = useState(null);
    const maxSize = props.maxSize;
    const { getRootProps, getInputProps, isDragReject } = useDropzone({
        accept: 'audio/*',
        maxSize,
        onDrop: (acceptedFiles) => {
            if (acceptedFiles && acceptedFiles.length > 0) {
                setSelectedAudio(acceptedFiles[0]);
                //     setSelectedAudio ((selectedImage) =>{
                //         return(acceptedFiles[0])
                //     })
                // console.log(acceptedFiles[0], "acc file 0")
                props.OnUpdateImage({target: {value: acceptedFiles[0], name: props?.name}})
            }
        },
    });


    const deleteAudio = () => {
        setSelectedAudio(null);
        props.OnUpdateImage({target:{value:null,name:props?.name}})
    }
    const messageClass = `message ${isDragReject ? 'rejected' : ''}`;
    return (
        <>
            {selectedAudio?(
                <div className="belowPartAudioUploaded"  style={{width:props.width, height:props.height}}>
                    <audio controls>
                        <source src={URL.createObjectURL(props?.selectedAud)}/>
                       {/*<source src={props?.selectedAud || URL.createObjectURL(selectedAudio)}/>*/}
                    </audio>
                    <div className="iconDiv" onClick={deleteAudio}>
                        <img src={props.deleteIcon}/>
                    </div>
                </div>
            ): props?.selectedAud && typeof(props?.selectedAud) ==="string"?(
                    <div className="belowPartAudioUploaded"  style={{width:props.width, height:props.height}}>
                        <audio controls>
                            <source src={props?.selectedAud}/>
                        </audio>
                        <div className="iconDiv" onClick={deleteAudio}>
                            <img src={props.deleteIcon}/>
                        </div>
                    </div>
                ):  props?.selectedAud && typeof(props?.selectedAud) ==="object"?(
                    <div className="belowPartAudioUploaded"  style={{width:props.width, height:props.height}}>
                        <audio controls>
                            <source src={URL.createObjectURL(props?.selectedAud)}/>
                        </audio>
                        <div className="iconDiv" onClick={deleteAudio}>
                            <img src={props.deleteIcon}/>
                        </div>
                    </div> ):
                <>
                <div className="belowPart" style={{width:props.width, height:props.height}}>
                    <div {...getRootProps()} className="dropzone" style={{width:props.width, height:props.height}}>
                        <div className="upladedImageDiv">
                            <img src={props.image} alt=""/>
                        </div>
                        <input {...getInputProps()} />
                        <div>
                            <div className="textDragDrop">{props.textDragDrop}
                                <span className="uploadButton">{props.spanText}</span>
                            </div>
                            <div className="max">{props.max}</div>
                            <div className="rejectedClass">{props.errorText}</div>
                        </div>
                        {/*{!isDragReject ? (*/}
                        {/*    <div className="textDragDrop">{props.textDragDrop}*/}
                        {/*        <span className="uploadButton">{props.spanText}</span></div>)*/}
                        {/*    : <div className="rejectedClass">File type not accepted, sorry!</div>}*/}
                        {/*    <div className="max">{props.max}</div>*/}
                    </div>
                </div>
            </>
            }
        </>
    );
};

export default AudioUploader;

import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './ImageUploader.style.css';
import Frame1 from '../../assets/images/Frame1.png';


const ImageUploader = (props) => {
    const [selectedImage, setSelectedImage] = useState(null);

    const maxSize = props.maxSize;
    const { getRootProps, getInputProps, isDragReject } = useDropzone({
        // accept: 'image/*',
        maxSize,
        onDrop: (acceptedFiles) => {
            if (acceptedFiles && acceptedFiles.length > 0) {
                setSelectedImage(acceptedFiles[0]);

                // setSelectedImage ((selectedImage) =>{
                //     return(acceptedFiles[0])
                // })
                // console.log(acceptedFiles[0], "acceptedFiles[0]")
                props.OnUpdateImage({target:{value:acceptedFiles[0],name:props?.name}})
                if(props.name ==='avatar'){
                    props.OnSetImage_deleted(false)
                }
            }
        },
    });


    const deleteImage = () => {
        setSelectedImage(null);
        props.OnUpdateImage({target:{value:null,name:props?.name}})
        if(props.name ==='avatar'){
            props.OnSetImage_deleted(true)
        }
    }

    return (
        <>
            {selectedImage && props.name !== "model_3d"? (
                <div className="belowPartUploaded"   style={{width:props.width, height:props.height}}>
                    <div className="imageDiv"  style={{width:props.imgWidth, height:props.imgHeight}}>
                        <img className="imageStyle"
                             style={{width:props.imgWidth, height:props.imgHeight}}
                             src={URL.createObjectURL(selectedImage) }
                             alt="Selected image" />
                    </div>
                    <div className="iconDiv" onClick={deleteImage}>
                        <img src={props.deleteIcon}/>
                    </div>
                </div>
            ):
                props?.selectedImg && typeof(props?.selectedImg) ==="string" && props.name !== "model_3d"?
                (<div className="belowPartUploaded"   style={{width:props.width, height:props.height}}>
                    <div className="imageDiv"  style={{width:props.imgWidth, height:props.imgHeight}}>
                        <img className="imageStyle"
                             style={{width:props.imgWidth, height:props.imgHeight}}
                             src={props?.selectedImg}
                             alt="Selected image" />
                    </div>
                    <div className="iconDiv" onClick={deleteImage}>
                        <img src={props.deleteIcon}/>
                    </div>
                </div>):
                props?.selectedImg && typeof(props.selectedImg) === "object" && props.name !== "model_3d"?
                    (
                        <div className="belowPartUploaded"   style={{width:props.width, height:props.height}}>
                            <div className="imageDiv"  style={{width:props.imgWidth, height:props.imgHeight}}>
                                <img className="imageStyle"
                                     style={{width:props.imgWidth, height:props.imgHeight}}
                                     src={URL.createObjectURL(props?.selectedImg)}
                                     alt="Selected image" />
                            </div>
                            <div className="iconDiv" onClick={deleteImage}>
                                <img src={props.deleteIcon}/>
                            </div>
                        </div>
                    ):
                    props.name === "model_3d" &&  props?.selectedImg ?
                        (
                            <div className="belowPartUploaded"   style={{width:props.width, height:props.height}}>
                                <div className="imageDiv"  style={{width:props.imgWidth, height:props.imgHeight}}>
                                    <img className="imageStyle"
                                         style={{width:props.imgWidth, height:props.imgHeight}}
                                         src={Frame1}
                                         alt="Selected frame" />
                                </div>
                                <div className="iconDiv" onClick={deleteImage}>
                                    <img src={props.deleteIcon}/>
                                </div>
                            </div>
                        ):
                <>
                    <div className="belowPart" style={{width:props.width, height:props.height}}>
                        <div {...getRootProps()} className="dropzone" style={{width:props.width, height:props.height}}>
                            <div className="upladedImageDiv">
                                <img src={props.image} alt=""/>
                            </div>
                            <input {...getInputProps()} />
                            {/*{!isDragReject ? (*/}
                            {/*        <div className="textDragDrop">{props.textDragDrop}*/}
                            {/*            <span className="uploadButton">{props.spanText}</span></div>)*/}
                            {/*    : <div className="rejectedClass">{props.errorText}*/}
                            {/*        /!*File type not accepted, sorry!*!/*/}
                            {/*</div>}*/}
                            <div>
                                <div className="textDragDrop">{props.textDragDrop}
                                    <span className="uploadButton">{props.spanText}</span>
                                </div>
                                <div className="max">{props.max}</div>
                                <div className="rejectedClass">{props.errorText}</div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    );
};

export default ImageUploader;

import React, {useEffect} from 'react';
import Image from "./Image";
import cl from "./Images.module.css"

const Images = (props) => {
    useEffect(()=>
        props.fetchImages()
    ,[]) // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <div className = {cl.container}>
            {props.images.map((image) =>
                <Image fetchImages = {props.fetchImages} images={props.images} path = {image.image} key={image.image_id}/>
            )}
        </div>
    );
};

export default Images;
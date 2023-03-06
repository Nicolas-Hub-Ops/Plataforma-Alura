import './style.css';
import React from 'react';

const ImageRandomDogs = (props) => {
    return(
        <div className='image-randomDogs'>
            <img src={props.image} alt="Server Response"/>
        </div>
    )
}

export default ImageRandomDogs;
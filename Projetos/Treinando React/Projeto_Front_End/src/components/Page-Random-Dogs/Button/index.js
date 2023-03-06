import './style.css';
import React from 'react';

const ButtonRandomDogs = (props) => {
    return (
        <button className='btn-random-dogs' onClick={props.action}>{props.title}</button>
    )
}

export default ButtonRandomDogs;
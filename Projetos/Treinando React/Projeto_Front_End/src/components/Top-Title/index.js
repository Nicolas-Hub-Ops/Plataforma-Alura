import './style.css';
import React from 'react';

const Title = (props) => {
    return(
            <h1 className='title-superior'>{props.title}</h1>
    )
}

export default Title;
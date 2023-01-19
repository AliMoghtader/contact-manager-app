import React from 'react';
import laptopMan from "../../assets/laptopboy.png"
import "./notFound.scss"
const NotFound = () => {
    return (
        <div className='notFoundDiv'>
            <h2 className='notFoundHeader'>چنین مخاطبی وجود ندارد!</h2>
            <img src={laptopMan} alt="not found"/>
        </div>
    );
}

export default NotFound;

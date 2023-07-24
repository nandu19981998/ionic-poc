import React from 'react';
import './index.css'

const FieldSet = ({ title, children }) => {
    return (
        <div className="container">
            <h5 className='title'>{title}</h5>
            <div className='content'>{children}</div>
        </div>
    );
};

export default FieldSet;

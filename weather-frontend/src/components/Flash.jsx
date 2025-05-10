import React, { useState } from 'react';
import { useFlash } from '../FlashContext';

const Flash = () => {
    const { success, error, currUser, setSuccess, setError, setCurrUser } = useFlash();

    return (
        <div>
            {success && 
            <div className="alert alert-sucess alert-dismissible fade show col-6 offset-3 mt-3" role="alert">
            {success}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>}
            {error && 
            <div className="alert alert-danger alert-dismissible fade show col-6 offset-3 mt-3" role="alert">
            {error}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>}
            {currUser && 
            <div className="alert alert-success alert-dismissible fade show col-6 offset-3 mt-3" role="alert">
            Welcome, {currUser.username}!
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>}
        </div>
    );
};

export default Flash;

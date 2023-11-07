import React from 'react';
import * as iprofile from "../../images/perfil-icon.png";

import './Profile.css';

const Profile: React.FC = () => {    
    return (
        <div className="container">
            <div className='frame'>
                <img className="profile-img" src={iprofile.default} alt="Profile image" />
                <h2 className="nickname">Marventrian</h2>
            </div>
        </div>
    )
};

export default Profile;

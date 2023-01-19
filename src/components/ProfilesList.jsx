import React from 'react';
import Profile from './profile/profile';
import { filter } from './Header/Header';
const ProfilesList = ({contacts}) => {
    
    
    return (
        <>
            <div className='profilesList'>
                {
                    contacts.filter((contact)=>{
                        if(!filter) return true;
                        let name  = contact.name.toLowerCase();
                        return name.startsWith(filter.toLowerCase())
                    })
                .map((contact)=>{
                    return(<Profile information={contact}/>)
                })}
            </div>
        </>
    );
}

export default ProfilesList;

import React from 'react';
import { Link } from 'react-router-dom';
import './profile.scss';
const Profile = ({information}) => {
    return (
        <>
        <div className='profile'>
          <img className='profileImg' src={information.photo} alt="person image"/>
          <div className='profileInfo'>
            <div>
              <p>نام و نام خانوادگی:</p>
              <p>{information.fullname}</p>
            </div>
            <div>
              <p>شماره موبایل:</p>
              <p>{information.mobile}</p>
            </div>
            <div>
              <p>ایمیل:</p>
              <p>{information.email}</p>
            </div>
          </div>
          <div className='profileButtons'>
            <Link to='/view' className='fas fa-eye btn' type="submit"></Link>
            <Link to='/' className='fas fa-trash btn' type="submit"></Link>
            <Link to='/edit' class="fas fa-edit btn"></Link>
          </div>
        </div>   
        </>
    );
}

export default Profile;

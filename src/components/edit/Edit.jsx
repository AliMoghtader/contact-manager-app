import React from 'react';
import laptopMan from '../../assets/laptopboy.png'
import ali from '../../assets/ali.jpg';
import { Link } from 'react-router-dom';
const Edit = () => {
    return (
        <>
            <h2 className='editContactHeader'>ویرایش مخاطب</h2>
        <div className='editDiv'>
            <form>
              <fieldset>
                <input className='formInput' name="name" type="text" placeholder='نام و نام خانوادگی' />
                <input className='formInput' name="name" type="text" placeholder='ادرس تصویر' />
                <input className='formInput' name="name" type="text" placeholder='شماره موبایل' />
                <input className='formInput' name="name" type="text" placeholder='ادرس ایمیل' />
                <input className='formInput' name="name" type="text" placeholder='شغل' />
                <input className='formInput' name="name" type="text" placeholder='انتخاب گروه' />
              </fieldset>
              <fieldset>
                <button className='createContactBtn btn'>ساخت مخاطب</button>
                <Link to='/' className='cancelContactBtn btn'> انصراف</Link>
              </fieldset>
            
          </form>
          <div className='editImg'>
            <img src={ali} alt="person img"/>
          </div>
        </div>
        <div className='editImgVector'>
            <img src={laptopMan} alt="laptop man"/>
        </div>
        </>
    );
}

export default Edit;

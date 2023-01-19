import React from 'react';
import { Link } from 'react-router-dom';
import laptopMan from '../../assets/laptopboy.png';
const Create = () => {
    return (
        <>
         <h2 className='createContactHeader'>ساخت مخاطب جدید</h2>
        <div className='inputDiv'>
            <div>
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
            </div>
        <div className='inputImg'>
          <img src={laptopMan} alt="a man with laptop"/>
        </div>

        </div>   
        </>
    );
}

export default Create;

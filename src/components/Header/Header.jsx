import React from 'react';
import { Link, Outlet, useSearchParams } from 'react-router-dom';
import './Header.scss';
import PropTypes from 'prop-types';


const Header = () => {
    const [searchParams,setSearchParams] = useSearchParams();
    var filter;
    return (
        <>
            <nav className='headerNav'>
                <div>
                    
                    <div>
                        <strong class="fas fa-address-book" style={{color:"#bd93f9"}}></strong>
                        <p> وب اپلیکیشن مدیریت <mark>مخاطبین</mark></p>
                    </div>
                    <Link to="/contacts/add" className='fa-solid fa-plus addBtn' type="submit">ساخت مخاطب جدید</Link>
                </div>
                <div>
                    <span id='searchSpan' className='searchIcon'>
                        <strong class="far fa-search"></strong>
                    </span>
                    <input type="text" aria-describedby='searchSpan' placeholder='مخاطب مورد نظر خود را بیابید...' className='searchInput'
                           value={searchParams.get("filter") || ""}
                           onChange={event =>{
                                filter = event.target.value;
                                if(filter){
                                    setSearchParams({filter: filter})
                                }else{
                                    setSearchParams({})
                                }
                           }}
                    />
                    
                </div>    
            </nav>   
        </>
    );
};


Header.propTypes = {

};

export var filter;
export default Header;

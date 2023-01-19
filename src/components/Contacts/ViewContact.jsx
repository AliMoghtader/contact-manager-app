import React from 'react';
import { useState,useEffect,useContext } from 'react';
import { Link,useParams } from 'react-router-dom';
import {getContact,getGroup} from "../../services/contactService";
import { ContactContext } from '../../context/contactContext';
import '../profile/profile.scss';


const ViewContact = () => {
  const {contactId} = useParams();
  const {loading,setLoading} = useContext(ContactContext)

  const [state,setState] = useState({
    contact:{},
    group:{},
  })
  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        setState({
          ...state
        });
        setLoading(true)
        const {data:contactData} = await getContact(contactId);
        const {data: groupData} = await getGroup(contactData.group);
        
        setLoading(false)
        setState({
          ...state,
          contact:contactData,
          group:groupData
        })
      }
      catch(err){
        console.log(err)
        setState({
          ...state,
        })
        setLoading(false)
      }
    };
    
    fetchData();
  },[])

    const {contact,group} = state;

    return (
        <>
        <div className='makecenter'>
        <div className='profile'>
            <img className='profileImg' src={contact.photo} alt="person image"/>
            <div className='profileInfo'>
              <div>
                <p>نام و نام خانوادگی:</p>
                <p>{contact.fullname}</p>
              </div>
              <div>
                <p>شماره موبایل:</p>
                <p>{contact.mobile}</p>
              </div>
              <div>
                <p>ایمیل:</p>
                <p>{contact.email}</p>
              </div>
              <div>
                <p>شغل:</p>
                <p>{contact.job}</p>
              </div>
              <div>
                <p>گروه:</p>
                <p>{group.name}</p>
              </div>
            </div>
        </div>   
        
        </div>
        
        <div className='backBtnContainer'>
          <Link className='backBtn' to="/contacts">بازگشت به صفحه اصلی</Link>
        </div>
        </>
    );
}

export default ViewContact;

import React from 'react';
import { useEffect,useContext,useRef } from 'react';
import { useImmer } from 'use-immer';
import {Formik,Form,Field,ErrorMessage} from "formik"
import { ContactContext } from '../../context/contactContext';
import laptopMan from '../../assets/laptopboy.png'
import "./../edit/edit.scss"
import { Link, useParams,useNavigate } from 'react-router-dom';
import { getAllGroups, getContact, getGroup, updateContact } from '../../services/contactService';
import Spinner from '../Spinner';
import { contactSchema } from '../../validations/contactValidation';

const EditContact = () => {
    
    const navigate =useNavigate()
    const {loading,setLoading,groups,contacts,setContacts,setFilteredContacts} = useContext(ContactContext)
    const {contactId} = useParams();
    const [prevContact,setPrevContact] = useImmer({
        contact:{}
    })
    const [contact, setContact] = useImmer({});
    
    useEffect(() => {
      const fetchData = async()=>{
        
        try{ 
          setPrevContact({
            ...prevContact,
          })
          setLoading(true)
          const {data:contactData} = await getContact(contactId)

          setPrevContact({
            ...prevContact,
            contact:contactData,
          })
          setLoading(false)
          setContact(contactData)
        }
        catch(err){
          console.log(err)
          setPrevContact({
            ...prevContact,
          })
          setLoading(false)
        }

      }
      fetchData();
    }, []);
    const setContactInfo = (event)=>{
      setContact({
        ...contact,
        [event.target.name]:event.target.value
        
      })
    }
    const editContactForm = async values=>{
      
      try{
        setLoading(true)
        const {status, data} = await updateContact(values,contactId)
        
        if(status === 200){
          setLoading(false)
          setPrevContact({
            ...prevContact,
            data
          })
          
          
          setContact({
            fullname:"",
            photo:"",
            mobile:"",
            email:"",
            job:"",
            group: "",
          })
          setContacts(draft=>{
            const contacsIndex = draft.findIndex((c)=>{return(c.id==parseInt(contactId))})
            draft[contacsIndex] ={...data}
          })
          setFilteredContacts(draft=>{
            const contacsIndex = draft.findIndex((c)=>{return(c.id==parseInt(contactId))})
            draft[contacsIndex] ={...data}
          })
          navigate("/contacts")
        }
      }
      catch(err){
        console.log(err)
        setLoading(false)
      }
    }
    
    return (
      <>
      {loading ? (
        
        <Spinner/>
      ):(
        <>
<h2 className='editContactHeader'>ویرایش مخاطب</h2>
      <div className='editContainer'>
      <div className='editDiv'>
      <Formik  initialValues={contact}
                      validationSchema= {contactSchema}
                      onSubmit={values=>{
                        editContactForm(values)
                      }
            }>
              {
                
                  <Form >
                    <fieldset>
                    <Field  className='formInput' name="fullname" type="text" placeholder='نام و نام خانوادگی' />
                    <ErrorMessage  name='fullname' redner={msg => <div style={{color:"red"}}>{msg}</div>}/>
                    <Field   className='formInput' name="photo"  type="text" placeholder='ادرس تصویر' />
                    <ErrorMessage redner={msg => <div style={{color:"red"}}>{msg}</div>}  name='photo'/>
                    <Field   className='formInput' name="mobile"  type="text" placeholder='شماره موبایل' />
                    <ErrorMessage redner={msg => <div style={{color:"red"}}>{msg}</div>}  name='mobile'/>
                    <Field   className='formInput' name="email"  type="text" placeholder='ادرس ایمیل' />
                    <ErrorMessage redner={msg => <div style={{color:"red"}}>{msg}</div>}  name='email'/>
                    <Field   className='formInput' name="job"  type="text" placeholder='شغل' />
                    <ErrorMessage redner={msg => <div style={{color:"red"}}>{msg}</div>}  name='job'/>
                    <Field as="select"    name="group"  className="formInput">
                      <option value="">انتخاب گروه</option>
                      {groups.length > 0 && groups.map(
                        (group) =>{
                          return(
                            <option key={group.id} value={group.id}> {group.name} </option>
                          )
                        }
                      )}
                    <ErrorMessage name='group' redner={msg => <div style={{color:"red"}}>{msg}</div>}></ErrorMessage>
                    </Field>
                    
                    </fieldset>
                    <fieldset>
                    <input type="submit" className='createContactBtn btn' value="ویرایش"></input>
                    <Link to='/contacts' className='cancelContactBtn btn'> انصراف</Link>
                    </fieldset>
                    
                    
                    
                  </Form>
                
              }
            </Formik>
        <div className='editImg'>
          <img src={prevContact.contact.photo} alt="person img"/>
        </div>
      </div>
      <div className='editImgVector'>
          <img src={laptopMan} alt="laptop man"/>
      </div>
      </div>
      </>
      )
    }
      </>
        
        
        
    );
}

export default EditContact;

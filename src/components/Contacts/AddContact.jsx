import React from 'react';
import { Link } from 'react-router-dom';
import laptopMan from '../../assets/laptopboy.png';
import "../create/create.scss"
import Spinner from "../Spinner"
import { useContext } from 'react';
import { ContactContext } from '../../context/contactContext';
import { Formik,Form,Field,ErrorMessage } from 'formik';
import {contactSchema} from "../../validations/contactValidation"
import { values } from 'lodash';
const AddContact = () => {
    const {loading,groups,createContact} = useContext(ContactContext);
    
      
    return (
        <>
        {loading? (<Spinner/>):
                  (
                    <>
                     <h2 className='createContactHeader'>ساخت مخاطب جدید</h2>
        <div className='inputDiv'>
            <div>
              {/* {
                errors?.map((error,index)=>{
                  return(<p key={index} className="text-danger">{error.message}</p>)
                })
              } */}
            <Formik  initialValues={{
                        fullname:"",
                        photo:"",
                        mobile:"",
                        email:"",
                        job:"",
                        group:""
                      }}
                      validationSchema= {contactSchema}
                      onSubmit={values=>{
                        console.log(values);
                        createContact(values)
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
                    <button type="submit" className='createContactBtn btn'>ساخت مخاطب</button>
                    <Link to='/contacts' className='cancelContactBtn btn'> انصراف</Link>
                    </fieldset>
                    
                    
                    
                  </Form>
                
              }
            </Formik>
            
            </div>
        <div className='inputImg'>
          <img src={laptopMan} alt="a man with laptop"/>
        </div>

        </div> 
                    </>

                  )
        }
        
          
        </>
    );
}

export default AddContact;

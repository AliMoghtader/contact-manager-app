import { useEffect } from "react";
import { Navigate, Route, Routes,useNavigate } from "react-router-dom";
import {confirmAlert} from "react-confirm-alert";
import { ContactContext } from "./context/contactContext";
import AddContact from "./components/Contacts/AddContact";
import ViewContact from "./components/Contacts/ViewContact";
import Contacts from "./components/Contacts/Contacts";
import EditContact from "./components/Contacts/EditContact";
import Navbar from "./components/Contacts/Navbar";
import { getAllContacts, getAllGroups,createContact,deleteContact, updateContact } from "./services/contactService";
import { CURRENTLINE,PURPLE,YELLOW,COMMENT,FOREGROUND } from "./helpers/colors";
import {useImmer} from "use-immer"
import {ToastContainer,Toast, toast} from "react-toastify"
import _ from "lodash";

import "./App.css";

const App = () => {
  const [loading, setLoading] = useImmer(false);
  const [contacts, setContacts] = useImmer([]);
  const [filteredContacts,setFilteredContacts] = useImmer([]);
  const [groups, setGroups] = useImmer([]);
  // const [errors,setErrors] = useImmer([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { data: contactsData } = await getAllContacts();
        const { data: groupsData } = await getAllGroups();

        setContacts(contactsData);
        setFilteredContacts(contactsData);
        setGroups(groupsData);

        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const createContactFrom = async (values) => {
    // event.preventDefault();
    try{
      setLoading(draft => !draft)

      // await contactSchema.validate(contact,{abortEarly:false});

      const {status, data} = await createContact(values) 

      if(status === 201){

        toast.success("مخاطب با موفقیت ساخته شد!")
        setContacts(draft =>{
          draft.push(data)
        })
        setFilteredContacts(draft =>{
          draft.push(data)
        })
        // setContact({})
        // setErrors([])
        setLoading((prevLoading) => !prevLoading)
        navigate("/contacts")
      }
    }
    catch(err){
      console.log(err.inner)
      // setErrors(err.inner)
      setLoading((prevLoading) => !prevLoading)
    }
  }
  
  
  

  const confirmDelete = (contactId,contactFullname)=>{
    confirmAlert({
      customUI:({onClose}) => {
        return(
          <div dir="rtl" style={{
            backgroundColor:CURRENTLINE,
            border:`1px solid ${PURPLE}`
          }
        }className="p-4">

          <h1 style={{color:YELLOW}}>پاک کردن مخاطب</h1>
          <p style={{color:FOREGROUND}}>
            آیا مطمعنید میخواهید مخاطب {contactFullname} را پاک کنید؟
          </p>
          <button onClick={()=>{
            removeContact(contactId);
            onClose();
          }} className="btn mx-2" style={{backgroundColor:PURPLE}}>بله</button>
          <button onClick={onClose} className="btn"style={{backgroundColor:COMMENT}}>انصراف</button>
        </div>
        )
      }
    })
  }

  const allContacts = contacts
  const removeContact = async (contactId)=>{

    const allContacts = contacts
    try{

      // const updatedContacts = contacts.filter(c=> c.id != parseInt(contactId))
      // setContacts(updatedContacts)
      // setFilteredContacts(updatedContacts)

      setContacts(draft=>
        contacts.filter(c=> c.id != parseInt(contactId))
      )
      setFilteredContacts(draft=>
        contacts.filter(c=> c.id != parseInt(contactId))
      )
      

      const {status} = await deleteContact(contactId);
      if(status != 200){
        setContacts(allContacts);
        setFilteredContacts(allContacts)
      }
    }catch(err){
      console.log(err)
      
      setContacts(allContacts);
      setFilteredContacts(allContacts)
    }
  }
  let filterTimeout;
  const contactSearch = _.debounce(query=>{
    // clearTimeout(filterTimeout)
    if(!query) return(setFilteredContacts({...contacts}))
    // filterTimeout = setTimeout(()=>{
      setFilteredContacts( draft =>  draft.filter(c=> c.fullname.includes(query)))
    // },1000)
    
  },1000)
  return (
    <ContactContext.Provider value={
      {
        loading,
        setLoading,
        setContacts,
        contacts,
        setFilteredContacts,
        groups,
        // errors,
        deleteContact:confirmDelete,
        updateContact:updateContact,
        createContact:createContactFrom,
        contactSearch,
        filteredContacts
      }
    }>
      <div className="App">
        <ToastContainer rtl={true} position="top-right" theme="colored"/>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/contacts" />} />
          <Route
            path="/contacts"
            element={<Contacts />}
          />
          <Route path="/contacts/add" element={<AddContact />} />
          <Route path="/contacts/:contactId" element={<ViewContact />} />
          <Route path="/contacts/edit/:contactId" element={<EditContact />} />
        </Routes>
      </div>
    </ContactContext.Provider>
    
  );
};

export default App;

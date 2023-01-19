  import { createContext } from "react";



  export const ContactContext = createContext({
    loading:false,
    setLoading:()=>{},
    setContacts:()=>{},
    contacts:[],
    filteredContacts:[],
    setFilteredContacts:()=>{},
    groups:[],
    // errors:[],
    onContactChange:()=>{},
    deleteContact:()=>{},
    updateContact:()=>{},
    createContact:()=>{},
    contactSearch:()=>{},

  })
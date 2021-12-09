import axios from "axios"

export const getBooks=async()=>{
    const res= await axios.get("http://127.0.0.1:5000/getbooks",{})
    const data=res.data
    return data
}

export const addBooks=async(a)=>{
    const res= await axios.post("http://127.0.0.1:5000/addbooks",a)
    const data=res.data
    return data
}

export const searchBooks=async(title,author)=>{
    if(author!=undefined && author !=""){
        var url="https://frappe.io/api/method/frappe-library?author="+author+"&title="+title
    }
    else{
        var url="https://frappe.io/api/method/frappe-library?title="+title
    }
    const res= await axios.get("http://127.0.0.1:5000/searchbooks?url="+url)
    const data=res.data.message
    return data
}


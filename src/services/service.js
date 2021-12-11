import axios from "axios"

const server="http://127.0.0.1:5000/"

export const getBooks=async()=>{
    const res= await axios.get(server+"getbooks",{})
    const data=res.data
    return data
}

export const addBooks=async(a)=>{
    const res= await axios.post(server+"addbooks",a)
    const data=res.data
    return data
}

export const searchBooks=async(title,author)=>{
    var url;
    if(author!==undefined && author !==""){
         url="https://frappe.io/api/method/frappe-library?author="+author+"&title="+title
    }
    else{
         url="https://frappe.io/api/method/frappe-library?title="+title
    }
    const res= await axios.get(server+"searchbooks?url="+url)
    const data=res.data.message
    return data
}

export const getBookById=async(bid)=>{
    const res= await axios.get(server+"getbookById"+"?bid="+bid,{})
    const data=res.data
    return data
}


export const addMembers=async(a)=>{
    const res= await axios.post(server+"addmembers",a)
    const data=res.data
    return data
}


export const getMembers=async()=>{
    const res= await axios.get(server+"getmembers",{})
    const data=res.data
    return data
}

export const getMemberById=async(mid)=>{
    const res= await axios.get(server+"getmemberById"+"?mid="+mid,{})
    const data=res.data
    return data
}

export const getDue=async(mid)=>{
    const res= await axios.get(server+"getdue"+"?mid="+mid,{})
    const data=res.data
    return data
}

export const issueBM=async(a)=>{
    const res= await axios.post(server+"issuebook",a)
    const data=res.data
    return data
}

export const allIssues=async(bid)=>{
    const res= await axios.get(server+"getbookissue"+"?bid="+bid)
    const data=res.data
    return data
}

 export const memberIssues=async(bid)=>{
    const res= await axios.get(server+"getmemberissue"+"?mid="+bid)
    const data=res.data
    return data
}

export const returnBM=async(a)=>{
    const res= await axios.post(server+"returnbook",a)
    const data=res.data
    return data
}

export const sendOTP=async(to,otp)=>{
    const res= await axios.get(server+"sendotp"+"?otp="+otp+"&to="+to)
    const data=res.data
    return data
}

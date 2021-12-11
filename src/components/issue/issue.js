import Header from "../header/Header";
import "./issue.css"
import {useState,useEffect} from "react"
import { allIssues, getBooks, getMemberById, getDue, issueBM, sendOTP} from "../../services/service";
import { Link,useNavigate } from "react-router-dom";
import * as alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

const Issue=()=>{
    const [transaction, setTransaction] = useState({})
    const [data, setData] = useState([])
    const [books, setBooks] = useState([])
    const [member, setMember] = useState([])
    const [due, setDue] = useState("")
    const [name, setName] = useState("")
    
    const  navigator = useNavigate();


    useEffect(async() => {
        init()
        load()
    }, [])

    const init=()=>{
        document.getElementById("blank").addEventListener("click",(e)=>{
                document.getElementById("blank").classList.remove("expanded")
                document.getElementById("form").classList.remove("expanded")
                clear()
        })
    }

    const close=()=>{
        document.getElementById("blank").classList.remove("expanded")
        document.getElementById("form").classList.remove("expanded")
        clear()
    }

    const clear=()=>{
         var c=document.querySelectorAll(".fin")
         document.getElementById("dsp").innerHTML=""
         for(let ele of c)
          {
                ele.value=""
          }
          setMember([])
          setDue("")
    }

    const load=async()=>{
        var res=await getBooks()
        setData(res.data)
    }

    const search=(name)=>{
            setName(name)
           if(name.replaceAll(" ","").length>0)
            {
                var v=data.filter(ele=>ele.bid.toLowerCase().startsWith(name.toLowerCase()))
                setBooks([...v])
                setTransaction({...transaction,...{"bid":name}})
            }
            else{
                setBooks([])
            }
    }

    const updateFeild=async (e,name)=>{
        var c=transaction
        c["mid"]=e.value.toUpperCase()
        var res= await getMemberById(e.value)
        setMember(res.data)
        setTransaction(c)
    }

    const issueBook=async(e)=>{
        if(due<500){
        var v=transaction
        v["time"]=new Date().getTime()
        v["date"]=new Date().toISOString()
        v["paid"]="false"
        var res=await issueBM(v)
        close()
        load()
        search(name)
        var notification = alertify.notify('Successfully issued', 'success', 3, ()=>{});
    }
    else{
        var notification = alertify.notify('Outstanding amount is above 500', 'error', 3, ()=>{});

    }
    }

    const expand=(e,b)=>{
        var t=transaction
        t["bid"]=b
        setTransaction(t)
         document.getElementById("blank").classList.add("expanded")
        document.getElementById("form").classList.add("expanded")
    }

    const getMemberDue=async(e,mid)=>{
        var res= await getDue(mid)
        setDue(res.due)
    }

    const getQuantity=async(b)=>{
        var v=b["quantity"]
        var res=await allIssues(b.bid)
        return v-res.data.length
    }

    const verify=async (e)=>{
        if(member.length>0){
            issueBook(e)
        }else{
            var notification = alertify.notify('Search member', 'error', 3, ()=>{});
        }

    }

    return (
        <>
         <Header></Header>
         <div id="mempage">
            <div className="leb">Issue Book</div>
            <div className="phead">
                <div className="pinner">
                    <input placeholder="Search book ID" onChange={(e)=>search(e.target.value)} id="sea"></input>
                </div>
            </div>
            {books.length>0&& 
                <div className="memcon">
                        {
                            books.map(ele=>{
                                return (
                                    <div className="member" onClick={(e)=>{expand(e,ele.bid)}}>
                                        <div>
                                           {ele.bid}
                                        </div>
                                        <div>{ele.name}</div>
                                        <div>Quantity : {ele.quantity}</div>
                                    </div>
                                )
                            })
                        }
                </div>
            }
         </div>
         <div id="form">
             <div className="forlab">
                 <div>Issue Book</div>
             </div>
             <div>
                 <div id="dsp"></div>
             </div>
            <div className="mfeild">
                <input placeholder="Member ID" onChange={(e)=>{updateFeild(e.target,"mid")}}  className="fin" id="ismid"></input>
            </div>
            {member.length>0&&<div id="due">Due :{due} </div>}
            {<div className="memdet">
                {member.map(ele=>{
                    return(
                        <div className="memc">
                            <div className="memn">{ele.name}</div>
                            <div>Phone : {ele.phone}</div>
                            <div><button onClick={(e)=>getMemberDue(e,ele.mid)}>Get due</button></div>
                        </div>
                    )
                })}
            </div>}
            <div className="mfeild">
                <button onClick={(e)=>{verify(e)}} className="isbut">Issue</button>
            </div>
         </div>
        <div id="blank"></div>
        </>
    )
}

export default Issue;
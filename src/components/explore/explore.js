import { useParams } from "react-router";
import Header from "../header/Header"
import {useEffect,useState} from 'react'
import { getBookById, getMemberById,memberIssues, returnBM,getDue } from "../../services/service";
import "./explore.css"

const Explore=(props)=>{
    const params=useParams()
    const [member, setmember] = useState({})
    const [issues, setissues] = useState([])
    const [issue, setissue] = useState({})
    const [book, setbook] = useState({})
    

    useEffect(() => {
       load()
       init()
    }, [])

    const load=()=>{
       
    }

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
        setbook({})
        setissue({})
    }

    const search=async(m)=>{
        var res=await getMemberById(m)
        if(res.data.length>0){
            setmember(res.data[0])
            document.getElementById("progress").classList.add("enable")
            var is=await memberIssues(res.data[0].mid)
            document.getElementById("progress").classList.remove("enable")
            setissues(is.data)
        }
    }

    const getBook=async(bid)=>{
        return await getBookById(bid)
    }

    

    const Days=(date)=>{
        var t=new Date().getTime()- new Date(date).getTime()
        var d=parseInt(t / (1000*60*60*24))
        if(d==0){
            return 1
        }
        return d
    }

    const expand=(e,b,d)=>{
         document.getElementById("blank").classList.add("expanded")
         document.getElementById("form").classList.add("expanded")
         var v=b
         setissue(b)
         v["days"]=d
         setbook(v)
    }

    const returnBook=async(e)=>{
        var res=await returnBM(issue)
        if(parseInt(res.status)>0){
            close()
            search(member.mid)
        }
    }

    return (
        <>
        <Header></Header>
         <div id="mempage">
            <div className="leb">Returns</div>
            <div className="phead">
                <div className="pinner">
                    <input placeholder="Search member ID" onChange={(e)=>search(e.target.value)} id="sea"></input>
                </div>
            </div>
            <div>
                 <div id="memnam">Member : {member.name}</div>
                 <div id="issuelab">
                     Issued books - {issues.length}
                 </div>
                 <div id="progress"></div>
                 {issues.length>0&&
                 <div className="iscon">
                     {issues.map(ele=>{
                         return(
                             <div className="issue" onClick={(e)=>{expand(e,ele,Days(ele.time))}}>
                                 <div>{ele.name}</div>
                                 <div>Days : {Days(ele.time)}</div>     
                            </div>
                         )
                     })}
                 </div>
                 }
            </div>
            </div>
            <div id="blank"></div>
             <div id="form">
                 <div id="relab">{book.name}</div>
                 <div className="labcon">
                    <div className="label">
                        <div className="retil" >Date</div>
                        <div className="redat">{new Date(issue.date).toDateString().split(" ")[1]+" "+new Date(issue.date).toDateString().split(" ").slice(2).join(",")}</div>
                    </div>
                    <div className="label">
                        <div className="retil" >Days</div>
                        <div className="redat">{book.days}</div>
                    </div>
                    <div className="label">
                        <div className="retil" >Price</div>
                        <div className="redat">{book.days*5}</div>
                    </div>
                 </div>
                 <button onClick={(e)=>returnBook(e)} className="formbut">Return</button>
             </div>
        </>
    )
}

export default Explore;
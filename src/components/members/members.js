import Header from "../header/Header";
import "./members.css"
import {useState,useEffect} from "react"
import { addMembers, getMembers, searchBooks } from "../../services/service";
import { Link } from "react-router-dom";

const Members=()=>{
    const [members, setMembers] = useState([])
    const [data, setData] = useState([])
    const [member, setMember] = useState({})
    const [all, setAll] = useState(false)

    useEffect(() => {
        init()
        load()
    }, [])

    const load=async()=>{
        var res=await getMembers()
        setMembers(res.data)
        setData(res.data)
    }



    const init=()=>{
        document.getElementById("blank").addEventListener("click",(e)=>{
                document.getElementById("blank").classList.remove("expanded")
                document.getElementById("form").classList.remove("expanded")
                clear()
        })
    }

    const clear=()=>{
         var c=document.querySelectorAll(".fin")
         document.getElementById("dsp").innerHTML=""
         for(let ele of c)
          {
                ele.value=""
          }
    }
    const Add=(e)=>{
        document.getElementById("blank").classList.add("expanded")
        document.getElementById("form").classList.add("expanded")
    }

    const Members=async(e)=>{
        var x=await addMembers(member)
        console.log(x)
        if(x.status==="True"){
             document.getElementById("dsp").innerHTML="Your member id is "+x.mid
             load()
            clear()
        }
        else{
            alert("Unable to add")
        }
    }

    const search=(name)=>{
           if(name.replaceAll(" ","").length>0)
            {
                var v=data.filter(ele=>ele.name.toLowerCase().startsWith(name.toLowerCase()))
                var d=data.filter(ele=>ele.mid.toLowerCase().startsWith(name.toLowerCase()))
                setMembers([...v,...d])
            }
            else{
                load()
            }
    }

    const Update=(e,name)=>{
        var v=member
        v[name]=e.value
        setMember(v)
    }

    const show=(e)=>{
        var v=e.target.checked
        setAll(v)
    }

    return (
        <>
         <Header></Header>
         <div id="mempage">
            <div className="leb">Members</div>
            <div className="phead">
                <div className="mpinner">
                    <input placeholder="Search" onChange={(e)=>search(e.target.value)} id="sea"></input>
                    {/* <label>
                          <input type="checkbox" onChange={(e)=>show(e)}></input>
                          <div>All</div>
                    </label> */}
                </div>
                <button onClick={(e)=>Add(e)} >Add member</button>
            </div>
            {members.length>0&& 
                <div className="memcon">
                        {
                            members.map(ele=>{
                                return (
                                    <div className="member">
                                        <div>
                                            <a href={"/explore?mid="+ele.mid}>{ele.mid}</a>
                                        </div>
                                        <div>{ele.name}</div>
                                        <div>{ele.phone}</div>
                                    </div>
                                )
                            })
                        }
                </div>
            }
         </div>
         <div id="form">
             <div className="forlab">
                 <div>Add member</div>
             </div>
             <div>
                 <div id="dsp"></div>
             </div>
            <div className="mfeild">
                <input placeholder="SSN" onChange={(e)=>{Update(e.target,"ssn")}} className="fin"></input>
            </div>
            <div className="mfeild">
                <input placeholder="Name" onChange={(e)=>{Update(e.target,"name")}} className="fin"></input>
            </div>
            <div className="mfeild">
                <input placeholder="Phone"onChange={(e)=>{Update(e.target,"phone")}} className="fin"></input>
            </div>
             <div className="mfeild">
                <input placeholder="Email"onChange={(e)=>{Update(e.target,"email")}} className="fin"></input>
            </div>
            <div className="mfeild">
                <button onClick={(e)=>{Members(e)}}>Add member</button>
            </div>
         </div>
        <div id="blank"></div>
        </>
    )
}

export default Members;
import Header from "../header/Header"
import {useState,useEffect} from 'react'
import { getAllIssues, getAllReturns, getAmount } from "../../services/service"
import "./transaction.css"
import { Chart } from "react-google-charts";

const Transaction=(e)=>{
    const [issues, setissues] = useState([])
    const [returns, setreturns] = useState([])
    const [amount, setamount] = useState([])
    const [topI,setTopI]=useState({})
    const [topA,setTopA]=useState({})

    const [chart1, setChart1] = useState([])
    const [chart2, setChart2] = useState([])

    useEffect(()=>{
        charts()
        load()
    },[])

    const load=async(e)=>{
        var res1=await getAllIssues()
        var res2=await getAllReturns()
        var res3=await getAmount()
        res1=res1.data.sort((a,b)=>{return a.count-b.count}).reverse()
        res3=res3.data.sort((a,b)=>{return a.totalAmount-b.totalAmount}).reverse()
        setissues(res1)
        setreturns(res2.data)
        setamount(res3)    
        setTopI(res1[0])  
        setTopA(res3[0])  

    }

    const charts=async()=>{
        document.getElementById("progr").classList.add("enable")
        var is=[["Name","No of books"]]
        var is2=[["Member","Amount","id"]]
        var res1=await getAllIssues()
        var res3=await getAmount()
        var res1=res1.data.sort((a,b)=>{return a.count-b.count}).reverse()
        var res3=res3.data.sort((a,b)=>{return a.totalAmount-b.totalAmount}).reverse()
        var c=0;
        for(let i of res1){
            if(c==5){
                break
            }
            is.push([i["name"],i["count"]])
            c+=1

        }
        setChart1(is)
        c=0;
        for(let i of res3){
               if(c==5){
                break
            }
            is2.push([i["name"],i["totalAmount"],i["mid"]])
            c+=1
        }
        setChart2(is2)
        document.getElementById("progr").classList.remove("enable")

    }

    return (
            <>
            <Header></Header>
            <div id="repage">
                <div id="replab">Report</div>
                <div id="progr"></div>
                <div id="subcon">
                    <div className="rele">
                        <div className="sla">Books</div>
                            <div className="top">
                                  {chart1.length>0&&  <Chart
                                        width={500}
                                        height={'350px'}
                                        chartType="BarChart"
                                        loader={<div>Loading Chart</div>}
                                        data={chart1}
                                        options={{
                                        title: 'Top books',
                                        hAxis: { title: 'No of copies', titleTextStyle: { color: '#333' } },
                                        vAxis: { minValue: 0 },
                                        }}
                                    />
                                    }
                            </div>
                        {issues.length>0&&
                            <div className="bcon">
                                {issues.map(ele=>{
                                    return (
                                        <div className="belem">
                                            <div>{ele.bid}</div>
                                            <div>{ele.name}</div>
                                            <div>{ele.count}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        }
                    </div>
                    <div className="rele">
                        <div className="sla">Members</div>
                         <div className="top">
                                {chart2.length>0&&  <Chart
                                        width={500}
                                        height={'350px'}
                                        chartType="PieChart"
                                        loader={<div>Loading Chart</div>}
                                        data={chart2}
                                        options={{
                                        title: 'Top books',
                                        hAxis: { title: 'No of copies', titleTextStyle: { color: '#333' } },
                                        vAxis: { minValue: 0 },
                                        }}
                                    />}
                         </div>
                        {amount.length>0&&
                            <div className="bcon">
                                            {amount.map(ele=>{
                                                return (
                                                    <div className="belem">
                                                        <div>{ele._id}</div>
                                                        <div>Amount : {ele.totalAmount}</div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    }
                                </div>
                        </div>
                    </div>
            </>
    )
}

export default Transaction;
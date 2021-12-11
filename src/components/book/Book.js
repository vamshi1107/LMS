import {useState,useEffect} from 'react'
import { addBooks ,getBooks,searchBooks} from '../../services/service'
import Header from '../header/Header'
import { useNavigate } from "react-router-dom"
import "./book.css"

const Book=(props)=>{
    const [book, setbook] = useState({})
    const [books, setbooks] = useState([])
    const [data, setData] = useState([])
    const  navigator = useNavigate();


    useEffect(async() => {
     load()
     init()
    }, [])

    const load=async()=>{
        var res=await getBooks()
        setData(res.data)

    }

    const init=()=>{
        document.getElementById("blank").addEventListener("click",(e)=>{
            var bs=[...document.querySelectorAll(".bele")]
            if(bs!=undefined && bs.length>0){
                for(var ele of bs)
                {
                    ele.classList.remove("expand")
                }
                document.getElementById("blank").classList.remove("expanded")
            }
        })
    }
    
    const updateFeild=(e,name)=>{
        var c=book
        c[name]=e.target.value
        setbook(c)
        filter()
    }

    const filter=()=>{
        if(Object.keys(book).indexOf("name")>-1)
        {
            if(book.name.replaceAll(" ","").length>0){
                if(Object.keys(book).indexOf("author")>-1 &&book.author.replaceAll(" ","").length>0){
                    var v=data.filter(ele=>ele.name.toLowerCase().startsWith(book.name.toLowerCase())&&ele.author.toLowerCase().startsWith(book.author.toLowerCase()))
                    setbooks(v)
                }
                else{
                    var v=data.filter(ele=>ele.name.toLowerCase().startsWith(book.name.toLowerCase()))
                    setbooks(v)
                }
            }
            else{
                setbooks([])
            }
      }
    }
    
    const Search=async(e)=>{
        filter()
    }

    const expand=(e,b)=>{
        e.classList.add("expand")
        document.getElementById("blank").classList.add("expanded")
    }


    return (
        <>
        <Header></Header>
          <div id="scon"> 
              <div className="feild" >
                  <input name="name" type="text" onChange={(e)=>updateFeild(e,"name")} onInput={(e)=>updateFeild(e,"name")} placeholder="Title"></input>
              </div>
              <div className="feild" >
                  <input name="author" type="text" onChange={(e)=>updateFeild(e,"author")} onInput={(e)=>updateFeild(e,"author")} placeholder="Author"></input>
              </div>
             
              <div className="feild">
                    <button onClick={(e)=>Search(e)} >Search</button>
              </div>
              <div className="feild">
                    <button onClick={(e)=>navigator("/import")} id="butim">Import</button>
              </div>
          </div>
          {books.length>0&&
          <div id="bcon">
              {
                  books.map(ele=>{
                      return(
                          <div className="bele" onClick={(e)=>expand(e.target,ele)}>
                              <div onClick={(e)=>expand(e.target.parentElement,ele)} className="tlb">{ele.name}</div>
                              <div className="hid">
                                  <table className="tab">
                                      <tr>
                                          <td className="tlb">Book ID</td>
                                          <td>{ele.bid}</td>
                                      </tr>
                                      <tr>
                                          <td className="tlb">Author</td>
                                          <td>{ele.author}</td>
                                      </tr>
                                      <tr>
                                          <td className="tlb">Rating</td>
                                          <td>{ele.average_rating}</td>
                                      </tr>
                                       <tr>
                                          <td className="tlb">Publisher</td>
                                          <td>{ele.publisher}</td>
                                      </tr>
                                      <tr>
                                          <td className="tlb">Language</td>
                                          <td>{ele.language_code}</td>
                                      </tr>
                                      <tr>
                                          <td className="tlb">Quantity</td>
                                          <td>{ele.quantity}</td>
                                      </tr>
                                  </table>
                              </div>
                          </div>
                      )
                  })
              }
          </div>
            }
        <div id="blank">
          </div>
        </>
    )
}

export default Book;
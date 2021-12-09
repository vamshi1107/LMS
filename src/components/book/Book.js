import {useState,useEffect} from 'react'
import { addBooks ,searchBooks} from '../../services/service'
import Header from '../header/Header'
import "./book.css"

const Book=(props)=>{
    const [book, setbook] = useState({})
    const [books, setbooks] = useState([])
    useEffect(() => {
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
    }, [])
    
    const updateFeild=(e,name)=>{
        var c=book
        c[name]=e.target.value
        setbook(c)
    }

    const Add=async(e,b)=>{
        var v={}
        v["name"]=b.title
        v["author"]=b.authors
        v["bid"]=b.bookID
        v["quantity"]=book.quantity
        var res=await addBooks(v)
        if(res=="True"){
            alert("Imported book sucessfully")
        }
        else{
            alert("Unable to import")
        }
    }
    
    const Search=async(e)=>{
        var res=await searchBooks(book.name,book.author)
        if(res==undefined){
            setbooks([])
        }
        else{
            setbooks(res)
        }
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
                  <input name="name" type="text" onChange={(e)=>updateFeild(e,"name")} placeholder="Title"></input>
              </div>
              <div className="feild" >
                  <input name="author" type="text" onChange={(e)=>updateFeild(e,"author")} placeholder="Author"></input>
              </div>
             
              <div className="feild">
                    <button onClick={(e)=>Search(e)} >Search</button>
              </div>
          </div>
          {books.length>0&&
          <div id="bcon">
              {
                  books.map(ele=>{
                      return(
                          <div className="bele" onClick={(e)=>expand(e.target,ele)}>
                              <div onClick={(e)=>expand(e.target.parentElement,ele)} className="tlb">{ele.title}</div>
                              <div className="hid">
                                  <table className="tab">
                                      <tr>
                                          <td className="tlb">Author</td>
                                          <td>{ele.authors}</td>
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
                                  </table>
                                  <div className="subele">
                                        <div className="feild" >
                                            <input type="text" name="quantity" onChange={(e)=>updateFeild(e,"quantity")} placeholder="Quantity"></input>
                                        </div>
                                        <button onClick={(e)=>Add(e,ele)}>Add</button>
                                  </div>
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
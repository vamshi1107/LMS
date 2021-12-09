import {useState,useEffect} from "react"
import { getBooks } from "../../services/service"
import Header from "../header/Header"
import "./home.css"

const Home=(props)=>{
    const [books, setBooks] = useState({})

    useEffect(async () => {
        const data=await getBooks()
        console.log(data)
    }, [])

    return (
        <>
          <Header/>
          <div id="page">
              <div id="con">
                <button id="issue" className="but">Issue</button>
                <button id="return" className="but">Return</button>
              </div>
          </div>
        </>
    )
}

export default Home;
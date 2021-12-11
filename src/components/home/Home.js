import Header from "../header/Header"
import { useNavigate } from "react-router-dom"
import "./home.css"

const Home=(props)=>{
    const  navigator = useNavigate();

   
    return (
        <>
          <Header/>
          <div id="page">
            <div>
              <lottie-player src="https://assets5.lottiefiles.com/packages/lf20_4XmSkB.json"  background="transparent"  speed="1"  style={{"width": "50vw","height": "60vh"}}  loop  autoplay></lottie-player>
            </div>
              <div id="con">
                <button id="issue"   className="but"  onClick={(e)=>navigator("/issue")}>Issue</button>
                <button id="return"  className="but"  onClick={(e)=>navigator("/explore")}>Return</button>
                <button id="books"   className="but"  onClick={(e)=>navigator("/books")}>Books</button>
                <button id="members" className="but"  onClick={(e)=>navigator("/members")}>Members</button>
                <button id="reports" className="but"  onClick={(e)=>navigator("/reports")}>Reports</button>
              </div>
          </div>
        </>
    )
}

export default Home;
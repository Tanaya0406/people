import 'bootstrap/dist/css/bootstrap.min.css';
import { FaRegBell } from "react-icons/fa"
import image from './Avatar.png'
const Navbar=()=>{
    return(
        <div className='d-flex flex-row justify-content-between align-items-center' style={{borderBottom:"1px solid  rgb(194, 190, 190)",paddingRight:"29px", borderRadius:"10px"}}>
            <h2 style={{fontWeight:"bold",color:'#6941C6',height:"3rem",marginTop:"5px",paddingLeft:"29px",marginBottom:"2px"}}>PEOPLE.CO</h2>

            <div className="d-flex flex-row align-items-center" style={{gap:"16px"}}>
            <FaRegBell size={24}/>
<img src={image} style={{height:"50px"}} />
<p style={{fontSize:"1.5rem",textAlign:"center",marginTop:"5px"}}>Tanaya Apurva</p>
            </div>
        </div>
    )
}

export default Navbar
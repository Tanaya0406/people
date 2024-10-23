import { useContext } from "react"
import { Link, Outlet, useLocation } from "react-router-dom"
import { authContext } from "../storage/store"
import imga from "./black.png"


const Sidebar =()=>{

    const{state,setState}=useContext(authContext)

    const path =useLocation()

    const activePath = path.pathname

    return(
        
<div className="d-flex flex-row py-3" style={{ height: '100px', width: '100%' }}>
<section style={{width:'15rem',marginLeft:"2rem"}}>
      <div className="d-flex flex-row align-items-center py-2">
        <img src={imga} alt="Overview" className="me-3" style={{ height: '1.4rem', width: '1.4rem' }} />
        <Link to="/user" style={{ textDecoration: 'none', color: activePath === '/user' ? '#6941C6' : 'inherit', fontWeight: activePath === '/user' ? 'bold' : 'normal' }}>
          <div>Overview</div>
        </Link>
      </div>
      <div className="d-flex flex-row align-items-center py-2">
        <img src={imga} alt="People Directory" className="me-3" style={{ height: '1.4rem', width: '1.4rem' }} />
        <Link to="/user/dashboard" style={{ textDecoration: 'none', color: activePath === '/user/dashboard' ? '#6941C6' : 'inherit', fontWeight: activePath === '/user/dashboard' ? 'bold' : 'normal' }}>
          <div>People Directory</div>
        </Link>
      </div>
      </section>

      <section style={{height:"100vh",width:"80rem"}}>
        <Outlet/>
      </section>
    </div>
    
    )
}
export default Sidebar

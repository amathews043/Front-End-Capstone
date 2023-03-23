import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"
import logo from "../auth/Stitch-Minder.png"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <nav className="navbar is-link is-spaced"> 
           <Link id="brand" className="navbar-brand content is-large" to="/"> 
           <img className="logo" src={logo}/>
            </Link>
            <div className="navbar-start">
            <Link className="navbar-item" id="white" to="/currentProjects">
                Current Projects
             </Link>
             <Link className="navbar-item" id="white" to="/completeProjects">
                Complete Projects
             </Link>
             <Link className="navbar-item" id="white" to="/form"> 
             Start a New Project
            </Link>
            <Link className="navbar-item" id="white" to="/tutorial"> 
             Tutorials
            </Link>
             </div>
            <div className="navbar-end navbar__logout">
                <a className="navbar__link button is-light" to="" onClick={() => {
                    localStorage.removeItem("app_user")
                    navigate("/", {replace: true})
                }}> Logout
                 </a>
            </div> 
        </nav>
    )
}
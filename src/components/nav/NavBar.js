import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"
import logo from "../auth/Stitch-Minder.png"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <nav className="navbar is-link is-spaced"> 
           <Link id="brand" className="navbar-brand " to="/"> 
           <img className="image is-2by logo" src={logo} alt="logo"/>
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
                <button className="navbar__link button is-light" to="" onClick={() => {
                    localStorage.removeItem("app_user")
                    navigate("/", {replace: true})
                }}> Logout
                 </button>
            </div> 
        </nav>
    )
}
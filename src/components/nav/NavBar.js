import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <nav className="navbar is-link is-spaced"> 
           <Link className="navbar__item navbar-brand content is-large" to="/"> 
                Crochet Counter
            </Link>
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

{/* <li className="navbar__item active">
<Link className="navbar__link" to="/tickets">Locations</Link>
</li>
<li className="navbar__item active">
<Link className="navbar__link" to="/tickets/products">Products</Link>
</li>
<li className="navbar__item active">
<Link className="navbar__link" to="/orders">My Orders</Link>
</li> */}
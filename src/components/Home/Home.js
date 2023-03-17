import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "./Home.css"


export const Home = () => {

	return (
        <section> 
            <h3 className="projectListHeader"> Not Sure What to Make?  </h3>
            <h4 className="projectListHeader">Try One of these Projects</h4>


            <div className="buttonDiv">
            <button className="button is-link buttonStart"><Link className="link" to={'/Form'}> Start a New Project</Link></button>
            </div>
            
        </section>
    )
}

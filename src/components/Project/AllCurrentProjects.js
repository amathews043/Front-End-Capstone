import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "./ProjectPage.css"


export const AllCurrentProjects = () => {
    const [projects, setProjects] = useState([])
    const [currentProjects, setCurrentProjects] = useState([])
    const [completeProjects, setCompleteProjects] = useState([])

    const localAppUser = localStorage.getItem("app_user")
    const appUserObject = JSON.parse(localAppUser)

    useEffect (
        () => {
            fetch(`http://localhost:8088/projects?userId=${appUserObject.id}`)
            .then(res => res.json())
            .then((projectArray) => {
                setProjects(projectArray)
            })
        },  
        []
    )


	return (
        <section> 
            <div className="columns is-centered"> 
                <div className="column is-half">
                <h3 id="currentProjects" className="columnHeader">Current Projects</h3>
                <ul>
                    
                {
                    projects.map((project) => {
                        if(!project?.completeDate){
                            return <div className="card" key={project.id}>
                                 <div className="card-image">
                                    <figure className="image is-4by">
                                        <img className="image" src={project.photoURL} alt="Project image"/>
                                    </figure>
                                </div>
                                <div className="card-content">
                                <div className="media-content">
                                    <Link to={`/projects/${project.id}`} target="_blank" rel="noreferrer noopener"> <p className="title is-4">{project.name}</p> </Link>
                                    <Link to={project.patternURL} target="_blank" rel="noreferrer noopener"> Link to Pattern </Link> 
                                </div>

                                </div>
                            </div>
                        }
                    })
                }

                </ul> 
                </div>
            </div>
        </section>


    )
}


import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "./ProjectPage.css"


export const Projects = () => {
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
            <div className="current-list columns"> 
                <div className="column">
                    <h3 className="columnHeader">Current Projects</h3>
                    <ul>
                    {
                        projects.map((project) => {
                            if(!project?.completeDate){
                                return <li className="listProject" key={project.id}><Link to={`/projects/${project.id}`} key={project.id}> 
                                {project.name}
                            </Link> </li>
                            } else {
                                return ""
                            }
                        })
                    }
                    </ul>
                </div>
                <div className="complete-list column">
                    <h3 className="columnHeader"> Complete Projects </h3>
                    <ul>
                    {
                        projects.map((project) => {
                            if(project?.completeDate){
                            return <li> <Link to={`/projects/${project.id}`} key={project.id}> 
                            {project.name}
                        </Link> </li>
                        } else return ""
                        })
                    }
                    </ul>
                </div>
             </div>
            <div className="buttonDiv">
            <button className="button is-link buttonStart"><Link className="link" to={'/Form'}> Start a New Project</Link></button>
            </div>
        </section>
    )
}

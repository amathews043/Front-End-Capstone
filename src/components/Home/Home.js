import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "./Home.css"


export const Home = () => {
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
                    <h3>Current Projects</h3>
                    <ul>
                    {
                        projects.map((project) => {
                            if(!project?.completedDate){
                                return <li key={project.id}><Link to={`/projects/${project.id}`} key={project.id}> 
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
                    <h3> Complete Projects </h3>
                    <ul>
                    {
                        projects.map((project) => {
                            if(project?.completedDate){
                            return <li> <Link to={`/projects/${project.id}`} key={project.id}> 
                            {project.name}
                        </Link> </li>
                        } else return ""
                        })
                    }
                    </ul>
                </div>
             </div>

             <button className="newProjectButton"><Link to={'/Form'}> Start a New Project</Link></button>
        </section>
    )
}

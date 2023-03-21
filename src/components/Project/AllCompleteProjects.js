import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import UploadWidget from "../UploadWidget/UploadWidget"
import "./ProjectPage.css"

export const AllCompleteProjects = () => {
    const [projects, setProjects] = useState([])
    const [photos, setPhotos] = useState([])
    const navigate = useNavigate()

    const localAppUser = localStorage.getItem("app_user")
    const appUserObject = JSON.parse(localAppUser)

    const getAllPhotos = () => {
        fetch(`http://localhost:8088/productPhotos`)
        .then(res => res.json())
        .then((photoArray) => {
            setPhotos(photoArray)
        })
    }
    
    useEffect(() => {
        getAllPhotos()
        }, 
        [])

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
                <h3 id="completeProjects" className="columnHeader">Complete Projects</h3>
                <ul>
                    
                {
                    projects.map((project) => {
                        if(project?.completeDate){
                            const foundPhoto = photos.find((photo) => photo.projectId === project.id )
                            if(foundPhoto){
                            return <div id="completeIMGCard" className="card" key={project.id}>
                                 <div className="card-image">
                                    <figure className="image is-4by5">
                                        <img onClick={() => navigate(`/projects/${project.id}`)} className="image" src={foundPhoto?.photoURL} alt="Project image"/>
                                    </figure>
                                </div>
                                <div className="card-content">
                                <div className="media-content">
                                    <Link to={`/projects/${project.id}`}> <p className="title is-4">{project.name}</p> </Link>
                                    <Link to={project.patternURL} target="_blank" rel="noreferrer noopener"> Link to Pattern </Link> 
                                </div>

                                </div>
                            </div>
                            } else {
                                return <div id="completeProjectCard" className="card" key={project.id}> 
                                    <UploadWidget projectId={project.id}/>
                                    <Link to={`/projects/${project.id}`}> <p className="title is-4">{project.name}</p> </Link>
                                    <Link to={project.patternURL} target="_blank" rel="noreferrer noopener"> Link to Pattern </Link> 
                                </div>
                            }
                        }
                    })
                }

                </ul> 
                </div>
            </div>
        </section>


    )
}
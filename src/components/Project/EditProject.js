import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const EditProject = () => {
    const navigate = useNavigate()
    const {projectId} = useParams()
    const [levels, setLevels] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    const [project, updateProject] = useState({
        name: "", 
        patternURL: "", 
        photoURL: "",
        levelId: 0, 
        startDate: null, 
        completeDate: null, 
        userId: null
    })

    useEffect (() => {
        fetch(`${process.env.REACT_APP_API_HOST}/projects/${projectId}`)
        .then(res => res.json())
        .then((project) => {
            updateProject(project)
        })
    }, 
    [projectId])

    useEffect(
        () => {
            fetch(`${process.env.REACT_APP_API_HOST}/levels`)
            .then(res =>  res.json())
            .then(levelsArray => {
                setLevels(levelsArray)
            })
        }, 
        []
    )

    const validateForm = () => {
        if (!project.name || !project.levelId){
            return false
        }
        return true
    }


    const  projectSaveButtonClick = (event) => {
        event.preventDefault()
        if(!validateForm()){
            setErrorMessage("Please complete required fields")
            return
        }

        const projectToSendToAPI = {
            name: project.name, 
            patternURL: project.patternURL,
            photoURL: project.photoURL, 
            levelId: project.levelId,  
        }
        return fetch (`${process.env.REACT_APP_API_HOST}/projects/${projectId}`, {
            method: "PATCH", 
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(projectToSendToAPI)
        })
            .then(res => res.json())
            .then(() => {
                navigate(`/projects/${projectId}`)
            })
    }

    return (
        <form className="main"> 
            <h2 className="newProject">Edit Project Details</h2>
            <p className="help is-danger">{errorMessage}</p>
            <fieldset>
            <div className="form-group field"> 
            <label className="label" htmlFor="name">Project Name:*</label>
                <div className="control">
                <input
                
                type="text"
                className="form-control input"
                placeholder="Project Name"
                value={project.name}
                onChange={
                    (evt) => {
                        const copy = {...project}
                        copy.name = evt.target.value 
                        updateProject(copy)
                    }
                } />
                </div>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group field"> 
            <label className="label" htmlFor="projectURL">Project URL:</label>
                <div className="control">
                <input
                
                type="text"
                className="form-control input"
                placeholder="optional"
                value={project.patternURL}
                onChange={
                    (evt) => {
                        const copy = {...project}
                        copy.patternURL = evt.target.value 
                        updateProject(copy)
                    }
                } />
                </div>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group field"> 
            <label className="label" htmlFor="photoURL">Photo URL:</label>
                <div className="control">
                <input
                
                type="text"
                className="form-control input"
                placeholder="optional inspiration picture"
                value={project.photoURL}
                onChange={
                    (evt) => {
                        const copy = {...project}
                        copy.photoURL = evt.target.value 
                        updateProject(copy)
                    }
                } />
                </div>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group field"> 
            <label className="label"htmlFor="location">Level:* </label>
            <div className="control">
                <div className="select">
                <select value={project.levelId} onChange={
                    (evt) => {
                        const copy = {...project}
                        copy.levelId = parseInt(evt.target.value)
                        updateProject(copy)
                    }
                }> 
                <option value="0"> Please Choose a Level</option>
                {
                levels.map((level) => {
                   return <option value={level.id} > {level.level}</option>
                })

                }
                
                </select>
                
                </div>

            </div>
            </div>
        </fieldset>
        <button className="button is-link"
                onClick={(clickEvent) => {
                    projectSaveButtonClick(clickEvent)
                }
            }>
                Submit Edit
            </button>
        </form>
    )

}
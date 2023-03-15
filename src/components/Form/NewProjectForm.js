import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./form.css"

export const NewProjectForm = () => {
    const navigate = useNavigate()
    const localAppUser = localStorage.getItem("app_user")
    const appUserObject = JSON.parse(localAppUser)
    const [levels, setLevels] = useState([])
    const [projects, setProjects] = useState([])
    const [newProjectId, setProjectId] = useState(null)
    const [errorMessage, setErrorMessage] = useState("")
    const [project, updateProject] = useState({
        name: "", 
        patternURL: "", 
        levelId: 0, 
        startDate: null, 
        completeDate: null, 
        userId: null
    })

    

    useEffect(
        () => {
            fetch('http://localhost:8088/levels')
            .then(res =>  res.json())
            .then(levelsArray => {
                setLevels(levelsArray)
            })
        }, 
        []
    )

        useEffect(
        () => {
            fetch('http://localhost:8088/projects')
            .then((res) => res.json())
            .then((projectsArray) => {
                setProjects(projectsArray)
                setProjectId(projectsArray.length + 1)
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

        sectionSaveButtonClick()

        const projectToSendToAPI = {
            name: project.name, 
            patternURL: project.patternURL, 
            levelId: project.levelId, 
            startDate: project.startDate, 
            completeDate: project.completeDate, 
            userId: appUserObject.id 
        }
        return fetch ('http://localhost:8088/projects', {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(projectToSendToAPI)
        })
            .then(res => res.json())
            .then(() => {
                navigate("/")
            })
    }

    const  sectionSaveButtonClick = () => {

        const projectToSendToAPI = {
            projectId: newProjectId, 
            count:0
        }
        return fetch ('http://localhost:8088/sections', {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(projectToSendToAPI)
        })
            .then(res => res.json())
            .then()
    }

    return (
        <form className="main"> 
            <h2 className="newProject">Start a New Project</h2>
            <p className="help is-danger">{errorMessage}</p>
            <fieldset>
            <div className="form-group field"> 
            <label className="label" htmlFor="name">Project Name:*</label>
                <div className="control">
                <input
                required autoFocus
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
                autoFocus
                type="text"
                className="form-control input"
                placeholder="optional"
                value={project.projectURL}
                onChange={
                    (evt) => {
                        const copy = {...project}
                        copy.projectURL = evt.target.value 
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
        <fieldset>
            <div className="form-group field"> 
            <label className="label" htmlFor="startDate">Start Date:*</label>
                <div className="control"> 
                <input
                required autoFocus
                type="date"
                className="form-control"
                placeholder="Start Date"
                value={project.startDate}
                onChange={
                    (evt) => {
                        const copy = {...project}
                        copy.startDate = evt.target.value
                        updateProject(copy)
                    }
                } />
                </div>
            </div>
        </fieldset>
        <button className="button is-link"
                onClick={(clickEvent) => {
                    projectSaveButtonClick(clickEvent)
                }
            }>
                Add New Project
            </button>
        </form>
    )
}
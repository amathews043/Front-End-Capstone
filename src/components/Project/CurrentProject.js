import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AddANote } from "./AddANote"
import { Section } from "./Section"
import { EditNote } from "./EditNote"

export const CurrentProjectPage = ({getParentProject}) => {
    const {projectId} = useParams()
    const [project, setProject] = useState([])
    const [notes, setNotes] = useState([])
    const [sections, setSections ] = useState([])
    const navigate = useNavigate()

    const getCurrentProject = () => {
        fetch(`${process.env.REACT_APP_API_HOST}/projects?id=${projectId}&_expand=level`)
            .then(res => res.json())
            .then((data) => {
                const singleProject= data[0]
                setProject(singleProject)
            })
    }

    const getAllNotes = () => {
        fetch(`${process.env.REACT_APP_API_HOST}/notes?projectId=${projectId}`)
        .then(res => res.json())
        .then((data) => {
            setNotes(data)
        })
    }

    const getAllSections = () => {
        fetch (`${process.env.REACT_APP_API_HOST}/sections?_expand=project&projectId=${projectId}`)
        .then(res => res.json())
        .then((sectionsArray) => {
            setSections(sectionsArray)
        })
    }

    useEffect( () => {
        getAllSections()
    }, 
    [projectId]
    )

    useEffect (
        () => {
        getCurrentProject()
        },  
        [projectId]
    )

    useEffect (
        () => {
        getAllNotes()
        },  
        [projectId]
    )

    const deleteSections = () => {
        fetch(`${process.env.REACT_APP_API_HOST}/sections?projectId=${projectId}`, {
                    method: "DELETE"
            })
            .then ()
    }

    const deleteProject = () => {
        deleteSections()

        fetch(`${process.env.REACT_APP_API_HOST}/projects/${projectId}`, {
                    method: "DELETE"
            })
            .then (()=> {
                navigate("/")
            })
    }

    const completeProject = () => {
        const completeProjectDate = {
            completeDate: new Date().toLocaleDateString()
        }

        fetch(`${process.env.REACT_APP_API_HOST}/projects/${projectId}`, {
            method: "PATCH", 
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(completeProjectDate)
        })
        .then(() => {
            getParentProject()
        })
        .catch(error => console.error(error))
    }


    return <div className="mainDiv"> 
            <h1 className="project-name"> 
                {project.name}
            </h1>
            {
        project.patternURL 
        ? <> 
            <button className="button is-link"> <Link className ="link" to={project.patternURL} target="_blank" rel="noreferrer noopener">Link to pattern </Link>  </button>
        </> 
        : <>
  
        </>

        } 
             <aside className="dates"> 
             <p>Date Started: {project.startDate}</p>
             <p>Level: {project?.level?.level} </p>
             </aside>
        {
            notes.map((note) => {
                return <div className="project-notes" key={note.id}> 
                    <header> Date: {note.date} </header>
                    <p> {note.note} </p>
                    <button id="edit-button" className="button is-link"><Link className="link" to={`/editNote/${note.id}`}> Edit Note </Link> </button>
                    <button onClick={() => {
            fetch(`${process.env.REACT_APP_API_HOST}/notes/${note.id}`, {
                    method: "DELETE"
            })
            .then (()=> {
                getAllNotes()
            })
            }} id="delete-button" className="button is-link"> Delete Note </button>
                </div>
            })
        }
            <div className="linkButtons">
                <button className="button is-link"> <Link className="link" to={`/newNote/${projectId}`}> Add a new note </Link> </button>
            </div>
        {
            project.photoURL 
            ? <> 
                <h3 className="inspHeader">Inspiration Picture</h3>
               <img className="img" src={project.photoURL} alt="inspiration photo"/> 
            </> 
            : <>
            
            </>
        }

    

        
            <div> 
            <button className="button is-link"> <Link className="link" to={`/newSection/${projectId}`}> Add a new section </Link></button>
            </div>
        
        {
            sections.map((section) => 
                <Section 
                id={section.id}
                count={section.count}
                name={section.name}
                />
            )
        }
        <div className="buttonDiv"> 
            <button className="button is-link" onClick={completeProject}> Complete Project </button>
            <button className="button is-link" onClick={() => navigate(`/edit/${projectId}`)}> Edit Project Details </button>
            <button className="button is-link" onClick={deleteProject}> Delete Project </button>
        </div>
        
    </div>

}
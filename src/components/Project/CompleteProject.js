import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AddANote } from "./AddANote"

export const CompleteProjectPage = () => {
    const {projectId} = useParams()
    const [project, setProject] = useState([])
    const [notes, setNotes] = useState([])
    const navigate = useNavigate()

    const getAllProducts = () => {
        fetch(`http://localhost:8088/projects?id=${projectId}&_expand=level`)
            .then(res => res.json())
            .then((data) => {
                const singleProject= data[0]
                setProject(singleProject)
            })
    }

    const getAllNotes = () => {
        fetch(`http://localhost:8088/notes?projectId=${projectId}`)
        .then(res => res.json())
        .then((data) => {
            setNotes(data)
        })
    }

    useEffect (
        () => {
        getAllProducts()
        },  
        [projectId]
    )

    useEffect (
        () => {
        getAllNotes()
        },  
        [projectId]
    )

    const deleteProject = () => {
        fetch(`http://localhost:8088/projects/${projectId}`, {
                    method: "DELETE"
            })
            .then (()=> {
                navigate("/")
            })
    }

    return <div className="mainDiv"> 
            <h1 className="project-name"> 
                {project.name}
            </h1>
            {
            project.patternURL 
            ? <> 
                <button className="linkPattern"> <Link className ="link" to={project.patternURL} target="_blank" rel="noreferrer noopener"> Link to pattern </Link>  </button>
            </> 
            : <>
  
        </>

        } 
             <aside className="dates"> 
             <p>Date Started: {project.startDate}</p> 
             <p>Date Complete: {project.completedDate} </p> 
             </aside>
        {
            notes.map((note) => {
                return <div className="project-notes" key={note.id}> 
                    <header> Date: {note.date} </header>
                    <p> {note.note} </p>
                    <button><Link to={`/editNote/${note.id}`}> Edit </Link> </button>
                    <button onClick={() => {
                fetch(`http://localhost:8088/notes/${note.id}`, {
                    method: "DELETE"
            })
            .then (()=> {
                getAllNotes()
            })
            }} className="ticket_delete"> Delete </button>
                </div>
            })
        }
        <div className="linkButtons">
                <button className="linkAddNote"> <Link to={`/newNote/${projectId}`}> Add a new note </Link> </button>
    
            </div>

        <div className="buttonDiv"> 
            <button className="deleteButton" onClick={deleteProject}> Delete Project </button>
        </div>

        
        
    </div>

}
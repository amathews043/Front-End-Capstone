import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AddANote } from "./AddANote"
import UploadWidget from "../UploadWidget/UploadWidget"

export const CompleteProjectPage = () => {
    const {projectId} = useParams()
    const [project, setProject] = useState([])
    const [photos, setPhotos] = useState([])
    const [sections, setSections] = useState([])
    const [notes, setNotes] = useState([])
    const navigate = useNavigate()


    const getAllPhotos = () => {
        fetch(`${process.env.REACT_APP_API_HOST}/productPhotos?projectId=${projectId}`)
        .then(res => res.json())
        .then((photoArray) => {
            setPhotos(photoArray)
        })
    }

    const getAllProducts = () => {
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

    useEffect(() => {
        getAllPhotos()
        }, 
        [projectId])

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

    useEffect (
        () => {
            getAllSections()
        }, 
        [projectId]
    )

    const deleteProject = () => {
        fetch(`${process.env.REACT_APP_API_HOST}/projects/${projectId}`, {
                    method: "DELETE"
            })
            .then (()=> {
                navigate("/")
            })
    }


    const total = sections.reduce((partialSum, section) => partialSum + section.count, 0);
    


    return <div className="mainDiv"> 
            <h1 className="project-name"> 
                {project.name}
            </h1>
            {
            project.patternURL 
            ? <> 
                <button className="button is-link"> <Link className ="link" to={project.patternURL} target="_blank" rel="noreferrer noopener"> Link to pattern </Link>  </button>
            </> 
            : <>
  
        </>

        } 
             <aside className="dates"> 
             <p>Date Started: {project.startDate}</p> 
             <p>Date Complete: {project.completeDate} </p> 
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
            }} className="button is-link" id="delete-button"> Delete Note </button>
                </div>
            })
        }
        <div className="linkButtons">
            <button className="button is-link"> <Link className="link" to={`/newNote/${projectId}`}> Add a new note </Link> </button>
        </div>

        <div id="rows"> 
        <h2> You made <strong id="num">{total}</strong> rows in this project</h2>
        </div>

        <UploadWidget projectId={projectId}/>

        {
            photos[0]
            ? <>
            <h3 className="inspHeader">Finished Product Picture</h3>
            <ul>
            {photos.map((photo) => { 
                return <div>
                <li><img className="img" src={photo.photoURL}/> 
                <div>
                <button className="button is-link" onClick={() => {
                            fetch(`${process.env.REACT_APP_API_HOST}/productPhotos/${photo.id}`, {
                                method: "DELETE"
                        })
                        .then (()=> {
                            getAllPhotos()
                        })
                }} >Delete Image</button> 
                </div>
                </li>
                </div>
            })}
            </ul>
            </> : <>
            </>


        }

        <div className="buttonDiv"> 
            <button className="button is-link" onClick={deleteProject}> Delete Project </button>
        </div>
         
        
        
    </div>

}
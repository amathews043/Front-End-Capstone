import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const AddANote = () => {
    const navigate = useNavigate()
    const {projectId} = useParams()
    let num = parseInt(projectId)
    const [note, setNewNote] = useState({
        note: "", 
        projectId: num, 
        date: new Date().toLocaleDateString()
    })

    const handleSubmit = (evt) => {
        evt.preventDefault()

        const noteToSendToAPI = {
            note: note.note, 
            projectId: note.projectId,
            date: note.date

        }

        return fetch (`${process.env.REACT_APP_API_HOST}/notes`, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(noteToSendToAPI)
        })
            .then(res => res.json())
            .then(() => {
                setNewNote({
                note: "",
                projectId: projectId,
                date: new Date().toLocaleDateString()
            });
            })
            .then(() => {
                navigate(`/projects/${projectId}`)
            })
    }
   

    return  <div className="newNote"> 
        <div> <label htmlFor="note"> Add a New Note</label> </div>
        <textarea rows="10" cols ="40" type="text" name="note" value={note.note || ''}
        onChange={
                    (evt) => {
                        const copy = {...note}
                        copy.note = evt.target.value 
                        setNewNote(copy)
                    }}> 
                    </textarea>
        <div>
        <button className="button is-link" onClick={(clickEvt) => {
            handleSubmit(clickEvt)}
            } >Submit</button>
        </div>
    </div>
}

import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const EditNote = () => {
    const {noteId} = useParams()
    const [note, setNote] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_HOST}/notes/${noteId}`)
        .then(res => res.json())
        .then((data) => {
            setNote(data)
        })
    },
    [])

    const handleSubmit = (evt) => {
        evt.preventDefault()

        const noteToSendToAPI = {
            note: note.note, 
            date: new Date().toLocaleDateString()

        }

        return fetch (`${process.env.REACT_APP_API_HOST}/notes/${noteId}`, {
            method: "PATCH", 
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(noteToSendToAPI)
        })
            .then(res => res.json())
            .then(() => {
                setNote({
                note: "",
                dateEditted: new Date().toLocaleDateString()
            });
            })
            .then(() => {
                navigate(`/projects/${note.projectId}`)
            })
    }

    return  <div className="editNote"> 
        <div> <label htmlFor="note"> Edit Note</label> </div>
        <textarea rows="10" cols ="40" type="text" name="note" value={note.note}
        onChange={
                    (evt) => {
                        const copy = {...note}
                        copy.note = evt.target.value 
                        setNote(copy)
                    }}> 
                    </textarea>
        <div>
        <button onClick={(clickEvt) => {
    handleSubmit(clickEvt)}
    }>Submit</button>
        </div>
    </div>
}


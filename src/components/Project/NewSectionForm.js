import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"


export const NewSectionForm = () => {
    const {projectId} = useParams()
    const navigate = useNavigate()
    const [newSection, setNewSection] = useState({
        projectId: projectId, 
        count: 0, 
        name: "", 
    })

    const  sectionSaveButtonClick = (event) => {
        event.preventDefault()

        const sectionToSendToAPI = {
            name: newSection.name, 
            count: parseInt(newSection.count),
            projectId: parseInt(projectId)
        }
        return fetch (`${process.env.REACT_APP_API_HOST}/sections`, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(sectionToSendToAPI)
        })
            .then(res => res.json())
            .then(() => {
                navigate(`/projects/${projectId}`)
            })
    }

    return(
        <form className="main"> 
            <h2 className="newProject">Add a New Section</h2>
            <fieldset>
            <div className="form-group field"> 
            <label className="label" htmlFor="name">Section Name:*</label>
                <div className="control">
                <input
                required autoFocus
                type="text"
                className="form-control input"
                placeholder="Section Name"
                value={newSection.name}
                onChange={
                    (evt) => {
                        const copy = {...newSection}
                        copy.name = evt.target.value 
                        setNewSection(copy)
                    }
                } />
                </div>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group field"> 
            <label className="label" htmlFor="count">Count:</label>
                <div className="control">
                <input
                required autoFocus
                type="text"
                className="form-control input"
                placeholder="Count"
                value={newSection.count}
                onChange={
                    (evt) => {
                        const copy = {...newSection}
                        copy.count = evt.target.value 
                        setNewSection(copy)
                    }
                } />
                </div>
            </div>
        </fieldset>
        <button className="button is-link"
                onClick={(clickEvent) => {
                    sectionSaveButtonClick(clickEvent)
                }
            }>
                Add New Section
            </button>
    </form>
    )
}
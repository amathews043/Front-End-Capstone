import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Home.css"


export const Home = () => {
    const [examples, setExamples] = useState([])
    const [sections, setSections ] = useState([])
    const navigate = useNavigate()
    const localAppUser = localStorage.getItem("app_user")
    const appUserObject = JSON.parse(localAppUser)
    useEffect(() => {
        fetch(`http://localhost:8088/examples?_expand=level`)
        .then(res => res.json())
        .then((data) => {
            setExamples(data)
        })
    }, 
    [])

    const getAllSections = () => {
        fetch (`http://localhost:8088/sections?_expand=project`)
        .then(res => res.json())
        .then((sectionsArray) => {
            setSections(sectionsArray)
        })
    }

    useEffect (
        () => {
            getAllSections()
        }, 
        []
    )

    const total = sections.reduce((partialSum, section) => partialSum + section.count, 0);

    const  sectionSaveButtonClick = (projectId, example) => {
        const sections = example.exampleSections

       sections.map((section) => {
        const sectionToSendToAPI = {
            projectId: projectId, 
            count: 0, 
            name: section
        }
        return fetch ('http://localhost:8088/sections', {
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
        
       })
    }

    const startProjectButton = (example) => {
        
        const projectToSendToAPI = {
            name: example.name, 
            patternURL: example.patternURL,
            photoURL: example.photoURL, 
            levelId: example.levelId, 
            startDate: new Date().toLocaleDateString(), 
            completeDate: null,
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
            .then((project) => {
                sectionSaveButtonClick(project.id, example)
            })
    }

	return (
        <section> 
            <div id="rowsAndCoutning"> 
                <h2> <strong id="total">{total}</strong> Rows and Counting! </h2>
            </div>
            <h3 id="projectListHeader"> Not Sure What to Make?  </h3>
            <h4 id="projectListHeader">Try One of These Projects</h4>
            <div className="columns is-centered">
                <div className="column is-half">
            {
                examples.map((example) => {
                    return <div className="card" key={example.id}>
                    <div className="card-image">
                        <figure className="image is-4by">
                            <img className="image" src={example.photoURL} alt="Project image"/>
                        </figure>
                    </div>
                     <div className="card-content">
                        <div className="media">
                            <div className="media-left">
                            </div>
                            <div className="media-content">
                                <Link to={example.patternURL} target="_blank" rel="noreferrer noopener"> <p className="title is-4">{example.name}</p> </Link>
                                <p className="subtitle is-6">Pattern by {example.author}</p>
                                <Link to={example.patternURL} target="_blank" rel="noreferrer noopener"> Link to Pattern </Link> 
                                <p>Level: {example?.level?.level}</p>
                            </div>
                            
                        </div>
    
                        <div className="content">
                        {example.description}
                        </div>
                        <div>
                            <button onClick={() => startProjectButton(example)} className="button is-link"> Start Project</button>
                        </div>

                    </div>
                </div>
                })
            }
            
            </div>
            </div>

        


            <div className="buttonDiv">
            <button className="button is-link buttonStart"><Link className="link" to={'/Form'}> Start a New Project</Link></button>
            </div>

            
            
        </section>
    )
}

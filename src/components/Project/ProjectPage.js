import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "./ProjectPage.css"
import {fill} from "@cloudinary/url-gen/actions/resize";
import {CloudinaryImage} from '@cloudinary/url-gen';
import {AdvancedImage} from '@cloudinary/react';
import { CompleteProjectPage } from "./CompleteProject";
import { CurrentProjectPage } from "./CurrentProject";


export const ProjectPage = () => {
    const {projectId} = useParams()
    const [project, setProject] = useState([])

    const getCurrentProject = () => {
        fetch(`${process.env.REACT_APP_API_HOST}/projects?id=${projectId}&_expand=level`)
            .then(res => res.json())
            .then((data) => {
                const singleProject= data[0]
                setProject(singleProject)
            })
    }

    useEffect (
        getCurrentProject,
        [projectId]
    )

    
    if(project.completeDate){
        return <CompleteProjectPage/>
    } else {
        return <CurrentProjectPage
            getParentProject={getCurrentProject}
        />
    }
    
}
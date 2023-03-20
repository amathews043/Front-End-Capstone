import { Route, Routes, Outlet } from "react-router-dom"
import { useState, useEffect } from "react"
import { Home } from "../Home/Home"
import { ProjectPage } from"../Project/ProjectPage"
import { AddANote } from "../Project/AddANote"
import { EditNote } from "../Project/EditNote"
import { NewProjectForm } from "../Form/NewProjectForm"
import { NewSectionForm } from "../Project/NewSectionForm"
import { EditProject } from "../Project/EditProject"
import { Projects } from "../Project/Projects"


export const ApplicationViews = () => {
   
	return (
	<Routes> 
				<Route path="/" element={
					<>
                   <Home/>
					<Outlet />
					</>

				}>

					
				</Route>

                <Route path="projects/:projectId" element={ <ProjectPage/> } />
				<Route path="newNote/:projectId" element={ <AddANote/> } />
				<Route path="editNote/:noteId" element={ <EditNote/> } />
				<Route path="form" element={ <NewProjectForm/> } />
				<Route path="newSection/:projectId" element={ <NewSectionForm/> } />
				<Route path="edit/:projectId" element={ <EditProject/> } />
				<Route path="projects" element={ <Projects/> } />
		</Routes>
	)
		
	}

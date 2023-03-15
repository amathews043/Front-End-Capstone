import { Route, Routes, Outlet } from "react-router-dom"
import { useState, useEffect } from "react"
import { Home } from "../Home/Home"
import { ProjectPage } from"../Project/ProjectPage"
import { AddANote } from "../Project/AddANote"
import { EditNote } from "../Project/EditNote"
import { NewProjectForm } from "../Form/NewProjectForm"


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
		</Routes>
	)
		
	}

    // <Route path="tickets" element={ <LocationsList/> } />
    // <Route path="tickets/products" element={ <KandyContainer/> } />
    // <Route path="orders" element={ <Orders/> } />
[Application Overview](#application-overview)
- [Application Overview](#application-overview)
- [Features](#features)
- [Planning](#planning)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Home Page Preview](#home-page-preview)
- [Current Project List Preview](#current-project-list-preview)
- [Complete Project List Preview](#complete-project-list-preview)
- [Acknowledgements](#acknowledgements)


# Application Overview 
I love to crochet but it is easy to forget what row of my pattern I am on when I return to my work. I designed this app to track projects, keep a record of where I can find the pattern, and most importantly, help me track which row of the pattern I should start with when I return to my project. 

# Features 
* Users can add projects to their profile using the "Start a new project form" or use one of the examples on the home page. 
* Users can add notes to their projects to help remember and keep track of information 
* Users can add sections to their project to keep count of different areas of their project. 
* Users can add photos to their finished projects 

# Planning 
* [ERD](https://dbdiagram.io/d/64090011296d97641d867efb)
![ERD](images/ERD.png)

# Technologies Used 
* React 
* JavaScript 
* JSX 
* CSS 
* HTML 
* Cloudinary 
* Bulma 

# Installation 
 1. Be sure JSON server is installed 
    ```npm install -g json-server```
2. You can access my database [here](https://github.com/amathews043/Front-End-Capstone-API) or you can create your own database.json file and serve it 
    ```json-server database.json -p 8088 -w```
3. Clone the Application 
    ```git clone git@github.com:amathews043/Front-End-Capstone.git```
4. Launch the Client 
    ```npm install```
    ```npm start```

# Home Page Preview 
The Home page shows users a list of suggested projects. They can click the link to look at the pattern or selecte the "Start Project" button to add the project to their current projects. 
![Home and Curren Project Page Preview](images/HomeAndProject.gif)

# Current Project List Preview
On the Current Projects Page, users see a list of their current projects. They can click on the project image or project name to view that project. If they do not already have an inspiration picture for their project, a button will appear in place of the project image. When users click this button they will be taken to the "edit project" form and can add a URL.  
![Current Project List Preview](images/CurrentProjectList.gif)

# Complete Project List Preview
On the Complete Projects Page, users see a list of projects they have completed. They can click on the project image or project name to view that project. If they do not already have a picture of their project, a button will appear in place of the project image. When users click this button they will be taken to the upload widget and can add the image from their computer.   
![Complete Project Lst Preview](images/CompleteProjectList.gif)


# Acknowledgements
I couldn't have done any of this without all the wonderful people in Cohort 62. Thank you all for all the support and help! - 
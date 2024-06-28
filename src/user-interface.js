import {App, Project} from "./app.js"
import {createListOfTodos} from "./container"
import {createModal} from "./modal-creator";

const projectListDiv = document.querySelector(".project-list ul")





export const app = new App()

const start = () =>{
    createProjects()
}

const createProjects = ()=> {
    projectListDiv.innerHTML = ``
    for (const value of app.listOfProject) {
        let tempProject = document.createElement("li")
        let textDiv = document.createElement("div");
        textDiv.textContent = value.name
        textDiv.addEventListener("click",()=> clickProjectSelect(value))
        tempProject.appendChild(textDiv)
        let button = document.createElement("button");
        button.textContent = "X"
        button.classList.add("remove")
        console.log(value)
        button.addEventListener("click",()=>clickProjectButton("Remove Project",value))
        tempProject.appendChild(button)
        projectListDiv.appendChild(tempProject)
    }
    let button = document.createElement("button");
    button.textContent = "Create Project"
    button.addEventListener("click",()=>{
        clickProjectButton("Create Project")
    })
    projectListDiv.appendChild(button)
}

const clickProjectSelect = (project) => {
    app.selectedProject = project
    createListOfTodos(app.selectedProject)

}

let clickProjectButton = (buttonName,project) =>{
    switch (buttonName){
        case "Create Project":
            createModal("project",app,(title)=> {
                app.addProject(new Project(title,app))
                createListOfTodos(app.selectedProject)
                createProjects()
            })
            break
        case "Remove Project":
            app.removeProject(project)
            createListOfTodos(app.selectedProject)
            createProjects()
            break
    }
}






export {start}






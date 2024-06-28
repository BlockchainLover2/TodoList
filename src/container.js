import {isDate, isFuture, toDate} from "date-fns";

const container = document.querySelector(".container")
import {app} from "./user-interface"
import {Group, TodoItem} from "./app.js";
import {createModal} from "./modal-creator";
const { differenceInHours } = require("date-fns");


export let createListOfTodos = (project) =>{
    container.innerHTML = ``
    if(project === null || project === undefined)
        return

    checkIfDone(project,container)
    let title = document.createElement("div");
    title.textContent = project.name
    container.appendChild(title)
    for (const group of project.listOfGroups) {
        const newGroup = createGroup(group)
        for (const item of group.listOfTodo) {
            const newItem = createItem(item,newGroup)
            newGroup.appendChild(newItem)
        }
        let buttonDiv = document.createElement("div");
        buttonDiv.classList.add("group-buttons")
        createButtonDiv("Add Item", buttonDiv,group)
        createButtonDiv("Remove Group", buttonDiv,group).classList.add("remove")
        newGroup.appendChild(buttonDiv)
        container.appendChild(newGroup)
        checkIfDone(group,newGroup)
    }
    createButtonDiv("Add Group",container,project)
}


let createButtonDiv = (buttonName,parentDiv,object)=> {
    let div = document.createElement("div")
    let button = document.createElement("button");
    button.textContent = buttonName
    button.addEventListener("click",(e)=>clickButtonEvent(buttonName,object))
    div.appendChild(button)
    parentDiv.appendChild(div)
    return button;
}

let createGroup = (group)=>{
    let newGroup = document.createElement("div");
    let title = document.createElement("div");
    title.textContent = group.name;
    newGroup.classList.add("group")
    newGroup.appendChild(title)
    return newGroup;

}

let createItem = (todo,groupDiv) =>{
    let newItem = document.createElement("div");
    let title = document.createElement("div");
    let check = document.createElement("input");
    let hoursLeft = document.createElement("div");
    check.type = "checkbox";
    check.checked = todo.isDone
    check.classList.add("checkbox")
    check.addEventListener("change",(e)=>{
        todo.changeDone()
        checkIfDone(todo.group,groupDiv)
        checkIfDone(todo.group.project,container)
    })


    title.textContent = todo.title
    newItem.classList.add("todo-item")
    newItem.appendChild(check)
    newItem.appendChild(title)
    if(isFuture(todo.date))
        hoursLeft.textContent = differenceInHours(todo.date,new Date()).toString() + " hours left!!"
    else
        hoursLeft.textContent = "You missed!!"
    newItem.appendChild(hoursLeft)
    createButtonDiv("Remove Item",newItem,todo)
    return newItem;
}

let checkIfDone = (projectOrGroup,div) => {
    if(projectOrGroup.isDone){
        div.classList.add("done")
    }
    else
        div.classList.remove("done")
}


let clickButtonEvent = (buttonName,object) =>{
    let group
    let project
    switch (buttonName){
        case "Add Item":
            group = object
            createModal("Todo",group,(title,date)=> {
                let dateArray = date.split("-")
                group.addItem(new TodoItem(title,new Date(dateArray[0],Number(dateArray[1])-1,dateArray[2]),group))
                createListOfTodos(app.selectedProject)
            })
            break
        case "Remove Item":
            group =  object.group
            group.removeItem(object)
            createListOfTodos(app.selectedProject)
            break
        case "Add Group":
            project = object
            createModal("group",project,(title)=> {
                project.addGroup(new Group(title,object))
                createListOfTodos(app.selectedProject)
            })
            break
        case "Remove Group":
            project =  object.project
            project.removeGroup(object)
            createListOfTodos(app.selectedProject)
            break
    }
}


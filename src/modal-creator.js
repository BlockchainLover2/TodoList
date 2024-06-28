export let createModal = (modalType,item,event) =>{
    let modalBackgroundDiv = document.createElement('div');
    let modalContainerDiv = document.createElement('div');
    modalBackgroundDiv.classList.add('modal');
    let form = document.createElement('form');
    let button = document.createElement("button")
    button.textContent = "Create"
    button.type = "button"
    switch (modalType.toLowerCase()){
        case "todo":
            createTodoModal(form,item)
            button.addEventListener("click",()=>{
                let childNodes = form.childNodes;
                event(childNodes[1].childNodes[1].value,childNodes[2].childNodes[1].value);
                modalBackgroundDiv.remove()
            })
            break
        case "project":
            createProjectModal(form)
            button.addEventListener("click",()=>{
                let childNodes = form.childNodes;
                event(childNodes[1].childNodes[1].value);
                modalBackgroundDiv.remove()
            })
            break
        case "group":
            createGroupModal(form,item)
            button.addEventListener("click",()=>{
                let childNodes = form.childNodes;
                event(childNodes[1].childNodes[1].value);
                modalBackgroundDiv.remove()
            })
            break
    }
    form.appendChild(button)
    modalContainerDiv.appendChild(form)
    modalBackgroundDiv.appendChild(modalContainerDiv)
    document.body.appendChild(modalBackgroundDiv)

}


let createInputContainer = (title,inputType,item)=>{
    let container = document.createElement("div");
    let label = document.createElement("label");
    let input = document.createElement("input");
    if(inputType === "group"){
        input.value = item.name
        input.disabled = true
    }
    else if(inputType === "date"){
        input.type = "date"
    }
    input.id = title.toLowerCase() + "Id"
    label.for = input.id
    label.textContent = title
    container.appendChild(label)
    container.appendChild(input)
    container.classList.add("input-container")
    return container
}

let createGroupModal = (form,item)=>{
    let header = document.createElement("h1");
    header.textContent = "Create Group"
    let title = createInputContainer("Title","text",item)
    let project = createInputContainer("Project","group",item)
    form.appendChild(header)
    form.appendChild(title)
    form.appendChild(project)
}

let createProjectModal = (form)=>{
    let header = document.createElement("h1");
    header.textContent = "Create Project"
    let title = createInputContainer("Title","text")
    form.appendChild(header)
    form.appendChild(title)
}

let createTodoModal = (form,item)=>{
    let header = document.createElement("h1");
    header.textContent = "Create Todo"
    let title = createInputContainer("Title","text",item)
    let date = createInputContainer("Date","date",item)
    let group = createInputContainer("Group","group",item)
    form.appendChild(header)
    form.appendChild(title)
    form.appendChild(date)
    form.appendChild(group)
}



/*<div class="modal">
    <div>
        <form>
            <h1>Create Todo</h1>
            <div class="input-container">
                <label for="titleId">Title: </label>
                <input id="titleId">
            </div>
            <div class="input-container">
                <label for="dateId">Date: </label>
                <input id="dateId">
            </div>
            <div class="input-container">
                <label for="groupId">Group: </label>
                <input id="groupId">
            </div>
            <button>Create</button>
        </form>
    </div>
</div>*/
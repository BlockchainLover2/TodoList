class App{
    listOfProject
    selectedProject


    constructor(){
        this.listOfProject = []
        this.selectedProject = this.listOfProject[0]
        this.loadData()
    }

    addProject(project){
        if(project instanceof Project){
            this.listOfProject.push(project)
            this.selectedProject = project
            this.saveData()
        }
    }

    loadData(){
        let data =  JSON.parse(localStorage.getItem("projects"))
        if(data === null) return

        for (const tempProject of data) {
            if(tempProject === null){
                this.listOfProject.push(new Project("",this))
                continue
            }
            let project = new Project(tempProject.name,this)
            for (const tempGroup of tempProject.listOfGroups) {
                let group = new Group(tempGroup.name,project)
                for (const tempItem of tempGroup.listOfTodo) {
                    let item = new TodoItem(tempItem.title,tempItem.date,group,tempItem.isDone)
                    group.listOfTodo.push(item)
                }
                project.listOfGroups.push(group)
                group.checkIfComplete(true)

            }
            this.listOfProject.push(project)
        }
    }

    saveData(){
        let cache = []
        cache.push(this)
        localStorage.setItem('projects', JSON.stringify(this.listOfProject,(key, value)=>{
            if(typeof value === "object" && value !== null){
                if(cache.includes(value))
                    return

                cache.push(value)

            }



            return value
        }))
    }

    removeProject(project){
        if(this.listOfProject.includes(project)){
            let index = this.listOfProject.indexOf(project)
            this.listOfProject.splice(index, 1)
            if(this.selectedProject === project)
                this.selectedProject = null
            this.saveData()
        }
    }



}
export class Project {
    name
    listOfGroups = []
    isDone = true
    app

    constructor(name,app) {
        this.listOfGroups = [];
        this.name = name;
        this.app = app
    }
    addGroup(group){
        if(group instanceof Group)
            this.listOfGroups.push(group)
        this.checkIfComplete()
    }

    removeGroup(group){
        if(this.listOfGroups.includes(group)){
            let index = this.listOfGroups.indexOf(group)
            this.listOfGroups.splice(index, 1)
            this.checkIfComplete()
        }
    }

    checkIfComplete(loadData){
        this.isDone = this.listOfGroups.every(x=>x.isDone)
        if(!loadData)
            this.app.saveData()
    }

}
export class Group {
    name
    listOfTodo = []
    isDone = true
    project


    constructor(name,project) {
        this.listOfTodo = []
        this.name = name
        this.project = project
    }

    addItem(item){
        if(item instanceof TodoItem){
            this.listOfTodo.push(item)
            this.checkIfComplete()

        }
    }

    removeItem(item){
        if(this.listOfTodo.includes(item)){
            let index = this.listOfTodo.indexOf(item)
            this.listOfTodo.splice(index, 1)
            this.checkIfComplete()
        }
    }

    checkIfComplete(loadData = false){
        this.isDone = this.listOfTodo.every(x=>x.isDone)
        this.project.checkIfComplete(loadData)
    }


}
export class TodoItem{
    title
    isDone
    date
    group

    constructor(title,date,group,isDone = false){
        this.title = title
        this.isDone = false
        this.date = date
        this.group = group
        this.isDone = isDone
    }
    changeDone(){
        this.isDone = !this.isDone
        this.group.checkIfComplete()
    }
}



export {App}
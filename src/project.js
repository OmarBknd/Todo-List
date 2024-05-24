import tasks,{TaskProperties} from "./task";
console.log('project page');

export class projectProperties{
    constructor(title){
        this.title = title;
        this.tasks = [];
         
    }
    
    addTaskToProject(taskTitle, taskDate) {
        const task = new TaskProperties(taskTitle, taskDate);
        this.tasks.push(task);
        projects.saveProjectsToLocalStorage();
        return task;
    }
}

const projects = (()=>{
    let myProjects =JSON.parse(localStorage.getItem('myProjects')) || [] 
  // let myProjects = [];
  myProjects = myProjects.map(project => {
    const reassignToObject = Object.assign(new projectProperties(project.title), project);
    reassignToObject.tasks = project.tasks.map(task => Object.assign(new TaskProperties(task.title, task.date), task));
    return reassignToObject;
});
  
    function saveProjectsToLocalStorage(){
        localStorage.setItem('myProjects',JSON.stringify(myProjects))
        
    }
    
    function addProject(title){
        const project = new projectProperties(title);
        myProjects.push(project);
        saveProjectsToLocalStorage();
        return project
    };
    return{
        addProject,
        myProjects,
       
        saveProjectsToLocalStorage
    }
})()

export default projects

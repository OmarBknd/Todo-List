import projects from "./project";


console.log('tasks page');

class TaskProperties{
    constructor(title,date){
        this.title = title;
        this.date = date;

    }
}
 const tasks = (()=>{
let myTasks =  [];

 function addTask(title,date){

    const task = new TaskProperties(title,date);
    myTasks.push(task)
    return task
   
}
function saveTasksToLocalStorage(){
    localStorage.setItem('myTasks',JSON.stringify(myTasks))
}
    return{
        myTasks,
        addTask,
        saveTasksToLocalStorage
        

    }
})()  
  
export default tasks
export {TaskProperties}











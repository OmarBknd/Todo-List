


console.log('tasks page');

class TaskProperties{
    constructor(title,date,description){
        this.title = title;
        this.date = date;
        this.description = description;

    }
}
 const tasks = (()=>{
let myTasks =  [];

 function addTask(title,date,description){

    const task = new TaskProperties(title,date,description);
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











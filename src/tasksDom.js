import tasks,{TaskProperties} from "./task";
//import projects,{projectProperties} from "./project";


//console.log('tsk dom');
// display the task on the UI

const tasksDom = (()=>{
     const taskContainer = document.querySelector('#taskContainer');
     const addTaskBtn = document.querySelector('#addTaskBtn');
     const taskDialog = document.querySelector('#taskDialog');
     const taskConfirmBtn = document.querySelector('#taskConfirmBtn');
     const taskTitle = document.querySelector('#taskTitle');
     const taskCloseBtn = document.querySelector('#taskCloseBtn');

     const myTasks = tasks.myTasks;
     function displayTask(){
        taskContainer.innerHTML = ''
        myTasks.forEach((task)=>{
            
           
    
            const taskBox = document.createElement('div');
            taskBox.classList.add('task-box')
            
            const titleInput = document.createElement('p');
            taskBox.appendChild(titleInput);
            
            
            titleInput.textContent += task.title;
            taskContainer.appendChild(taskBox);
        })
    }
     
   
    
    addTaskBtn.addEventListener('click',()=>{
        taskDialog.showModal();
    })
    
   
    taskConfirmBtn.addEventListener('click',(e)=>{
        e.preventDefault()
    
        const taskTitleInput = taskTitle.value;
        tasks.addTask(taskTitleInput);
        
    
        taskTitle.value = '';
        displayTask();
        taskDialog.close();
    })
    
   
    taskCloseBtn.addEventListener('click',(e)=>{
        e.preventDefault();
        taskTitle.value ='';
        
        taskDialog.close();
    })
    
    
    let do1 = new TaskProperties('title1');
    let do2 = new TaskProperties('title2');
    let do3 = new TaskProperties('title3');
    
   myTasks.push(do1,do2,do3);
    //console.log(myTasks);
  
   
    displayTask()
    return{displayTask}
})

export default tasksDom
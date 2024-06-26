import projects from "./project";
import {format,differenceInDays } from "date-fns";
import editSvgIcon from "./components/svgs/edit-tool-pencil-svgrepo-com.svg";
import deleteSvgIcon from "./components/svgs/delete-trash-remove-svgrepo-com.svg";
//import addSvgIcon from "./components/svgs/plus-circle-1441-svgrepo-com.svg"
console.log('project page');
const projectsDom = (() => {
    const myProjects = projects.myProjects;

    const projectContainer = document.querySelector('#projectContainer');
    const addProjectBtn = document.querySelector('#addProjectBtn button'); 
    const projectDialog = document.querySelector('#projectDialog');
    const projectConfirmBtn = document.querySelector('#confirmProjectBtn');
    const projectTitle = document.querySelector('#projectTitle');
    const projectCloseBtn = document.querySelector('#closeProjectBtn');

    const taskContainer = document.querySelector('#taskContainer');
    const addTaskBtn = document.querySelector('#addTaskBtn');
    const taskDialog = document.querySelector('#taskDialog');
    const taskConfirmBtn = document.querySelector('#taskConfirmBtn');
    const taskTitle = document.querySelector('#taskTitle');
    const taskDescription = document.querySelector('#taskDescription');
    const taskDate = document.querySelector('#taskDate');
    const taskPriority = document.querySelector('#taskPriority');
    const taskCloseBtn = document.querySelector('#taskCloseBtn');

     
    
    let selectedProject = null;
    let editMode = false;
    let editTaskIndex = null;
    let editProjectIndex = null;

    function displayProjects() {
        projectContainer.innerHTML = '';

        myProjects.forEach((project, index) => {
            const projectBox = document.createElement('div');
            const projectList = document.createElement('ul');
          
            projectList.classList.add('project-list');
          
            projectBox.classList.add('project-box');
            projectBox.dataset.index = index;

            const titleInput = document.createElement('div');
           
           
            titleInput.textContent = project.title;
            
            projectBox.appendChild(titleInput);
            

            projectBox.addEventListener('click', () => {
                selectProject(index);
            });


            //const editBtn = document.createElement('span');
            //const addIcon = new Image();
            //addIcon.src = addSvgIcon;
            //titleInput.appendChild(addIcon)
          //
            //editBtn.addEventListener('click', () => {
            //    editProject(index);
            //});
            //projectBox.appendChild(editBtn)

            const deleteBtn = document.createElement('span');
            deleteBtn.classList.add('svg-icons');
            const deleteIcon = new Image();
            deleteIcon.src = deleteSvgIcon;
            deleteBtn.appendChild(deleteIcon)
            deleteBtn.addEventListener('click',()=>{
                deleteProject(index)
            })
            titleInput.appendChild(deleteBtn)
           // projectBox.appendChild(deleteBtn);
            projectList.appendChild(projectBox);
            projectContainer.appendChild(projectList);
        });

    }

    function displaySelectedProjectTasks() {
        if (!selectedProject) return;

        taskContainer.innerHTML = '';
        selectedProject.tasks.forEach((task, index) => {
            const taskBox = document.createElement('div');
            taskBox.classList.add('task-box');

            const titleInput = document.createElement('p');
            const descriptionInput = document.createElement('p');
            const dateInput = document.createElement('p');
            
           
           if(task.priority === 'low'){taskBox.classList.add('low')}
            else if(task.priority === 'high'){taskBox.classList.add('high')}
            else if(task.priority === 'medium'){taskBox.classList.add('medium')}
            
            
            titleInput.textContent = task.title;
            descriptionInput.textContent = task.description;
            dateInput.textContent = task.date;
           
            
           
            taskBox.appendChild(titleInput);

            
            taskBox.appendChild(descriptionInput)
            taskBox.appendChild(dateInput);

            


            const btnsContainer = document.createElement('span')
            btnsContainer.classList.add('svg-icons')
            const editBtn = document.createElement('span');
           
            const editIcon = new Image()
            editIcon.src = editSvgIcon
            editBtn.appendChild(editIcon)
            editBtn.addEventListener('click', () => {
                editTask(index);
            });
            
            btnsContainer.appendChild(editBtn);

           
            const deleteBtn = document.createElement('span');
          
            const deleteIcon = new Image();
            deleteIcon.src = deleteSvgIcon;
            deleteBtn.appendChild(deleteIcon);
           
            deleteBtn.addEventListener('click', () => {
                deleteTask(index);
            });
            btnsContainer.appendChild(deleteBtn);
            taskBox.appendChild(btnsContainer)

            taskContainer.appendChild(taskBox);
        });
    }

    function selectProject(index) {
        selectedProject = myProjects[index];
        displaySelectedProjectTasks();
    }
    //function editProject(projectIndex){
    //    const project = myProjects[projectIndex];
    //    projectTitle.value = project.title;
    //    editMode = true;
    //    editProjectIndex = projectIndex;
    //    projectDialog.showModal()
    //}
    function deleteProject(projectIndex){
        myProjects.splice(projectIndex, 1)
        projects.saveProjectsToLocalStorage()
        
        displayProjects()
    }
    function editTask(taskIndex) {
        const task = selectedProject.tasks[taskIndex];
        taskTitle.value = task.title;
        editMode = true;
        editTaskIndex = taskIndex;
        taskDialog.showModal();
    }

    function deleteTask(taskIndex) {
        selectedProject.tasks.splice(taskIndex, 1);
        projects.saveProjectsToLocalStorage();
      
        displaySelectedProjectTasks();
    }

    addProjectBtn.addEventListener('click', () => {
        projectDialog.showModal();
    });

    projectConfirmBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const projectTitleInput = projectTitle.value;
        if(editMode){
            myProjects[editProjectIndex].title = projectTitleInput;
        }
        else{
            projects.addProject(projectTitleInput);
        }

       
        
       projects.saveProjectsToLocalStorage();
        projectTitle.value = '';
        displayProjects();
        projectDialog.close();
    });

    projectCloseBtn.addEventListener('click', (e) => {
        e.preventDefault();
        projectTitle.value = '';
        projectDialog.close();
    });

    addTaskBtn.addEventListener('click', () => {
        if (selectedProject) {
            taskTitle.value = '';
            taskDescription.value = '';
            taskDate.value = '';
           
             
            editMode = false; 
            taskDialog.showModal();
        } else {
            alert("Please select a project first.");
        }
    });
    
   
    taskConfirmBtn.addEventListener('click', (e) => {
        e.preventDefault();
       
        if (selectedProject) {
            const currentTime = format(new Date(),'MM-dd-yyyy')
            
            const taskTitleInput = taskTitle.value;
            const taskDateInput = taskDate.value;
            const taskDescriptionInput = taskDescription.value;
            const taskPriorityInput = taskPriority.value;
            let differenceDays = differenceInDays(taskDateInput,currentTime)
            
            if(differenceDays > 0){
               differenceDays =  `${currentTime} ${differenceDays} days left`;
                
                }
                else if(differenceDays < 0){
                  differenceDays =   `${currentTime} ${Math.abs(differenceDays)} days ago`
                }
            else{
                differenceDays ='Today!'
            };
            
            if (editMode) {
                
                selectedProject.tasks[editTaskIndex].title = taskTitleInput;
                selectedProject.tasks[editTaskIndex].description = taskDescriptionInput;
                selectedProject.tasks[editTaskIndex].date = differenceDays;
                selectedProject.tasks[editTaskIndex].priority = taskPriorityInput;
                

                
            } else {
                
                selectedProject.addTaskToProject(taskTitleInput,taskDescriptionInput,differenceDays,taskPriorityInput);
            }
            projects.saveProjectsToLocalStorage();
           
            taskTitle.value = '';
            taskDate.value = '';
            taskDescription.value = '';
            
            displaySelectedProjectTasks();

            taskDialog.close();
        }
    });

    taskCloseBtn.addEventListener('click', (e) => {
        e.preventDefault();
        taskTitle.value = '';
        taskDate.value = '';
        taskDescription.value = '';
        taskDialog.close();
    });

  

    displayProjects();
})();

export default projectsDom;

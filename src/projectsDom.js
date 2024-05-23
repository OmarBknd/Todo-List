import projects, { projectProperties } from "./project";
import tasks from "./task";
import {format,differenceInDays } from "date-fns";

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
    const taskDate = document.querySelector('#taskDate');
    const taskCloseBtn = document.querySelector('#taskCloseBtn');

     
    
    let selectedProject = null;
    let editMode = false;
    let editTaskIndex = null;
    let editProjectIndex = null;

    function displayProjects() {
        projectContainer.innerHTML = '';

        myProjects.forEach((project, index) => {
            const projectBox = document.createElement('div');
            projectBox.classList.add('project-box');
            projectBox.dataset.index = index;

            const titleInput = document.createElement('p');
           
            titleInput.textContent = project.title;
            
            projectBox.appendChild(titleInput);
            

            projectBox.addEventListener('click', () => {
                selectProject(index);
            });
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.addEventListener('click', () => {
                editProject(index);
            });
            projectBox.appendChild(editBtn)

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete'
            deleteBtn.addEventListener('click',()=>{
                deleteProject(index)
            })
           
            projectBox.appendChild(deleteBtn)
            projectContainer.appendChild(projectBox);
        });

    }

    function displaySelectedProjectTasks() {
        if (!selectedProject) return;

        taskContainer.innerHTML = '';
        selectedProject.tasks.forEach((task, index) => {
            const taskBox = document.createElement('div');
            taskBox.classList.add('task-box');

            const titleInput = document.createElement('p');
            const dateInput = document.createElement('p');
            
            titleInput.textContent = task.title;
            dateInput.textContent = task.date;
            
           
            
            taskBox.appendChild(titleInput);
            taskBox.appendChild(dateInput)

            // Add Edit Button
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.addEventListener('click', () => {
                editTask(index);
            });
            taskBox.appendChild(editBtn);

            // Add Delete Button
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => {
                deleteTask(index);
            });
            taskBox.appendChild(deleteBtn);

            taskContainer.appendChild(taskBox);
        });
    }

    function selectProject(index) {
        selectedProject = myProjects[index];
        displaySelectedProjectTasks();
    }
    function editProject(projectIndex){
        const project = myProjects[projectIndex];
        projectTitle.value = project.title;
        editMode = true;
        editProjectIndex = projectIndex;
        projectDialog.showModal()
    }
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
                selectedProject.tasks[editTaskIndex].date = differenceDays;

                
            } else {
                
                selectedProject.addTaskToProject(taskTitleInput,differenceDays);
            }
            projects.saveProjectsToLocalStorage();
           
            taskTitle.value = '';
            taskDate.value = '';
            
            displaySelectedProjectTasks();

            taskDialog.close();
        }
    });

    taskCloseBtn.addEventListener('click', (e) => {
        e.preventDefault();
        taskTitle.value = '';
        taskDate.value = '';
        taskDialog.close();
    });

    // For testing purposes
    //let project1 = new projectProperties('Project1');
    //project1.addTaskToProject('task1 project1','2024-05-03');
    //let project2 = new projectProperties('Project2');
    //myProjects.push(project1, project2);

    displayProjects();
})();

export default projectsDom;

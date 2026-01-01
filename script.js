
let tasks = [];

    // ya hmara  localStorage  ha is ma ham locally apna task add kren gy
    document.addEventListener("DOMContentLoaded", () => {
        let data = localStorage.getItem("tasks");
        if (data) {
            tasks = JSON.parse(data);
            showTasks();
        } 
    });

    // is function ma hama apny task  ko locally store kren gy  
    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // is function ma ham apna new task store kren gy
    function addTask() {
        let input = document.getElementById("taskInput");
        let text = input.value;
        if (text === "") return;

        tasks.push({ text: text, completed: false });
        input.value = "";
        showTasks();
        saveTasks();
    }

    // Toggletask function Task ki jo complete incomplete status ko change krt ha 
    function toggleTask(index) {
        tasks[index].completed = !tasks[index].completed;
    //  jo tast ham na update ki ha usy dobara screen py show krwata ha ya function
        showTasks();
        // task ko localStorage ma save krta ha 
        saveTasks();
    }



    // ya function task ko delete krta ha 
    function deleteTask(index) {
        tasks.splice(index, 1);
        showTasks();
        saveTasks();
    }

    // Show tasks on screen
    function showTasks() {
        let list = document.querySelector(".task-list");
        // jo task pehly sa hota ha usy remove kar deta ha ta k koe task dublicate na ho 
        list.innerHTML = "";
         
        // is sa ham apny task arry k har task par loop chlaty hain 
        tasks.forEach((task, index) => {
            //  createElement sa ham ak new li create krty hain 
            let li = document.createElement("li");
            // jo hmary pass li create hwa ha usy styling deny k lia ham CSS class dy rhy hain 
            li.className = "taskItem";
        //    is sa ham li k ander hmara jo b content ho ga ham wo is ma add krty hain innerHTML  ma 
            li.innerHTML = `

                <div class="task">
                    <input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleTask(${index})">
                    <p>${task.text}</p>
                </div>
               <div class="icons">
        <i class="fa-solid fa-trash delete-icon" onclick="deleteTask(${index})"></i>
    </div>
            `;

            list.appendChild(li);
        });
    }

    // is ma ham eventlistener add krty hain 

    document.getElementById("newTask").addEventListener("click", (event) => {
        event.preventDefault();
        addTask();
    });
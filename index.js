const submitBtn = document.getElementById("submit-btn");

// Listener
submitBtn.addEventListener("click", checkForm);


// PRE SUBMIT
function checkForm(e,isEditing=false,editingProject=null){
    e.preventDefault();

    // console.log(getId("file-input").files);

    const project = {
        name : getId("project-input").value,
        start : getId("start-date-input").value,
        end : getId("end-date-input").value,
        desc : getId("description-input").value,
        techs : 
        [getId("node").checked, 
        getId("next").checked, 
        getId("react").checked, 
        getId("ts").checked],
        image: getId("file-input").value ? URL.createObjectURL(getId("file-input").files[0]) : null
    };

    // Filter
    if(!project.name){ return alert("Name can't be empty.")}
    if(!project.start || !project.end){return alert("Date can't be empty.")}
    if(!project.desc){ return alert("Descriptions can't be empty.")}
    if(project.techs.every(item => item === false)){return alert("Please choose at least one technology")}
    if(!project.image) return alert("Image can't be empty")

    // Submit
    if(!isEditing)  submitForm(project) 
    if(isEditing) updateForm(project,editingProject)

}

// CREATE FUNCTION
function submitForm(project){
    const projectList = document.getElementById("project-list");
    const newProject = document.createElement("div");
    newProject.classList.add("project");

    newProject.innerHTML = `
    
    <div class="upper-project">
        <img class="project-img" src=${project.image} width="100%" alt="">
        <span class="project-title">${project.name}</span>
        <p class="project-duration">durasi: ${getTime(project.start,project.end)}</p>
        <p class="project-des">${project.desc}</p>
    </div>

    <div class="lower-project">
        <div class="project-logos">
             ${project.techs[0] ? `<i class="fa-brands fa-node-js"></i>` : ""}
             ${project.techs[2] ? `<i class="fa-brands fa-react"></i>` : ""}
             ${project.techs[1] ? `<img class="next-js" src="./assets/nextjs.webp" width="40px">` : ""}
             ${project.techs[3] ? ` <img  class="ts" src="./assets/typescript_original_logo_icon_146317.png" width="24px" >` : ""}
        </div>
     
        <div class="project-buttons">
             <button class="edit-btn">Edit</button>
             <button class="delete-btn" >Delete</button>
        </div>
    </div>
    
    `
    projectList.appendChild(newProject);

    // ADD LISTENERS
    newProject.addEventListener("click", movePost)

    const deleteBtn = newProject.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deletePost);

    // const editBtn = newProject.querySelector(".edit-btn");
    // editBtn.addEventListener("click", editPost)
   
    // Delete "no posts, please ..." kalo ada
    isPostEmpty();
    // Clear input
    clearInputs();
    
    alert("New project created")
}

// DELETE FUNCTION
function deletePost(e){
       e.stopPropagation();
       const project = e.currentTarget.parentElement.parentElement.parentElement;
       project.remove()

      // Add "no posts, please ..." kalo posts kosong
      isPostEmpty();
      alert("Project deleted")

}

// EDIT FUNCTION
// function editPost(e){
//     e.stopPropagation();
//     const project = e.currentTarget.parentElement.parentElement.parentElement;

//     window.scrollTo({
//         left: 0,
//         top:0
//     })

//     // Fill the form above sesuai yg diisi sblmnya
//     getId("project-input").value = project.querySelector(".project-title").innerHTML;
//     getId("description-input").value = project.querySelector(".project-des").innerHTML;
//     getId("node").checked = project.querySelector(".fa-brands.fa-node-js") ? true : false;
//     getId("next").checked = project.querySelector(".next-js") ? true : false;
//     getId("react").checked = project.querySelector(".fa-brands.fa-react") ? true : false;
//     getId("ts").checked = project.querySelector(".ts") ? true : false;

//     // Add Cancel Button
//     const cancelBtn = document.createElement("button");
//     cancelBtn.innerHTML = "Cancel ";
//     cancelBtn.id = "cancel-btn";
//     submitBtn.parentElement.appendChild(cancelBtn);
//     cancelBtn.addEventListener("click",cancelEdit) 

//     // if they click other edit button while in editing state , warn them
//     const editBtns = document.querySelectorAll(".edit-btn");
//     editBtns.forEach((btn)=>{ // take all edit buttons power, bcs in editing mode
//         btn.removeEventListener("click",editPost);
//         btn.addEventListener("click", warnEdit) });
    

//     // Submit / Update
//     submitBtn.removeEventListener("click", checkForm);
//     submitBtn.innerHTML = "Update";
//     submitBtn.addEventListener("click", (event)=>{checkForm(event,true,project)})
// }

// function cancelEdit(e){
//     submitBtn.innerHTML = "Submit";
       
//        e.currentTarget.remove();
//        clearInputs();
//        alert("Editting canceled")

//     //    Give all edit buttons back their power
//     const editBtns = document.querySelectorAll(".edit-btn");
//     editBtns.forEach((btn)=>{ btn.addEventListener("click",editPost)});
//     editBtns.forEach((btn)=>{ btn.removeEventListener("click",warnEdit)});
    
    
    
// }

// function updateForm(newProjectData,oldProject){
//     oldProject.querySelector(".project-img").src = newProjectData.image;
//     oldProject.querySelector(".project-title").innerHTML = newProjectData.name;
//     oldProject.querySelector(".project-duration").innerHTML = "durasi: " + getTime(newProjectData.start,newProjectData.end);
//     oldProject.querySelector(".project-des").innerHTML = newProjectData.desc;
//    !newProjectData.techs[0] && oldProject.querySelector(".fa-brands.fa-node-js").remove();
//    !newProjectData.techs[1] && oldProject.querySelector(".fa-brands.fa-react").remove();
//    !newProjectData.techs[2] && oldProject.querySelector(".next-js").remove();
//    !newProjectData.techs[3] && oldProject.querySelector(".ts").remove();

//    alert("Old project updated");

//    submitBtn.replaceWith(submitBtn.cloneNode(true));
//    submitBtn.addEventListener("click", checkForm);
//    submitBtn.innerHTML = "submit";

// //    clear
//    clearInputs()
// }



// Helper functions


function getId (id){
    return document.getElementById(id)
}

function getTime(start,end){
    

    // year
    const startYear = Number(start.slice(0,4));
    const endYear = Number(end.slice(0,4));
    const yearDuration = (endYear - startYear) !== 0 ? (endYear - startYear) * 12 : 0;
    
    // month
    if(start[5] == 0){start = start[6]}else{start = start[5]+start[6]}
    if(end[5] == 0){end = end[6]}else{end = end[5] + end[6]};


    const startMonth = Number(start);
    const endMonth = Number(end);


    // Kalkulasi => selisih bulan + selisih tahun = durasi selisih total
    const duration = endMonth - startMonth + yearDuration;
    
    if(duration === 0) return "Dibawah sebulan"
    return duration + " " + "bulan"
}

function isPostEmpty(){
    if(document.getElementsByClassName("project").length == 1 && document.getElementById("empty-project") !== null ){
        document.getElementById("empty-project").remove()
    } 
    else if(document.getElementsByClassName("project").length < 1) {
        const emptyStatement = document.createElement("p");
        emptyStatement.id = "empty-project";
        emptyStatement.innerHTML = `No posts, please add new post...`

        const projectsContainer = document.getElementById("project-list");
        projectsContainer.appendChild(emptyStatement);
    }
}

function clearInputs(){
     getId("project-input").value = "";
     getId("start-date-input").value = "";
     getId("end-date-input").value = "";
     getId("description-input").value = "";
     getId("file-input").value = "";
     getId("node").checked = false;
     getId("next").checked = false;
     getId("react").checked = false;
     getId("ts").checked = false;
    
}

function movePost(){
    location.href = "http://localhost:5500/Chapter1-day4/single.html";
}

function warnEdit(e){
    e.stopPropagation();

    window.scrollTo({
        left: 0,
        top:0
    });

    alert("Already on editing mode, please cancel previous edit mode")
}

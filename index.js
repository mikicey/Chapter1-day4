const submitBtn = document.getElementById("submit-btn");

// Listener
submitBtn.addEventListener("click", checkForm);


                                   // MAIN CRUD FUNCTIONS


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
    if(!validateDate(project.start, project.end)){return alert("End Date must be more recent than start date")}
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
    
    <div class="upper-project" >
        <img class="project-img" src=${project.image} width="100%" alt="">
        <span class="project-title">${project.name}</span>
        <p class="project-duration">Durasi: ${getTime(project.start,project.end)}</p>
        <p class="project-des">${project.desc}</p>
    </div>

    <div class="lower-project" >
        <div class="project-logos" >
             ${project.techs[0] ? `<i class="fa-brands fa-node-js"></i>` : ""}
             ${project.techs[2] ? `<i class="fa-brands fa-react"></i>` : ""}
             ${project.techs[1] ? `<img class="next-js" src="./assets/nextjs.webp" width="40px">` : ""}
             ${project.techs[3] ? ` <img  class="ts" src="./assets/typescript_original_logo_icon_146317.png" width="24px" >` : ""}
        </div>
     
        <div class="project-buttons" >
             <button class="edit-btn">Edit</button>
             <button class="delete-btn">Delete</button>
        </div>
    </div>
    
    `
    projectList.appendChild(newProject);

    // ADD LISTENERS
    newProject.addEventListener("click", movePost)


    const deleteBtn = newProject.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deletePost);

    const editBtn = newProject.querySelector(".edit-btn");
    editBtn.addEventListener("click", editPost)
   
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
             // when click edit button
function editPost(e){
    e.stopPropagation();
    const project = e.currentTarget.parentElement.parentElement.parentElement;
    
    window.scrollTo({
        left: 0,
        top:0
    })

    // Fill the form above sesuai yg diisi sblmnya
    getId("project-input").value = project.querySelector(".project-title").innerHTML;
    getId("description-input").value = project.querySelector(".project-des").innerHTML;
    getId("node").checked = project.querySelector(".fa-brands.fa-node-js") ? true : false;
    getId("next").checked = project.querySelector(".next-js") ? true : false;
    getId("react").checked = project.querySelector(".fa-brands.fa-react") ? true : false;
    getId("ts").checked = project.querySelector(".ts") ? true : false;

    // Add Cancel Button
    const cancelBtn = document.createElement("button");
    cancelBtn.innerHTML = "Cancel ";
    cancelBtn.id = "cancel-btn";
    const buttonGroup = document.querySelector(".form-btns");
    buttonGroup.appendChild(cancelBtn);
    


    // Add Update Button and Remove Submit button
     const updateBtn = document.createElement("button");
     updateBtn.innerHTML = "Update";
     updateBtn.id = "update-btn";

     const submitBtn = document.getElementById("submit-btn");
     submitBtn.remove();
     cancelBtn.parentElement.appendChild(updateBtn);
     cancelBtn.addEventListener("click",cancelEdit) 
     updateBtn.addEventListener("click",(e)=> checkForm(e,true,project))


    // Can't use other delete and edit buttons while on editing mode 
    const editBtns = document.querySelectorAll(".edit-btn");
    editBtns.forEach((btn)=>{
        btn.disabled = true
    })
    const deleteBtns = document.querySelectorAll(".delete-btn");
    deleteBtns.forEach((btn)=>{
        btn.disabled = true
    })

    alert(`On Editing Mode, all delete and edit project buttons are disabled! 
    Please click update or cancel button to exit Editing Mode`)
}
             // when click cancel
function cancelEdit(e){
    e.preventDefault();
   
    // Remove cancel button and update btn
    
       document.getElementById("update-btn").remove();
       e.currentTarget.remove();

    // Add submit button
    const buttonGroup = document.querySelector(".form-btns");
    const submitBtn = document.createElement("button");

    submitBtn.innerHTML = "Submit"
    submitBtn.id = "submit-btn";
    buttonGroup.appendChild(submitBtn);
    submitBtn.addEventListener("click",checkForm)

    //  Give all edit and delete buttons back their power
    const editBtns = document.querySelectorAll(".edit-btn");
    editBtns.forEach((btn)=>{btn.disabled = false})
    const deleteBtns = document.querySelectorAll(".delete-btn");
    deleteBtns.forEach((btn)=>{btn.disabled = false})
    
    // Default
    clearInputs();
    alert("Editing canceled")
    
}
              // after clicking update
function updateForm(newProjectData,oldProject){
    oldProject.querySelector(".project-img").src = newProjectData.image;
    oldProject.querySelector(".project-title").innerHTML = newProjectData.name;
    oldProject.querySelector(".project-duration").innerHTML = "durasi: " + getTime(newProjectData.start,newProjectData.end);
    oldProject.querySelector(".project-des").innerHTML = newProjectData.desc;
   !newProjectData.techs[0] && oldProject.querySelector(".fa-brands.fa-node-js") && oldProject.querySelector(".fa-brands.fa-node-js").remove();
   !newProjectData.techs[1] && oldProject.querySelector(".fa-brands.fa-react") && oldProject.querySelector(".fa-brands.fa-react").remove();
   !newProjectData.techs[2] && oldProject.querySelector(".next-js") && oldProject.querySelector(".next-js").remove();
   !newProjectData.techs[3] && oldProject.querySelector(".ts") && oldProject.querySelector(".ts").remove();

      // Remove cancel button and update btn
    document.getElementById("update-btn").remove();
    document.getElementById("cancel-btn").remove();

   // Add submit button
   const buttonGroup = document.querySelector(".form-btns");
   const submitBtn = document.createElement("button");

   submitBtn.innerHTML = "Submit"
   submitBtn.id = "submit-btn";
   buttonGroup.appendChild(submitBtn);
   submitBtn.addEventListener("click",checkForm)

   //    Give all edit buttons back their power
   const editBtns = document.querySelectorAll(".edit-btn");
   editBtns.forEach((btn)=>{btn.disabled = false})

   const deleteBtns = document.querySelectorAll(".delete-btn");
   deleteBtns.forEach((btn)=>{btn.disabled = false})

//    clear
    alert("Old project updated");
    clearInputs()
}

                                     // Helper functions

            //    get calculations
function getId (id){
    return document.getElementById(id)
}

function getTime(start,end){
    
    // YYYY/MM/DD

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

        //   checking calculations
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

function validateDate(start,end){
    // FORMAT yyyy/mm/dd  

    // start data
    const startYear = Number(start.slice(0,4));
    const startMonth = Number(start[5]) == 0 ? Number(start[6]) : Number(start[5] + start[6]);
    const startDay = Number(start[8]) == 0 ? Number(start[9]) : Number(start[8] + start[9]);

    // end data
    const endYear = Number(end.slice(0,4));
    const endMonth = Number(end[5]) == 0 ? Number(end[6]) : Number(end[5] + end[6]);
    const endDay = Number(end[8]) == 0 ? Number(end[9]) : Number(end[8] + end[9]);

    // logic 
          // validate year
    if(endYear < startYear ){
        return false
    }
         // validate month
    if(endMonth < startMonth && endYear == startYear ){
        return false
    }
         // validate day
    if( endDay < startDay && endMonth == startMonth && endYear == startYear){
        return false
    }
     
    return true;
}

        // action
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
window.location.href = "https://chapter1-day4.vercel.app/single.html";
}; 



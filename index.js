const submitBtn = document.getElementById("submit-btn");

// Listener
submitBtn.addEventListener("click", checkForm);


// CREATE FUNCTION
function checkForm(e){
    e.preventDefault();

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
        image: URL.createObjectURL(getId("file-input").files[0])
    };

    // Filter
    if(!project.name){ return alert("Name can't be empty.")}

    if(!project.start || !project.end){return alert("Date can't be empty.")}

    if(!project.desc){ return alert("Descriptions can't be empty.")}

    if(project.techs.every(item => item === false)){return alert("Please choose at least one technology")}

    if(!project.image) return alert("Image can't be empty")


    // Submit
    submitForm(project)


}

function submitForm(project){
    const projectList = document.getElementById("project-list");
    const newProject = document.createElement("a");
    newProject.classList.add("project");
    newProject.href = "./single.html";

    newProject.innerHTML = `
          
    <img src=${project.image} width="100%" alt="">
    <span class="project-title">${project.name}</span>
    <p class="project-duration">durasi: ${getTime(project.start,project.end)}</p>
    <p class="project-des">${project.desc}</p>

    <div class="project-logos">
       ${project.techs[0] ? `<i class="fa-brands fa-node-js"></i>` : ""}
       ${project.techs[2] ? `<i class="fa-brands fa-react"></i>` : ""}
       ${project.techs[1] ? `<img src="./assets/nextjs.webp" width="40px">` : ""}
       ${project.techs[3] ? ` <img src="./assets/typescript_original_logo_icon_146317.png" width="24px" >` : ""}
    </div>
     
    <div class="project-buttons">
        <button class="edit-btn">Edit</button>
        <button class="delete-btn" >Delete</button>
    </div>
    
    `
    projectList.appendChild(newProject);

    // ADD LISTENERS

    newProject.addEventListener("click", ()=>{
        location.href = "http://localhost:5500/Chapter1-day4/single.html";
    })

    const deleteBtn = newProject.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deletePost);
   
    // Delete "no posts, please ..." kalo ada
    isPostEmpty();

    // Clear input
    clearInputs();
    
}

// DELETE FUNCTION
function deletePost(e){
       e.stopPropagation();
       e.stop

       const project = e.currentTarget.parentElement.parentElement;
       project.remove()

      console.log("Executed");
      console.log(e)
      // Add "no posts, please ..." kalo posts kosong
      isPostEmpty();
}





// Helper functions
function getId (id){
    return document.getElementById(id)
}

function getTime(start,end){
    if(start[5] == 0){start = start[6]}else{start = start[5]+start[6]}
    if(end[5] == 0){end = end[6]}else{end = end[5] + end[6]};
    const startMonth = Number(start);
    const endMonth = Number(end);

    const duration = endMonth - startMonth;
    
    if(duration === 0) return "Dibawah sebulan"

    return endMonth - startMonth + " " + "bulan"
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
     getId("node").checked = "";
     getId("next").checked = "";
     getId("react").checked = "";
     getId("ts").checked = "";
    //  getId("file-input").files = "";
}


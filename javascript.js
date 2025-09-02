//HOME PAGE NAVIGATION
const home = document.querySelector(".Logo"); 
home.addEventListener("click", () =>{
  window.location.href = "/gpaCalculator/index.html"
})

//GET COURSE NAME
const addCourse = document.getElementById("addCourse"); 
const courseInput = document.getElementById("courseInput");
const form = document.querySelector(".container");

function createCourse(){
  let inputName = courseInput.value; 
    if(inputName){
      form.innerHTML += `
      <div class="courseEntry">
      <div id="courseName">${inputName}</div>
      <div class="task">
        <input type="text" placeholder="Test/Assignment" required>
        <input type="number" placeholder="Weight" required style="width: 9ch;">
        <input type="number" placeholder="Grade 0-100" required style="width: 12ch;">
      </div>
      <div class="bottom">
        <button>Add Test/Assignment</button>
        <button>Delete Course</button>
        <button id="courseGPA">Calculate Course GPA</button>
      </div>
      `;
      courseInput.value = ""; 
    }
}

addCourse.addEventListener("click", () => {
  createCourse();
})

//CALCULATE COURSE GPA
const courseGPA = document.getElementById("courseGPA");

//HOME PAGE NAVIGATION
const home = document.querySelector(".Logo");
home.addEventListener("click", () => {
  window.location.href = "/gpaCalculator/index.html"
})

//GET COURSE NAME
const addCourse = document.getElementById("addCourse");
const courseInput = document.getElementById("courseInput");
const form = document.querySelector(".container");

function createCourse() {
  let inputName = courseInput.value;
  if (inputName) {
    form.innerHTML += `
      <div class="courseEntry">
      <div class="courseName">${inputName}</div>
      <div class="task">
        <input type="text" placeholder="Test/Assignment" required class="task">
        <input type="number" placeholder="Weight %" required style="width: 9ch;" class="weight">
        <input type="number" placeholder="Grade 0-100" required style="width: 12ch;" class="weight">
      </div>
      <div class="bottom">
        <button class="bottomButtons">Add Test/Assignment</button>
        <button class="bottomButtons">Delete Course</button>
        <button class="bottomButtons">Calculate Course GPA</button>
      </div>
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


//ADD COURSE 

const addTask = document.querySelector(".addTask");

addTask.addEventListener("click", () => {
  let taskName = document.querySelector(".task");
  let inputName = taskName.value;

  let formWeight = document.querySelector(".weight");
  let inputWeight = formWeight.value;

  let formGrade = document.querySelector(".grade");
  let inputGrade = formGrade.value;

  if(inputName && inputWeight && inputGrade) {
    form.innerHTML += `
      <div>
        ${inputName}
        ${inputWeight}
        ${inputGrade}
      </div>
      `;
    inputName = "";
    inputWeight = "";
    inputGrade = "";
  }
})
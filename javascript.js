const home = document.querySelector(".Logo");
home.addEventListener("click", () => {
  window.location.href = "/gpaCalculator/index.html";
});

const addCourse = document.getElementById("addCourse");
const courseInput = document.getElementById("courseInput");
const form = document.querySelector(".container");

function createCourse() {
  let inputName = courseInput.value;
  if (inputName) {
    form.insertAdjacentHTML("beforeend", `
      <div class="courseEntry">
        <div class="courseName">${inputName}</div>
        <div class="taskContainer">
          <input type="text" placeholder="Test/Assignment" required class="task">
          <input type="number" placeholder="Weight %" required style="width: 9ch;" class="weight">
          <input type="number" placeholder="Grade 0-100" required style="width: 12ch;" class="grade">
          <button class="bottomButtons addTask">Add Test/Assignment</button>
        </div>
        <div class="bottom">
          <button class="bottomButtons">Delete Course</button>
          <button class="bottomButtons">Calculate Course GPA</button>
        </div>
      </div>
    `);
    courseInput.value = "";
  }
}

addCourse.addEventListener("click", createCourse);

form.addEventListener("click", (event) => {
  if (event.target.classList.contains("addTask")) {
    const courseEntry = event.target.closest(".courseEntry");
    const taskContainer = courseEntry.querySelector(".taskContainer");
    const taskName = courseEntry.querySelector(".task").value;
    const inputWeight = courseEntry.querySelector(".weight").value;
    const inputGrade = courseEntry.querySelector(".grade").value;

    if (taskName && inputWeight && inputGrade) {
      taskContainer.insertAdjacentHTML("afterend", `
        <div class="taskEntry">
          ${taskName} | Weight: ${inputWeight}% | Grade: ${inputGrade}%
        </div>
      `);
      courseEntry.querySelector(".task").value = "";
      courseEntry.querySelector(".weight").value = "";
      courseEntry.querySelector(".grade").value = "";
    }
  }
});
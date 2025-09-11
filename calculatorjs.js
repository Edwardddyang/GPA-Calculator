//SCROLLING ANIMATION
function scroll() {
  const body = document.querySelectorAll(".scroll");
  body.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (elementTop < windowHeight * 1.0) {
      element.classList.add('visible');
    }
  });
}
window.addEventListener("load", () => {
  setTimeout(scroll, 100);
});
window.addEventListener("scroll", scroll);

//NAVIGATION LINKS
const home = document.querySelector(".Logo");
home.addEventListener("click", () => {
  window.location.href = "/gpaCalculator/index.html";
});

//ADD COURSE 

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
          <input type="number" placeholder="Weight %" required class="weight">
          <input type="number" placeholder="Grade 0-100" required class="grade">
          <button class="bottomButtons addTask">Add Task</button>
        </div>
        <div class="bottom">
          <button class="bottomButtons deleteCourse">Delete Course</button>
        </div>
      </div>
    `);
    courseInput.value = "";
  }
}

addCourse.addEventListener("click", createCourse);


//PERCENTAGE TO GPA 
function percentageToGPA(percentage) {
  if (percentage >= 90) return 4.0;
  if (percentage >= 85) return 3.9;
  if (percentage >= 80) return 3.7;
  if (percentage >= 77) return 3.3;
  if (percentage >= 73) return 3.0;
  if (percentage >= 70) return 2.7;
  if (percentage >= 67) return 2.3;
  if (percentage >= 63) return 2.0;
  if (percentage >= 60) return 1.7;
  if (percentage >= 57) return 1.3;
  if (percentage >= 53) return 1.0;
  if (percentage >= 50) return 0.7;
  return 0.0;
}


//CALCULATE COURSE GPA 
function calculateCourseGPA(courseEntry) {
  const taskEntries = courseEntry.querySelectorAll(".inputtedTask");

  if (taskEntries.length === 0) {
    alert("No tasks found");
    return null;
  }

  let totalWeightedScore = 0;
  let totalWeight = 0;

  taskEntries.forEach(taskEntry => {
    const text = taskEntry.textContent;
    const weightMatch = text.match(/Weight:\s*(\d+(?:\.\d+)?)%/);
    const gradeMatch = text.match(/Grade:\s*(\d+(?:\.\d+)?)%/);

    if (weightMatch && gradeMatch) {
      const weight = parseFloat(weightMatch[1]);
      const grade = parseFloat(gradeMatch[1]);

      totalWeightedScore += (grade * weight);
      totalWeight += weight;
    }
  });

  if (totalWeight === 0) {
    alert("No valid tasks with weights found.");
    return null;
  }

  // Calculate weighted average
  const weightedAverage = totalWeightedScore / totalWeight;

  // Convert to GPA
  const gpa = percentageToGPA(weightedAverage);

  return {
    percentage: weightedAverage.toFixed(2),
    gpa: gpa.toFixed(2)
  };
}

//ADD TASK 
form.addEventListener("click", (event) => {
  if (event.target.classList.contains("addTask")) {
    const courseEntry = event.target.closest(".courseEntry");
    const taskContainer = courseEntry.querySelector(".taskContainer");
    const taskName = courseEntry.querySelector(".task").value;
    const inputWeight = courseEntry.querySelector(".weight").value;
    const inputGrade = courseEntry.querySelector(".grade").value;

    if (taskName && inputWeight && inputGrade) {
      const weight = parseFloat(inputWeight);
      const grade = parseFloat(inputGrade);

      if (weight <= 0 || weight > 100) {
        alert("Invalid Weight");
        return;
      }

      if (grade < 0 || grade > 100) {
        alert("Invalid Grade");
        return;
      }

      taskContainer.insertAdjacentHTML("afterend", `
        <div class="inputtedTask">
          ${taskName} | Weight: ${inputWeight}% | Grade: ${inputGrade}%
          <button class="deleteTask" style="margin-left: 10px; font-size: 0.8em;">Delete</button>
        </div>
      `);

      // Clear inputs
      courseEntry.querySelector(".task").value = "";
      courseEntry.querySelector(".weight").value = "";
      courseEntry.querySelector(".grade").value = "";


    } else {
      alert("Please fill in all fields (Task name, Weight, and Grade)");
    }
  }

  // Handle Delete Task button
  if (event.target.classList.contains("deleteTask")) {
    const taskEntry = event.target.closest(".inputtedTask");
    const courseEntry = event.target.closest(".courseEntry"); // Get this BEFORE removing
    taskEntry.remove();

    // Calculate GPA immediately after deletion
    const courseName = courseEntry.querySelector(".courseName").textContent;
    const result = calculateCourseGPA(courseEntry);

    if (result) {
      const existingGPA = courseEntry.querySelector(".gpaDisplay");
      if (existingGPA) {
        existingGPA.remove();
      }

      const bottom = courseEntry.querySelector(".bottom");
      bottom.insertAdjacentHTML("beforebegin", `
            <div class="gpaDisplay">
                <strong>${courseName}</strong><br>
                Final Grade: ${result.percentage}%<br>
                GPA: ${result.gpa}/4.0
            </div>
        `);
    }
  }

  // Handle Delete Task button
  if (event.target.classList.contains("deleteTask")) {
    const taskEntry = event.target.closest(".inputtedTask");
    taskEntry.remove();
  }

  //CALCULATE + DISPLAY COURSE GPA 
  if (event.target.classList.contains("addTask")) {
    const courseEntry = event.target.closest(".courseEntry");
    const courseName = courseEntry.querySelector(".courseName").textContent;

    const result = calculateCourseGPA(courseEntry);

    if (result) {
      const existingGPA = courseEntry.querySelector(".gpaDisplay");
      if (existingGPA) {
        existingGPA.remove();
      }

      // Add GPA display
      const bottom = courseEntry.querySelector(".bottom");
      bottom.insertAdjacentHTML("beforebegin", `
        <div class="gpaDisplay" style="margin: 10px 0; padding: 10px; border: 2px solid #4CAF50; border-radius: 5px; text-align: center;">
          <strong>${courseName}</strong><br>
          Final Grade: ${result.percentage}%<br>
          GPA: ${result.gpa}/4.0
        </div>
      `);
    }
  }

  //DELETE COURSE 
  if (event.target.classList.contains("deleteCourse")) {
    const courseEntry = event.target.closest(".courseEntry");
    const courseName = courseEntry.querySelector(".courseName").textContent;

    if (confirm(`Are you sure you want to delete"${courseName}"?`)) {
      courseEntry.remove();
    }
  }



  //CALCULATE ENTIRE GPA


});
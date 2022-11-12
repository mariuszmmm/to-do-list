{
  const tasks = [
    {
      content: "zadanie_1",
      done: false,
    },
    {
      content: "zadanie_2",
      done: true,
    },
  ];

  const addNewTas = (newTaskContent) => {
    tasks.push({
      content: newTaskContent,
    });
    render();
  };

  const removeTask = (taskIndex) => {
    tasks.splice(taskIndex, 1);
    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks[taskIndex].done = !tasks[taskIndex].done;
    render();
  };

  const bindEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });

    const toggleDoneButtons = document.querySelectorAll(".js-done");

    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });
  };

  const render = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `  
        <li
          ${task.done ? " class=\"list__done\"" : ""}
        >
          <button class="js-done">"zrobione"</button>
          <button class="js-remove">"usuń"</button>
          ${task.content}
        </li>
      `;
    };

    document.querySelector(".js-tasks").innerHTML = htmlString;

    bindEvents();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskContent = document.querySelector(".js-newTask").value.trim();

    if (newTaskContent === "") {
      return;
    }

    addNewTas(newTaskContent);
  };

  const init = () => {
    render();
    
    const form = document.querySelector(".js-form");
    
    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
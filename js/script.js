{
  let tasks = [];
  let hideDoneButton = false;
  let allDoneButton = false;
  let hideDoneTasks = false;

  const hideDone = () => {
    hideDoneButton = (tasks.some(({ done }) => done));
  };

  const allDone = () => {
    allDoneButton = !(tasks.every(({ done }) => done));
  };

  const toggleHideDone = () => {
    hideDoneTasks = !hideDoneTasks
    render();
  };

  const setAllDone = () => {
    tasks = tasks.map(task => ({ ...task, done: true }));
    hideDone();
    allDone();
    render();
  };

  const removeTask = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      ...tasks.slice(taskIndex + 1),
    ];
    hideDone();
    allDone();
    render();
  };

  const toggleTaskDone = (taskIndex) => {
    const done = !tasks[taskIndex].done
    tasks = [
      ...tasks.slice(0, taskIndex),
      { ...tasks[taskIndex], done },
      ...tasks.slice(taskIndex + 1),
    ];
    hideDone();
    allDone();
    render();
  };

  const addNewTas = (newTaskContent) => {
    tasks = [
      ...tasks,
      { content: newTaskContent }
    ];
    allDoneButton = (tasks.length > 0);
    render();
  };

  const bindRemoveEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, taskIndex) => {
      removeButton.addEventListener("click", () => {
        removeTask(taskIndex);
      });
    });
  };

  const bindToggleEvents = () => {
    const toggleDoneButtons = document.querySelectorAll(".js-toggleDone");

    toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(taskIndex);
      });
    });
  };

  const renderTasks = () => {
    let tasksListHTMLContent = "";

    for (const task of tasks) {
      tasksListHTMLContent += `  
        <li class="tasks__item ${(task.done && hideDoneTasks) ? "task__item--hide\"" : "\""}>
          <button class="tasks__button tasks__button--toggleDone js-toggleDone">
            ${task.done ? "✔" : ""}
          </button>
          <p class="tasks__content ${task.done ? "tasks__content--toggleDone\"" : "\""}>
            ${task.content}
          </p>
          <button class="tasks__button tasks__button--remove js-remove">
          🗑︎
          </button>
        </li>
      `;
    };

    document.querySelector(".js-tasks").innerHTML = tasksListHTMLContent;
  };

  const renderButtons = () => {
    let buttonsListHTMLContent = "";

    if (tasks.length > 0) {
      buttonsListHTMLContent = ` 
        <button ${hideDoneButton ? "" : "disabled"} class="header__button js-hideDone">
          ${hideDoneTasks ? "Pokaż ukończone" : "Ukryj ukończone"}
        </button>
        <button ${allDoneButton ? "" : "disabled"} class="header__button js-allDone">
          Ukończ wszystkie
        </button>
      `;
    };

    document.querySelector(".js-buttons").innerHTML = buttonsListHTMLContent;
  };

  const bindButtonsEvents = () => {

    const hideDoneButtons = document.querySelector(".js-hideDone");
    hideDoneButtons.addEventListener("click", () => {
      toggleHideDone();
    });

    const allDoneButtons = document.querySelector(".js-allDone");
    allDoneButtons.addEventListener("click", () => {
      setAllDone();
    });
  };

  const render = () => {
    renderTasks();
    renderButtons();
    bindRemoveEvents();
    bindToggleEvents();
    if (tasks.length > 0) {
      bindButtonsEvents();
    }
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskContent = document.querySelector(".js-newTask").value.trim();
    const newTask = document.querySelector(".js-newTask")
    if (newTaskContent === "") {
      newTask.value = "";
      newTask.focus();
      return;
    };

    addNewTas(newTaskContent);
    newTask.value = "";
    newTask.focus();
  };

  const init = () => {
    render();
    const form = document.querySelector(".js-form");
    form.addEventListener("submit", onFormSubmit);
  };
  init();
}


{
  let tasks = [];

  const addNewTas = (newTaskContent) => {
    tasks = [
      ...tasks,
      { content: newTaskContent },
    ];
    render();
  };

  const removeTask = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      ...tasks.slice(taskIndex + 1),
    ];
    render();
  };

  const toggleTaskDone = (taskIndex) => {
    const done = !tasks[taskIndex].done
    tasks = [
      ...tasks.slice(0, taskIndex),
      { ...tasks[taskIndex], done},
      ...tasks.slice(taskIndex + 1),
    ];
    render();
  };

  const bindEvents = () => {
    const toggleDoneButtons = document.querySelectorAll(".js-toggleDone");

    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });

    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });
  };

  const render = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `  
        	<li class="tasks__item">
          		<button class="tasks__button tasks__button--toggleDone js-toggleDone">
          			${task.done ? "🗸" : ""}
				      </button>
          		<p class="tasks__content ${task.done ? "tasks__content--toggleDone\"" : "\""}>
					      ${task.content}
          		</p>
          		<button class="tasks__button tasks__button--remove js-remove">🗑︎</button>
        	</li>
      		`;
    };

    document.querySelector(".js-tasks").innerHTML = htmlString;
    bindEvents();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskContent = document.querySelector(".js-newTask").value.trim();
    const newTask = document.querySelector(".js-newTask")
    if (newTaskContent === "") {
      newTask.value = "";
      newTask.focus();
      return;
    }

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


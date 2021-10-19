let title_task = document.getElementById("title-task");
let description_task = document.getElementById("description-task");
let list_container = document.getElementById("list-container");
let save_btn = document.getElementById("save-btn");
let task_detail_dialog = document.getElementById("task-detail-dialog");
let close_dialog = document.getElementById("close-dialog");
let tasks = [];

const get_data_localstorage = () => {
  tasks = [];
  if (localStorage.getItem("tasks") != null) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
};

const set_data_localstorage = () => {
  let data = {
    id: tasks.length + 1,
    title: title_task.value,
    description: description_task.value,
    complete: false,
  };
  tasks.push(data);

  localStorage.setItem("tasks", JSON.stringify(tasks));
  print_tasks();

  title_task.value = "";
  description_task.value = "";
};

const print_tasks = () => {
  get_data_localstorage();
  list_container.innerHTML = "";
  tasks.forEach((e) => {
    list_container.insertAdjacentHTML(
      "beforeend",
      `
        <div class="item">
            <div class="right">
              <input class="check" id="check-${e.id}" type="checkbox" ${
        e.complete ? "checked" : ""
      }>
              <p>${e.title}</p>
            </div>
            <div class="left">
              <img class="detail-btn" src="img/eye.svg" alt="" />
              <img src="img/edit.svg" alt="" />
              <img src="img/delete.svg" alt="" />
            </div>
          </div>
        
        `
    );
  });
};

const change_complete_state = (event) => {
  let res = tasks.find((e) => "check-" + e.id == event.target.id);
  if (res) {
    res.complete = !res.complete;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
};

save_btn.addEventListener("click", () => {
  set_data_localstorage();
});

list_container.addEventListener("change", (event) => {
  change_complete_state(event);
});
list_container.addEventListener("click", (event) => {
  if (event.target.matches(".detail-btn")) {
    task_detail_dialog.showModal();
  }
});
close_dialog.addEventListener("click", () => {
  task_detail_dialog.close();
});
print_tasks();

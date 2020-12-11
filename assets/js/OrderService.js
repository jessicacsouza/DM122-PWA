const doneCssClass = 'done';

export default class HtmlService {
    constructor(todoService) {
      this.todoService = todoService;
      this.bindFormEvent();
      this.listTasks();
    }
  
    bindFormEvent() {
      const form = document.querySelector("form");
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        this.addTask(form.nome.value, form.marca.value);
        form.reset();
        form.nome.focus();
        form.marca.focus();
      });
    }
  
    async addTask(description, marca) {
      const task = { description, marca, done: false };
      const taskId = await this.todoService.save(task);
      task.id = taskId;
      this.addToHtmlList(task);
    }
  
    async listTasks() {
      const tasks = await this.todoService.getAll();
      tasks.forEach((task) => this.addToHtmlList(task));
    }
  
    async deleteTask(li) {
        const taskId = this.getTaskId(li);
        await this.todoService.delete(taskId);
        li.remove();
    }

    toogleTask(li, span, task, button2) {
        const taskId = this.getTaskId(li);
        li.classList.toggle(doneCssClass);
        const isDone = li.classList.contains(doneCssClass);
        if (isDone == true) {
          span.textContent = task.description + " (pedido cancelado)";
        }

        this.saveTask(taskId, isDone);
    }

    async saveTask(taskId, isDone) {
        const task = await this.todoService.get(taskId);
        task.done = isDone;
        await this.todoService.save(task)
    }

    getTaskId(li) {
        return +li.getAttribute("data-item-id");
    }  

    addToHtmlList(task) {
      const ul = document.querySelector("ul");
      const li = document.createElement("li");
      const span = document.createElement("span");
      const button = document.createElement("button");
      const button2 = document.createElement("button");

      span.textContent = task.description;

      li.setAttribute("data-item-id", task.id);

      button2.textContent = "Cancelar pedido";
      button2.addEventListener("click", (event) => {
        this.toogleTask(li, span, task, button2);
      });

      button.textContent = "x";
      button.addEventListener("click", (event) => {
          event.stopPropagation();
          this.deleteTask(li);
      });

      if (task.done) {
        li.classList.add(doneCssClass);
      }
  
      li.appendChild(span);
      li.appendChild(button2);
      li.appendChild(button);
      ul.appendChild(li);
    }
  }
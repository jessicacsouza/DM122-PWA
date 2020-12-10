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

    toogleTask(li) {
        const taskId = this.getTaskId(li);
        li.classList.toggle(doneCssClass);
        const isDone = li.classList.contains(doneCssClass);
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
  
      span.textContent = task.description + task.marca;
      span.textContent = task.marca;

      li.setAttribute("data-item-id", task.id);
      li.addEventListener('click', () => this.toogleTask(li));

      button.textContent = "x";
      button.addEventListener("click", (event) => {
          event.stopPropagation();
          this.deleteTask(li);
      });
  
      if (task.done) {
        li.classList.add(doneCssClass);
      }
  
      li.appendChild(span);
      li.appendChild(button);
      ul.appendChild(li);
    }
  }
const doneCssClass = 'done';

export default class HtmlService {
    constructor(todoService) {
      this.todoService = todoService;
      this.bindFormEvent();
    }
  
    bindFormEvent() {
      const form = document.querySelector("form");
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        this.addTask(form.nome.value, form.marca.value, form.quantidade.value, form.endereco.value);
        form.reset();
        form.nome.focus();
        form.marca.focus();
      });
    }
  
    async addTask(description, marca, quantidade, endereco) {
      const task = { description, marca, quantidade, endereco, done: false };
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
      const li = document.createElement("li");
      const span = document.createElement("span");

      li.setAttribute("data-item-id", task.id);
      li.addEventListener('click', () => this.toogleTask(li));

      if (task.done) {
        li.classList.add(doneCssClass);
      }
  
      li.appendChild(span);
    }
  }
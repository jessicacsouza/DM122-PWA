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
          button2.style.color = "transparent";
          button2.innerHTML = '<span class="no-click"></span>';
        }

        this.saveTask(taskId, isDone);
    }

    async saveTask(taskId, isDone) {
        const task = await this.todoService.get(taskId);
        if (isDone == true) {
           task.description = task.description + " (pedido cancelado)"
        }
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
      
      const tabela = document.getElementById("table");

      var linha   = tabela.insertRow(-1);

      var coluna1 = linha.insertCell(0);
      var coluna2 = linha.insertCell(1);
      var coluna3 = linha.insertCell(2);
      var coluna4 = linha.insertCell(3);
      var coluna5 = linha.insertCell(4);
      var coluna6 = linha.insertCell(5);

      coluna1.innerHTML = task.description;
      coluna2.innerHTML = task.marca;
      coluna3.innerHTML = task.quantidade;
      coluna4.innerHTML = task.endereco;
      coluna5.innerHTML = '<span class="material-icons">cancel</span>';
      coluna6.innerHTML = '<span class="material-icons">delete</span>';

     // span.textContent = task.description + " " + task.marca + " " + task.quantidade + " " + task.endereco;

      li.setAttribute("data-item-id", task.id);

      button2.innerHTML = '<span class="material-icons">cancel</span>';
      button2.style.color = '#a60a05';
      button2.addEventListener("click", (event) => {
        this.toogleTask(li, span, task, button2);
      });

      button.innerHTML = '<span class="material-icons">delete</span>';
      button.style.color = '#915856';
      button.addEventListener("click", (event) => {
          event.stopPropagation();
          this.deleteTask(li);
      });

      if (task.done) {
        li.classList.add(doneCssClass);
      }
  
      li.appendChild(span);
      
      if (task.done == false) {
        li.appendChild(button2); 
      }

      li.appendChild(button);
      ul.appendChild(li);
    }
  }
const doneCssClass = 'done';

export default class OrderService {
    constructor(todoService) {
      this.todoService = todoService;
      this.listTasks();
    }
  
    async listTasks() {
      const tasks = await this.todoService.getAll();
      tasks.forEach((task) => this.addToHtmlList(task));
    }
  
    async deleteTask(task, linha) {
        const taskId = task.id;
        await this.todoService.delete(taskId);
        linha.remove();
    }

    toogleTask(task) {
        const taskId = task.id;
        this.saveTask(taskId, task.done);
    }

    async saveTask(taskId, isDone) {
        const task = await this.todoService.get(taskId);
        if (isDone == true) {
           task.description = task.description + " (pedido cancelado)"
        }
        task.done = isDone;
        await this.todoService.save(task)
    }

    addToHtmlList(task) {
      const ul = document.querySelector("ul");
      const buttonDelete = document.createElement("button");
      const buttonCancel = document.createElement("button");
      
      const tabela = document.getElementById("table");

      var linha   = tabela.insertRow(-1);

      var columnProductName = linha.insertCell(0);
      var columnBrand = linha.insertCell(1);
      var columnQuantity = linha.insertCell(2);
      var columnAddress = linha.insertCell(3);
      var columnCancel = linha.insertCell(4);
      var columnDelete = linha.insertCell(5);

      columnProductName.innerHTML = task.description;
      columnBrand.innerHTML = task.marca;
      columnQuantity.innerHTML = task.quantidade;
      columnAddress.innerHTML = task.endereco;

      buttonCancel.innerHTML = '<span class="material-icons">cancel</span>';
      buttonCancel.style.color = '#a60a05';
      buttonCancel.addEventListener("click", (event) => {
        task.done = true;
        buttonCancel.remove();
        columnProductName.innerHTML = task.description + " (pedido cancelado)";
        this.toogleTask(task);
      });

      buttonDelete.innerHTML = '<span class="material-icons">delete</span>';
      buttonDelete.style.color = '#915856';
      buttonDelete.addEventListener("click", (event) => {
          event.stopPropagation();
          this.deleteTask(task, linha);
      });
    
      if (task.done == false) {
        columnCancel.appendChild(buttonCancel); 
      }

      columnDelete.appendChild(buttonDelete);
      ul.appendChild(tabela);
    }
  }
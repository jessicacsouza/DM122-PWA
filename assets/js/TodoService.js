import Dexie from "https://cdn.jsdelivr.net/npm/dexie@3.0.3/dist/dexie.mjs";

let db;

export default class TodoService {
  constructor() {
    this.initializeDB();
  }

  initializeDB() {
    db = new Dexie("todoDB");

    db.version(3).stores({
      tasks: "++id,description,marca,quantidade,endereco",
    });

    db.on("populate", async () => {
      await db.tasks.bulkPut([
        { description: "Shampoo", marca : "Haskel", quantidade: 1, endereco: "Rua João, 175, Centro", done: false },
        { description: "Condicionador", marca : "Haskel", quantidade: 1, endereco: "Rua João, 175, Centro", done: false },
        { description: "Máscara", marca : "Haskel", quantidade: 1, endereco: "Rua João, 175, Centro", done: false },
        { description: "Leave-in Anti-Frizz", marca : "Haskel", quantidade: 1, endereco: "Rua João, 175, Centro", done: false },
      ]);
    });

    db.open();
  }

  getAll() {
    return db.tasks.toArray();
  }

  get(id) {
    return db.tasks.get(id);
  }

  save(task) {
    return db.tasks.put(task);
  }

  delete(id) {
    return db.tasks.delete(id);
  }
}
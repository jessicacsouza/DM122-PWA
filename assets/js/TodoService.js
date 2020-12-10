import Dexie from "https://cdn.jsdelivr.net/npm/dexie@3.0.3/dist/dexie.mjs";

let db;

export default class TodoService {
  constructor() {
    this.initializeDB();
  }

  initializeDB() {
    db = new Dexie("todoDB");

    db.version(1).stores({
      tasks: "++id,description,marca",
    });

    db.on("populate", async () => {
      await db.tasks.bulkPut([
        { description: "Learn JavaScript", marca : "Teste", done: true },
        { description: "Learn TypeScript", marca : "Teste", done: false },
        { description: "Learn PWA", marca : "Teste", done: false },
        { description: "Learn HTML5 APIs", marca : "Teste", done: false },
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
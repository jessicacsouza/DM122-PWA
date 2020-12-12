import { set as setItem, get as getItem, keys as getKeys }
    from 'https://cdn.jsdelivr.net/npm/idb-keyval@3/dist/idb-keyval.mjs';

import HtmlService from './HtmlService.js';    
import TodoService from './TodoService.js';

class NewOrder {
    constructor() {
        console.log("Initialized");

        new HtmlService(new TodoService());
    }
}

new NewOrder();
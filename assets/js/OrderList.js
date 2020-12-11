import { set as setItem, get as getItem, keys as getKeys }
    from 'https://cdn.jsdelivr.net/npm/idb-keyval@3/dist/idb-keyval.mjs';

import OrderService from './OrderService.js';    
import TodoService from './TodoService.js';

class OrderList {
    constructor() {
        console.log("Initialized");

        new OrderService(new TodoService());
    }
}

new OrderList();
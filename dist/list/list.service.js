"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListService = void 0;
const common_1 = require("@nestjs/common");
let ListService = class ListService {
    constructor() {
        this.list = [];
    }
    findAll() {
        return this.list;
    }
    create(todoDto) {
        this.list.push(Object.assign(Object.assign({}, todoDto), { id: Date.now().toString() }));
    }
    deleteById(id) {
        const index = this.list.findIndex(elem => elem.id === id);
        if (index === -1) {
            throw new common_1.NotFoundException();
        }
        this.list.splice(index);
        return { message: 'Todo Deleted' };
    }
    updateTOdo(updateTodoDto, id) {
    }
};
ListService = __decorate([
    common_1.Injectable()
], ListService);
exports.ListService = ListService;
//# sourceMappingURL=list.service.js.map
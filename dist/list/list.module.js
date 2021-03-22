"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const list_controller_1 = require("./list.controller");
const list_service_1 = require("./list.service");
const list_schema_1 = require("./schemas/list.schema");
let listModule = class listModule {
};
listModule = __decorate([
    common_1.Module({
        providers: [list_service_1.ListService],
        controllers: [list_controller_1.ListController],
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: list_schema_1.List.name, schema: list_schema_1.ListSchema }])
        ]
    })
], listModule);
exports.listModule = listModule;
//# sourceMappingURL=list.module.js.map
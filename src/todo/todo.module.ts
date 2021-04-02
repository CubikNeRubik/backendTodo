import { Module } from "@nestjs/common";

import { TodoController } from "./todo.controller";
import { TodoService } from "./todo.service";
import { DataModule } from "../data/data.module";

@Module({
    providers:[TodoService],
    controllers:[TodoController],
    imports:[DataModule]
})

export class TodoModule{

}
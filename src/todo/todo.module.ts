import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { CounterModule } from "../counter/counter.module";
import { CounterService } from "../counter/counter.service";
import { TodoController } from "./todo.controller";
import { TodoService } from "./todo.service";
import { TodoItem, ListSchema } from "./schemas/todo-item.schema";

@Module({
    providers:[TodoService],
    controllers:[TodoController],
    imports:[
        MongooseModule.forFeatureAsync([
            {
                name: TodoItem.name,
                imports:[CounterModule],
                useFactory:(counterService: CounterService) => {
                    const list = ListSchema;
                    
                    counterService.init(TodoItem.name) 
                    list.pre('save', async function(this: any) {
                        this._id = await counterService.getNextId(TodoItem.name);
                    });
                   
                    return list;
                },
                inject: [CounterService],
            }
        ])
    ],
    exports:[TodoService]
})

export class TodoModule{

}
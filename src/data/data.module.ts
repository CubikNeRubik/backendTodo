import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { CounterModule } from "./counter/counter.module";
import { CounterService } from "./counter/counter.service";

import { TodoSchema, TodoItem } from "./schemas/todo-item.schema";
import { User, UserSchema } from "./schemas/user.schema";


@Module({
    imports:[
        MongooseModule.forFeatureAsync([
            {
                name: TodoItem.name,
                imports:[CounterModule],
                useFactory:(counterService: CounterService) => {
                    const todo = TodoSchema;
                    
                    counterService.init(TodoItem.name) 
                    todo.pre('save', async function(this: any) {
                        this._id = await counterService.getNextId(TodoItem.name);
                    });
                   
                    return todo;
                },
                inject: [CounterService],
            },
            {
                name: User.name,
                imports:[CounterModule],
                useFactory:(counterService: CounterService) => {
                    const user = UserSchema;
                    
                    counterService.init(User.name) 
                    user.pre('save', async function(this: any) { 
                        this._id = await counterService.getNextId(User.name);
                    });
                   
                    return user;
                },
                inject: [CounterService],
            },
        ]),
    ],
    exports:[MongooseModule]
})

export class DataModule{

}
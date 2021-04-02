import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { CounterModule } from "./counter/counter.module";
import { CounterService } from "./counter/counter.service";

import { TodoSchema, TodoItem } from "./schemas/todo-item.schema";
import { User, UserSchema } from "./schemas/user.schema";

function registerModel(model, schema) {
    return {
        name: model.name,
        imports:[CounterModule],
        useFactory:(counterService: CounterService) => {            
            counterService.init(model.name) 
            schema.pre('save', async function(this: any) {
                this._id = await counterService.getNextId(model.name);
            });
            
            return schema;
        },
        inject: [CounterService],
    }
}

@Module({
    imports:[
        MongooseModule.forFeatureAsync([
            registerModel(TodoItem, TodoSchema),
            registerModel(User, UserSchema),
        ]),
    ],
    exports:[MongooseModule]
})

export class DataModule{

}
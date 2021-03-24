import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { listModule } from "src/list/list.module";
import { Counter, counterSchema } from "./counter.schema";

import { CounterService } from "./counter.service";

@Module({
    providers:[CounterService],
    controllers:[],
    imports:[ 
        MongooseModule.forFeature([{ 
            name: Counter.name, schema: counterSchema 
        }])],
        exports:[CounterService]
    
})

export class CounterModule{
    
}
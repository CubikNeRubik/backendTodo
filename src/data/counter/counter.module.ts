import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Counter, counterSchema } from "../schemas/counter.schema";

import { CounterService } from "./counter.service";

@Module({
    providers:[CounterService],
    controllers:[],
    imports:[ 
        MongooseModule.forFeature([{ 
            name: Counter.name, schema: counterSchema 
        }]),
    ],
    exports:[CounterService]
    
})

export class CounterModule{
    
}
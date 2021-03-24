import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CounterModule } from "src/counter/counter.module";
import { CounterService } from "src/counter/counter.service";
import { ListController } from "./list.controller";
import { ListService } from "./list.service";
import { List, ListSchema } from "./schemas/list.schema";

@Module({
    providers:[ListService],
    controllers:[ListController],
    imports:[
        MongooseModule.forFeatureAsync([
            {
                name: List.name,
                imports:[CounterModule],
                useFactory:(counterService: CounterService) => {
                    const list = ListSchema;
                    
                    counterService.init(List.name) 
                    list.pre('save', async function(this: any) {
                        const id = await counterService.replaceId(List.name);
                        console.log('presave', id)
                        this._id = id;  
                    });
                   
                    return list;
                },
                inject: [CounterService],
            }
        ])
    ],
    exports:[ListService]
})

export class listModule{

}
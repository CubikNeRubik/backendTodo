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

                    list.pre('save', function() {
                        // let id = list.path('_id');
                        console.log('presave')
                        counterService.replaceId(List.name)
                            // .then(a => console.log(a));
                    
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
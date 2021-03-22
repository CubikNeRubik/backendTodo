import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ListController } from "./list.controller";
import { ListService } from "./list.service";
import { List, ListSchema } from "./schemas/list.schema";

@Module({
    providers:[ListService],
    controllers:[ListController],
    imports:[
        MongooseModule.forFeature([{ name: List.name, schema: ListSchema }])
    ]
})

export class listModule{

}
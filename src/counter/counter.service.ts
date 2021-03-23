import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { nextTick } from "node:process";
import { ListService } from "src/list/list.service";
import { List, ListDocument } from "src/list/schemas/list.schema";
import { Counter, CounterDocument } from "./counter.schema";

@Injectable()
export class CounterService{
    constructor(
        // @Inject(forwardRef(() => ListService))
            @InjectModel(Counter.name) private counterModel: Model<CounterDocument>
        ) {}


    init(entityName){
        var existEntityName = this.counterModel.findOne(entityName)
        if (existEntityName == null){
            this.counterModel.create({
                seq:0
            })
            console.log(entityName)
        }
    }
    
    replaceId(entityName){
        this.init(entityName)
        console.log(entityName)
        return this.counterModel.findOneAndUpdate( {_id: entityName}, {$inc: { seq: 1},  function(counter)   {
            console.log("counter", counter)
            entityName = counter.seq
            // id.next();
        }}).exec();
    }
}
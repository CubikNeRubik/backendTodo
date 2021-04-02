import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Counter, CounterDocument } from "../schemas/counter.schema";

@Injectable()
export class CounterService{
    constructor(
        @InjectModel(Counter.name) private counterModel: Model<CounterDocument>
    ) {}

    async init(entityName){
        var existEntityName = await this.counterModel.findOne({_id:entityName}).exec()
        if (existEntityName == null){
            this.counterModel.create({
                _id:entityName,
                lastId:0
            })
        }           
    }
    
    async getNextId(entityName){ 
        const counter = await this.counterModel.findOneAndUpdate( {_id: entityName}, {$inc: { lastId: 1}}, {new: true}).exec();
        return counter.lastId;
    }
}

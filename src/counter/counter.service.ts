import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { nextTick } from "node:process";
import { identity } from "rxjs";
import { ListService } from "src/list/list.service";
import { List, ListDocument } from "src/list/schemas/list.schema";
import { Counter, CounterDocument } from "./counter.schema";

@Injectable()
export class CounterService{
    constructor(
        // @Inject(forwardRef(() => ListService))
            @InjectModel(Counter.name) private counterModel: Model<CounterDocument>
        ) {}


    async init(entityName){
        var existEntityName = await this.counterModel.findOne({_id:entityName}).exec()
        if (existEntityName == null){
            this.counterModel.create({
                _id:entityName,
                seq:0
            })
            // console.log("entityName",entityName)
            // console.log("existEntityName",existEntityName)
        }
        // var existEntityName = this.counterModel.findOne(entityName)
        // console.log("existEntityName",existEntityName)
        //     if (existEntityName == null){
        //         return this.counterModel.insertMany({
        //             _id:entityName,
        //             seq:0
        //     }
        //     )
            
            // console.log("entityName",entityName)
            // console.log("existEntityName",existEntityName)
           
    }
    
    
    async replaceId(entityName){ 
        const counter = await this.counterModel.findOneAndUpdate( {_id: entityName}, {$inc: { seq: 1}}, {new: true}).exec();
        return counter.seq;
    }





}
// {$inc: { seq: 1}
// ,rawResult: true
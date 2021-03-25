import { forwardRef, Inject, Injectable} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { classToPlain, deserialize, plainToClass, serialize } from "class-transformer";
import { Model } from "mongoose";
import { Counter, CounterDocument } from "src/counter/counter.schema";
import { CounterService } from "src/counter/counter.service";


import { CreateTodoDto } from "./dto/create-todo.dto";
import { TodoItem } from "./dto/transform-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { listModule } from "./list.module";
import { List, ListDocument } from "./schemas/list.schema";

@Injectable()
export class ListService{
    constructor(
        // @Inject(forwardRef(() => CounterService))
        @InjectModel(List.name) private listModel: Model<ListDocument>,
        ) {}

    // private list = [];

    async findAll(){
        const getItemResponse =  await this.listModel.find().exec()
        // let album = plainToClass(TodoItem, response);
        let convertItems = plainToClass(TodoItem, getItemResponse, { excludeExtraneousValues: true })
        return convertItems
        
    }

    async create(todoDto:CreateTodoDto): Promise<List>{
        
      const newTodo = new this.listModel(todoDto)
      const result = await newTodo.save()
      return result.toObject();
    }

    async deleteById(id): Promise<List>{
        return this.listModel.findByIdAndRemove(id)
    }

    async updateTodo(id, updateTodoDto:UpdateTodoDto): Promise<List>{
        return this.listModel.findByIdAndUpdate(id, updateTodoDto)
    }
}

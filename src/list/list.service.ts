import { forwardRef, Inject, Injectable} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Counter, CounterDocument } from "src/counter/counter.schema";
import { CounterService } from "src/counter/counter.service";


import { CreateTodoDto } from "./dto/create-todo.dto";
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

    async findAll(): Promise<List[]>{
        return this.listModel.find().exec()
    }

    async create(todoDto:CreateTodoDto): Promise<List>{
        
      const newTodo = new this.listModel(todoDto)
      return newTodo.save()
    }

    async deleteById(id): Promise<List>{
        return this.listModel.findByIdAndRemove(id)
        // const index = this.list.findIndex(elem => elem.id === id);
        // if (index === -1) {
        //   throw new NotFoundException();
        // }
        // this.list.splice(index);
        // return { message: 'Todo Deleted' };
    }

    async updateTodo(id, updateTodoDto:UpdateTodoDto): Promise<List>{
        return this.listModel.findByIdAndUpdate(id, updateTodoDto)
    }
}

import { Injectable} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { listModule } from "./list.module";
import { List, ListDocument } from "./schemas/list.schema";

@Injectable()
export class ListService{
    constructor(@InjectModel(List.name) private listModel: Model<ListDocument>) {}

    // private list = [];

    async findAll(): Promise<List[]>{
        return this.listModel.find().exec()
    }

    async create(todoDto:CreateTodoDto): Promise<List>{
      const index = this.listModel.length -1
      const newTodo = new this.listModel({...todoDto, index})
      return newTodo.save()
    }

    async deleteById(index): Promise<List>{
        return this.listModel.findOneAndRemove(index)
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

import { Injectable} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";


import { CreateTodoDto } from "./dto/create-todo.dto";
import { TodoDto } from "./dto/transform-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { TodoItem, TodoItemDocument } from "./schemas/todo-item.schema";

@Injectable()
export class TodoService{
    constructor(
        @InjectModel(TodoItem.name) private todoModel: Model<TodoItemDocument>,
    ) {}

    async findAll(): Promise<TodoDto[]>{
        const getItemResponse =  await this.todoModel.find().exec();
        return getItemResponse.map(m => new TodoDto(m.toObject()));      
    }

    async create(todoDto:CreateTodoDto): Promise<TodoDto>{
        const newTodo = new this.todoModel(todoDto);
        const result = await newTodo.save();
        return new TodoDto(result.toObject());
    }

    async deleteById(id): Promise<TodoDto>{
        const result = await this.todoModel.findByIdAndRemove(id).exec();
        return new TodoDto(result.toObject());
    }

    async updateTodo(id, updateTodoDto:UpdateTodoDto):Promise<TodoDto>{
        const updateResponse = await this.todoModel.findByIdAndUpdate(id, updateTodoDto,  {new: true})
        return new TodoDto(updateResponse.toObject())
        
    }
}

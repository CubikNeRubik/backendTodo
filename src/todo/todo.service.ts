import { Injectable} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";


import { CreateTodoDto } from "./dto/create-todo.dto";
import { TodoDto } from "./dto/transform-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { TodoItem, TodoItemDocument } from "../data/schemas/todo-item.schema";
import { User, UserDocument } from "../data/schemas/user.schema";

@Injectable()
export class TodoService{
    constructor(
        @InjectModel(TodoItem.name) private todoModel: Model<TodoItemDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

    async findAll(): Promise<TodoDto[]>{
        const getItemResponse = await this.todoModel.find().exec();
        return getItemResponse.map(m => new TodoDto(m.toObject()));      
    }

    async findByUserId(userId: number): Promise<TodoDto[]>{
        const user = await this.userModel.findById(userId).exec();
        const populatedUser = await user.populate('items').execPopulate();

        const getItemResponse = populatedUser.items as TodoItemDocument[];
        return getItemResponse.map(m => new TodoDto(m.toObject()));      
    }

    async create(todoDto:CreateTodoDto, userId?: number): Promise<TodoDto>{
        const newTodo = new this.todoModel(todoDto);
        const todo = await newTodo.save();

        if (userId) {
            await this.userModel.findByIdAndUpdate(userId, {
                $push: { items: todo._id },
            }).exec();
        }
        
        return new TodoDto(newTodo.toObject());
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

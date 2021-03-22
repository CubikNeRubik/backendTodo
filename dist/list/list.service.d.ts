import { Model } from "mongoose";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { List, ListDocument } from "./schemas/list.schema";
export declare class ListService {
    private listModel;
    constructor(listModel: Model<ListDocument>);
    findAll(): Promise<List[]>;
    create(todoDto: CreateTodoDto): Promise<List>;
    deleteById(id: any): Promise<List>;
    updateTodo(id: any, updateTodoDto: UpdateTodoDto): Promise<List>;
}

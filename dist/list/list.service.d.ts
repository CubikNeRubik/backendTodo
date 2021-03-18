import { CreateTodoDto } from "./dto/create-todo.dto";
export declare class ListService {
    private list;
    findAll(): any[];
    create(todoDto: CreateTodoDto): void;
    deleteById(id: any): {
        message: string;
    };
    updateTOdo(updateTodoDto: any, id: any): void;
}

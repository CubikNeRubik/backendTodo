import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
export declare class ListController {
    getAll(): string;
    create(createTodoDto: CreateTodoDto): CreateTodoDto;
    remove(id: string): string;
    update(updateTodoDto: UpdateTodoDto, id: string): string;
}

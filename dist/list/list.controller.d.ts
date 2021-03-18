import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ListService } from './list.service';
export declare class ListController {
    private readonly listService;
    constructor(listService: ListService);
    getAll(): any[];
    create(createTodoDto: CreateTodoDto): void;
    remove(id: string): {
        message: string;
    };
    update(updateTodoDto: UpdateTodoDto, id: string): void;
}

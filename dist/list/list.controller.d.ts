import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ListService } from './list.service';
import { List } from './schemas/list.schema';
export declare class ListController {
    private readonly listService;
    constructor(listService: ListService);
    getAll(): Promise<List[]>;
    create(createTodoDto: CreateTodoDto): Promise<List>;
    remove(index: string): Promise<List>;
    update(id: string, updateTodoDto: UpdateTodoDto): Promise<List>;
}

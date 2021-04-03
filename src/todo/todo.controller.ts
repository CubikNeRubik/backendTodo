import { Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Req, SerializeOptions, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserRoles } from '../common/role.enum';
import { Roles } from '../common/role.decorator';


import { CustomRequest } from '../interfaces/custom-request.interface';
import { RolesGuard } from '../common/role.guard';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoDto } from './dto/todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoService } from './todo.service';


@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({
    excludePrefixes: ['_'],
})
@UseGuards(RolesGuard)
@Controller('todo')
export class TodoController {
    constructor(
        private readonly todoService:TodoService,
        ){}
    
    @Get()
    @Roles(UserRoles.USER, UserRoles.ADMIN)
    getAll(@Req() req: CustomRequest) : Promise<TodoDto[]>{
        const { user } = req;

        if(user.role === UserRoles.ADMIN) {
            return this.todoService.findAll();
        }

        return this.todoService.findByUserId(user.id);
    }

    @Post()
    @Roles(UserRoles.USER)
    @HttpCode(HttpStatus.CREATED)
    async create(@Req() req: CustomRequest, @Body() createTodoDto:CreateTodoDto):Promise<TodoDto>{
        const { user } = req;
        return this.todoService.create(createTodoDto, user.id)
    }

    @Delete(':id')
    @Roles(UserRoles.USER, UserRoles.ADMIN)
    remove(@Param('id') id:string):Promise<TodoDto>{
        return this.todoService.deleteById(id)
    }

    @Put(':id')
    @Roles(UserRoles.USER, UserRoles.ADMIN)
    update( @Param('id') id:string, @Body() updateTodoDto:UpdateTodoDto):Promise<TodoDto>{
        return this.todoService.updateTodo(id,updateTodoDto)
    }
}

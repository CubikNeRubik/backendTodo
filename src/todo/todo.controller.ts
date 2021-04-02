import { Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Req, SerializeOptions, UseGuards, UseInterceptors } from '@nestjs/common';


import { CustomRequest } from 'src/interfaces/custom-request.interface';
import { AuthGuard } from '../common/auth.guard';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoDto } from './dto/transform-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoService } from './todo.service';


@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({
    excludePrefixes: ['_'],
})
@UseGuards(AuthGuard)
@Controller('todo')
export class TodoController {
    constructor(
        private readonly todoService:TodoService,
        ){}
    
    @Get()
    getAll(@Req() req: CustomRequest) : Promise<TodoDto[]>{
        return this.todoService.findByUserId(req.user.id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Req() req: CustomRequest, @Body() createTodoDto:CreateTodoDto):Promise<TodoDto>{
        return this.todoService.create(createTodoDto, req.user.id)
    }

    @Delete(':id')
    remove(@Param('id') id:string):Promise<TodoDto>{
        return this.todoService.deleteById(id)
    }

    @Put(':id')
    update( @Param('id') id:string, @Body() updateTodoDto:UpdateTodoDto):Promise<TodoDto>{
        return this.todoService.updateTodo(id,updateTodoDto)
    }
}

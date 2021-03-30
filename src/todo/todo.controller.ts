import { Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, SerializeOptions, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
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
    constructor(private readonly todoService:TodoService){}
    
    @Get()
    getAll() : Promise<TodoDto[]>{
        return this.todoService.findAll()    
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createTodoDto:CreateTodoDto):Promise<TodoDto>{
        return this.todoService.create(createTodoDto)
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

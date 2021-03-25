import { Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, SerializeOptions, UseInterceptors } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { plainToClass, serialize } from 'class-transformer';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoItem } from './dto/transform-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ListService } from './list.service';
import { List } from './schemas/list.schema';


@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({
    excludePrefixes: ['_'],
})
@Controller('list')
export class ListController {
    
    constructor(private readonly listService:ListService){}
    
    
    @Get()
    getAll() : Promise<TodoItem[]>{
        return this.listService.findAll()
        // return this.listService.findAll()
    
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createTodoDto:CreateTodoDto):Promise<TodoItem>{
        return this.listService.create(createTodoDto)
    }

    @Delete(':id')
    remove(@Param('id') id:string):Promise<List>{
        return this.listService.deleteById(id)
    }

    @Put(':id')
    update( @Param('id') id:string, @Body() updateTodoDto:UpdateTodoDto):Promise<TodoItem>{
        return this.listService.updateTodo(id,updateTodoDto)
    }

}

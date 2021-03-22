import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ListService } from './list.service';
import { List } from './schemas/list.schema';

@Controller('list')
export class ListController {
    
    constructor(private readonly listService:ListService){}
    

    @Get()
    getAll():Promise<List[]>{
        return this.listService.findAll()
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createTodoDto:CreateTodoDto):Promise<List>{
        return this.listService.create(createTodoDto)
    }

    @Delete(':index')
    remove(@Param('index') index:string):Promise<List>{
        return this.listService.deleteById(index)
    }

    @Put(':id')
    update( @Param('id') id:string, @Body() updateTodoDto:UpdateTodoDto):Promise<List>{
        return this.listService.updateTodo(id,updateTodoDto)
    }

}

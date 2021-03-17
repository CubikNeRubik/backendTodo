import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('list')
export class ListController {

    @Get()
    getAll(){
        return 'getAll'
    }

    @Post()
    create(@Body() createTodoDto:CreateTodoDto){
        return createTodoDto
    }

    @Delete('id')
    remove(@Param('id') id:string){
        return "Remove" + id
    }

    @Put('id')
    update(@Body() updateTodoDto:UpdateTodoDto, @Param('id') id:string){
        return 'Update' + id
    }

}

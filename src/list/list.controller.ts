import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ListService } from './list.service';

@Controller('list')
export class ListController {

    constructor(private readonly listService:ListService){

    }

    @Get()
    getAll(){
        return this.listService.findAll()
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createTodoDto:CreateTodoDto){
        return this.listService.create(createTodoDto)
    }

    @Delete('id')
    remove(@Param('id') id:string){
        return this.listService.deleteById(id)
    }

    @Put('id')
    update(@Body() updateTodoDto:UpdateTodoDto, @Param('id') id:string){
        return this.listService.updateTOdo(updateTodoDto,id)
    }

}

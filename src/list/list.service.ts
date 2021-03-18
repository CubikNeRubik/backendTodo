import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTodoDto } from "./dto/create-todo.dto";

@Injectable()
export class ListService{
    private list = [];

    findAll(){
        return this.list
    }

    create(todoDto:CreateTodoDto){
        this.list.push({
            ...todoDto,
            id:Date.now().toString()
        })
    }

    deleteById(id){
        const index = this.list.findIndex(elem => elem.id === id);
        if (index === -1) {
          throw new NotFoundException();
        }
        this.list.splice(index);
        return { message: 'Todo Deleted' };
    }

    updateTOdo(updateTodoDto,id){

    }
}

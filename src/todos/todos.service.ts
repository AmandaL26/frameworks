import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { CreateTodoUseCase, DeleteTodoUseCase, FindAllTodosUseCase, FindTodoByIdUseCase, UpdateTodoUseCase } from './use-cases';



@Injectable()
export class TodosService {
  constructor(
    private readonly createTodoUseCase: CreateTodoUseCase,
    private readonly findAllTodosUseCase: FindAllTodosUseCase,
    private readonly findTodoByIdUseCase: FindTodoByIdUseCase,
    private readonly updateTodoUseCase: UpdateTodoUseCase,
    private readonly deleteTodoUseCase: DeleteTodoUseCase
  ) {}

  create(createTodoDto: CreateTodoDto) {
    return this.createTodoUseCase.create(createTodoDto);
  }

  findAll() {
    return this.findAllTodosUseCase.findAll();
  }

  findById(id: string) {
    return this.findTodoByIdUseCase.findById(id);
  }

  update(id: string, updateTodoDto: UpdateTodoDto) {
    return this.updateTodoUseCase.update(id, updateTodoDto);
  }

  delete(id: string) {
    return this.deleteTodoUseCase.delete(id);
  }
}

import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { FindTodoByIdRepository, UpdateTodoRepository } from "../repository";
import { UpdateTodoDto } from "../dto/update-todo.dto";

@Injectable()
export class UpdateTodoUseCase {
    constructor(
        private readonly updateTodoRepository: UpdateTodoRepository,
        private readonly findTodoByIdRepository: FindTodoByIdRepository,
        private readonly logger: Logger,
    ) { }

    async update(id: string, data: UpdateTodoDto) {
        try {
            this.logger.log("Updating todo...");

            const todo = await this.findTodoByIdRepository.findById(id);

            if (!todo) {
                throw new NotFoundException("Todo not found");
            }

            await this.updateTodoRepository.update(data, id);
            this.logger.log("Todo updated successfully!");
            return todo;
        } catch (error) {
            this.logger.error(error);
            throw new Error("Failed to update todo");
        }
    }
}
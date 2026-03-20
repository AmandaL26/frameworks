import { Injectable, Logger } from "@nestjs/common";
import {UpdateTodoRepository } from "../repository";
import { UpdateTodoDto } from "../dto/update-todo.dto";

@Injectable()
export class UpdateTodoUseCase {
    constructor(
        private readonly updateTodoRepository: UpdateTodoRepository,
        private readonly logger: Logger,
    ) {}

    async update(id: string, data: UpdateTodoDto) { 
        try {
            this.logger.log("Updating todo...");
            const todo = await this.updateTodoRepository.update(data, id);
            this.logger.log("Todo updated successfully!");
            return todo;
        } catch (error) {
            this.logger.error(error);
            throw new Error("Failed to update todo");
        }
    }
}
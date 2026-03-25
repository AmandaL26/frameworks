import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { DeleteTodoRepository, FindTodoByIdRepository } from "../repository";

@Injectable()
export class DeleteTodoUseCase {
    constructor(
        private readonly deleteTodoRepository: DeleteTodoRepository,
        private readonly findTodoByIdRepository: FindTodoByIdRepository,
        private readonly logger: Logger,
    ) { }

    async delete(id: string) {
        try {
            this.logger.log("Deleting todo...");

            const todo = await this.findTodoByIdRepository.findById(id);

            if (!todo) {
                throw new NotFoundException("Todo not found");
            }

            await this.deleteTodoRepository.delete(id);
            this.logger.log("Todo deleted successfully!");
            return todo;
        } catch (error) {
            this.logger.error(error);
            throw new Error("Failed to delete todo");
        }
    }
}
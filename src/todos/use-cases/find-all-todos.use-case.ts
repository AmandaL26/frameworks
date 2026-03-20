import { Injectable, Logger } from "@nestjs/common";
import { FindAllTodosRepository } from "../repository";

@Injectable()
export class FindAllTodosUseCase {
    constructor(
        private readonly findAllTodosRepository: FindAllTodosRepository,
        private readonly logger: Logger,
    ) {}

    async findAll() { 
        try {
            this.logger.log("Fetching all todos...");
            const todo = await this.findAllTodosRepository.findAll();
            this.logger.log("Todos fetched successfully!");
            return todo;
        } catch (error) {
            this.logger.error(error);
            throw new Error("Failed to fetch todos");
        }
    }
}
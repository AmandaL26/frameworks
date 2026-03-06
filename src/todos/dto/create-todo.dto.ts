export class CreateTodoDto {
    tittle: string;
    description: string;
    completed: boolean;
    priority: TodoPriority;
    dueAt: Date;
    completedAt: Date;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

enum TodoPriority {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
}

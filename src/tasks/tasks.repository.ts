import { EntityRepository, Repository } from "typeorm";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class TasksRepository extends Repository<Task>{
    async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        const { status, search } = filterDto;

        const query = this.createQueryBuilder('task');
        if (status) {
            query.andWhere('task.status = :status', { status: 'OPEN' });
        }
        if (search) {
            query.andWhere(
                'task.title LIKE :search OR task.description LIKE :search', { search: `%${search}%` }
            )
        }
        const tasks = await query.getMany();
        return tasks;
    }
}

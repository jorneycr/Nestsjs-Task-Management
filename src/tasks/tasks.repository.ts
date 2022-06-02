import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class TasksRepository extends Repository<Task>{
    async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
        const { status, search } = filterDto;

        const query = this.createQueryBuilder('task');
        query.where({ user });

        if (status) {
            query.andWhere('task.status = :status', { status: 'OPEN' });
        }
        if (search) {
            query.andWhere(
                '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))', { search: `%${search}%` }
            )
        }
        const tasks = await query.getMany();
        return tasks;
    }
}

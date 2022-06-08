import { Test } from '@nestjs/testing';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

const mockTasksRepository = () => ({
    getTasks: jest.fn(),
});

const mockUser = {
    username: 'Ariel',
    id: 'someId',
    password: 'somePassword',
    task: [],
}

describe('TasksService', () => {
    let tasksService: TasksService;
    let tasksRepository;

    beforeEach(async () => {
        //initialize a NestJS module with tasksSevice and tasksRepository
        const module = await Test.createTestingModule({
            providers: [
                TasksService,
                { provide: TasksRepository, useFactory: mockTasksRepository }
            ],
        }).compile();

        tasksService = module.get(TasksService);
        tasksRepository = module.get(TasksRepository);
    });

    describe('getTasks', () => {
        it('calls TasksRepository.getTasks and returns the results', async () => {
            tasksRepository.getTasks.mockResolvedValue('someValue');
            const result = await tasksService.getTasks(null, mockUser);
            expect(result).toEqual('someValue');
        });
    });
});
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [TasksModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 49154,
    username: 'postgres',
    password: 'postgrespw',
    database: 'task-management',
    autoLoadEntities: true,
    synchronize: true,
  })],
  controllers: [],
  providers: [],
})
export class AppModule { }

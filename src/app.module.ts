import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { UrlModule } from './url/url.module';

@Module({
  imports: [TasksModule, UrlModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 49159,
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

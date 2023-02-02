import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskService } from './task.service';

@Module({
  imports: [EventEmitterModule.forRoot(), ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, TaskService],
})
export class AppModule {}
